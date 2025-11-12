// Main Application Object
const app = {
    // Game State
    currentTopic: '',
    currentQuestionIndex: 0,
    score: 0,
    questions: [],
    userAnswer: null,
    timer: null,
    timerValue: 30,
    settings: {
        timerEnabled: true,
        soundEnabled: true,
        difficulty: 'medium'
    },
    stats: {
        totalQuizzes: 0,
        scores: [],
        bestScore: 0,
        topicStats: {}
    },
    questionResults: [],

    // Initialize App
    init() {
        this.loadSettings();
        this.loadStats();
        this.generateStars();
        this.setupEventListeners();
    },

    // Generate animated stars background
    generateStars() {
        const starsContainer = document.getElementById('starsContainer');
        starsContainer.innerHTML = '';
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';
            starsContainer.appendChild(star);
        }
    },

    // Setup Event Listeners
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const submitBtn = document.getElementById('submitBtn');
                const nextBtn = document.getElementById('nextBtn');
                if (submitBtn && !submitBtn.classList.contains('hidden')) {
                    this.submitAnswer();
                } else if (nextBtn && !nextBtn.classList.contains('hidden')) {
                    this.nextQuestion();
                }
            }
        });
    },

    // Navigation Functions
    showHome() {
        this.hideAll();
        document.getElementById('homeScreen').classList.remove('hidden');
        // Remove parent dashboard if exists
        const parentDashboard = document.getElementById('parentDashboard');
        if (parentDashboard) parentDashboard.remove();
        this.stopTimer();
    },

    showTopicSelection() {
        // Check if user is logged in
        if (!authSystem.currentUser) {
            authSystem.showLogin();
            return;
        }
        
        // Parents cannot take quizzes
        if (authSystem.currentUser.type === 'parent') {
            alert('Parents cannot take quizzes. Please login as a student.');
            return;
        }
        
        this.hideAll();
        document.getElementById('topicSelection').classList.remove('hidden');
    },

    showLeaderboard() {
        this.hideAll();
        document.getElementById('leaderboardScreen').classList.remove('hidden');
        this.renderLeaderboard();
    },

    showStats() {
        this.hideAll();
        document.getElementById('statsScreen').classList.remove('hidden');
        this.renderStats();
    },

    showSettings() {
        this.hideAll();
        document.getElementById('settingsScreen').classList.remove('hidden');
        this.loadSettingsUI();
    },

    hideAll() {
        const screens = ['homeScreen', 'topicSelection', 'quizScreen', 'resultsScreen', 'leaderboardScreen', 'statsScreen', 'settingsScreen'];
        screens.forEach(screen => {
            document.getElementById(screen).classList.add('hidden');
        });
    },

    // Quiz Functions
    startQuiz(topic) {
        this.currentTopic = topic;
        this.questions = this.shuffleArray([...questionDatabase[topic]]);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questionResults = [];
        
        this.hideAll();
        document.getElementById('quizScreen').classList.remove('hidden');
        document.getElementById('totalQuestions').textContent = this.questions.length;
        document.getElementById('score').textContent = this.score;
        
        this.loadQuestion();
    },

    loadQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        this.userAnswer = null;
        
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('progressBar').style.width = ((this.currentQuestionIndex / this.questions.length) * 100) + '%';
        
        // Set question type badge
        const questionTypeBadge = document.getElementById('questionType');
        const typeLabels = {
            'multiple': 'Multiple Choice',
            'trueFalse': 'True/False',
            'fillBlank': 'Fill in the Blank'
        };
        questionTypeBadge.textContent = typeLabels[question.type] || 'Question';
        
        const answerArea = document.getElementById('answerArea');
        answerArea.innerHTML = '';
        
        document.getElementById('submitBtn').classList.remove('hidden');
        document.getElementById('nextBtn').classList.add('hidden');
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('explanation').classList.add('hidden');
        
        // Start timer if enabled
        if (this.settings.timerEnabled) {
            this.startTimer();
        }
        
        // Render question based on type
        if (question.type === 'multiple') {
            question.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn w-full p-4 mb-3 bg-white rounded-lg text-left font-medium text-gray-800 shadow-md';
                btn.setAttribute('data-index', index);
                btn.textContent = option;
                btn.onclick = () => this.selectOption(index);
                answerArea.appendChild(btn);
            });
        } else if (question.type === 'trueFalse') {
            const trueBtn = document.createElement('button');
            trueBtn.className = 'option-btn w-full p-4 mb-3 bg-white rounded-lg font-bold text-gray-800 shadow-md';
            trueBtn.setAttribute('data-value', 'true');
            trueBtn.innerHTML = '✓ True';
            trueBtn.onclick = () => this.selectOption(true);
            
            const falseBtn = document.createElement('button');
            falseBtn.className = 'option-btn w-full p-4 mb-3 bg-white rounded-lg font-bold text-gray-800 shadow-md';
            falseBtn.setAttribute('data-value', 'false');
            falseBtn.innerHTML = '✗ False';
            falseBtn.onclick = () => this.selectOption(false);
            
            answerArea.appendChild(trueBtn);
            answerArea.appendChild(falseBtn);
        } else if (question.type === 'fillBlank') {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'fillBlankInput';
            input.className = 'w-full p-4 rounded-lg text-lg border-3';
            input.placeholder = 'Type your answer here...';
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.submitAnswer();
            });
            answerArea.appendChild(input);
            setTimeout(() => input.focus(), 100);
        }
    },

    selectOption(value) {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
        
        const selectedBtn = Array.from(buttons).find(btn => 
            btn.getAttribute('data-index') == value || 
            btn.getAttribute('data-value') == value
        );
        
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
        
        this.userAnswer = value;
    },

    submitAnswer() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Get user answer for fill blank
        if (question.type === 'fillBlank') {
            const input = document.getElementById('fillBlankInput');
            if (!input) return;
            this.userAnswer = input.value.trim().toLowerCase();
        }
        
        // Check if answer is provided
        if (this.userAnswer === null || this.userAnswer === '') {
            alert('Please select or enter an answer!');
            return;
        }
        
        this.stopTimer();
        
        // Check answer
        let isCorrect = false;
        if (question.type === 'multiple') {
            isCorrect = this.userAnswer === question.correct;
        } else if (question.type === 'trueFalse') {
            isCorrect = this.userAnswer === question.correct;
        } else if (question.type === 'fillBlank') {
            isCorrect = question.correct.some(answer => 
                this.userAnswer.toLowerCase() === answer.toLowerCase()
            );
        }
        
        // Update score
        if (isCorrect) {
            this.score += 10;
            document.getElementById('score').textContent = this.score;
        }
        
        // Record result
        this.questionResults.push({
            question: question.question,
            userAnswer: this.userAnswer,
            correctAnswer: question.correct,
            isCorrect: isCorrect
        });
        
        // Show feedback
        this.showFeedback(isCorrect, question);
        
        // Visual feedback on options
        if (question.type === 'multiple' || question.type === 'trueFalse') {
            const buttons = document.querySelectorAll('.option-btn');
            buttons.forEach(btn => {
                const btnValue = btn.getAttribute('data-index') || btn.getAttribute('data-value');
                if (question.type === 'multiple') {
                    if (parseInt(btnValue) === question.correct) {
                        btn.classList.add('correct');
                    } else if (parseInt(btnValue) === this.userAnswer) {
                        btn.classList.add('incorrect');
                    }
                } else if (question.type === 'trueFalse') {
                    const boolValue = btnValue === 'true';
                    if (boolValue === question.correct) {
                        btn.classList.add('correct');
                    } else if (boolValue === this.userAnswer) {
                        btn.classList.add('incorrect');
                    }
                }
                btn.onclick = null;
            });
        }
        
        // Play sound
        if (this.settings.soundEnabled) {
            this.playSound(isCorrect);
        }
        
        // Show buttons
        document.getElementById('submitBtn').classList.add('hidden');
        document.getElementById('nextBtn').classList.remove('hidden');
    },

    showFeedback(isCorrect, question) {
        const feedback = document.getElementById('feedback');
        const explanation = document.getElementById('explanation');
        
        if (isCorrect) {
            feedback.className = 'mt-6 p-4 rounded-lg text-center font-bold bg-green-100 text-green-800';
            feedback.innerHTML = '🎉 Correct! Great job!';
        } else {
            feedback.className = 'mt-6 p-4 rounded-lg text-center font-bold bg-red-100 text-red-800';
            feedback.innerHTML = '❌ Incorrect. Keep trying!';
        }
        
        feedback.classList.remove('hidden');
        
        // Show explanation
        if (question.explanation) {
            document.getElementById('explanationText').textContent = question.explanation;
            explanation.classList.remove('hidden');
        }
    },

    nextQuestion() {
        this.currentQuestionIndex++;
        this.loadQuestion();
    },

    skipQuestion() {
        this.questionResults.push({
            question: this.questions[this.currentQuestionIndex].question,
            userAnswer: 'Skipped',
            correctAnswer: this.questions[this.currentQuestionIndex].correct,
            isCorrect: false
        });
        this.nextQuestion();
    },

    showResults() {
        this.stopTimer();
        this.hideAll();
        document.getElementById('resultsScreen').classList.remove('hidden');
        
        const totalQuestions = this.questions.length;
        const correctCount = this.questionResults.filter(r => r.isCorrect).length;
        const incorrectCount = this.questionResults.filter(r => !r.isCorrect && r.userAnswer !== 'Skipped').length;
        const skippedCount = this.questionResults.filter(r => r.userAnswer === 'Skipped').length;
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        
        // Update display
        document.getElementById('finalScore').textContent = percentage;
        document.getElementById('correctAnswers').textContent = correctCount;
        document.getElementById('totalAnswers').textContent = totalQuestions;
        document.getElementById('correctCount').textContent = correctCount;
        document.getElementById('incorrectCount').textContent = incorrectCount;
        document.getElementById('skippedCount').textContent = skippedCount;
        
        // Performance badge
        const performanceBadge = document.getElementById('performanceBadge');
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultSubtitle = document.getElementById('resultSubtitle');
        
        if (percentage >= 90) {
            performanceBadge.className = 'mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200';
            performanceBadge.innerHTML = '<div class="text-4xl mb-2">🌟</div><p class="font-bold text-yellow-800">Outstanding Performance!</p>';
            resultIcon.textContent = '🏆';
            resultTitle.textContent = 'Excellent Work!';
            resultSubtitle.textContent = 'You\'re a true Math Defender!';
        } else if (percentage >= 70) {
            performanceBadge.className = 'mb-6 p-4 rounded-xl bg-gradient-to-r from-green-100 to-green-200';
            performanceBadge.innerHTML = '<div class="text-4xl mb-2">⭐</div><p class="font-bold text-green-800">Great Job!</p>';
            resultIcon.textContent = '🎉';
            resultTitle.textContent = 'Well Done!';
            resultSubtitle.textContent = 'Keep up the good work!';
        } else if (percentage >= 50) {
            performanceBadge.className = 'mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200';
            performanceBadge.innerHTML = '<div class="text-4xl mb-2">👍</div><p class="font-bold text-blue-800">Good Effort!</p>';
            resultIcon.textContent = '📚';
            resultTitle.textContent = 'Keep Practicing!';
            resultSubtitle.textContent = 'You\'re on the right track!';
        } else {
            performanceBadge.className = 'mb-6 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-orange-200';
            performanceBadge.innerHTML = '<div class="text-4xl mb-2">💪</div><p class="font-bold text-orange-800">Keep Trying!</p>';
            resultIcon.textContent = '📖';
            resultTitle.textContent = 'Don\'t Give Up!';
            resultSubtitle.textContent = 'Practice makes perfect!';
        }
        
        // Save stats
        this.saveStats(percentage);
    },

    retryQuiz() {
        this.startQuiz(this.currentTopic);
    },

    // Timer Functions
    startTimer() {
        this.timerValue = 30;
        document.getElementById('timer').textContent = this.timerValue;
        document.getElementById('timerDisplay').classList.remove('hidden');
        
        this.timer = setInterval(() => {
            this.timerValue--;
            document.getElementById('timer').textContent = this.timerValue;
            
            if (this.timerValue <= 10) {
                document.getElementById('timerDisplay').classList.add('text-red-800', 'bg-red-100');
            }
            
            if (this.timerValue <= 0) {
                this.stopTimer();
                this.skipQuestion();
            }
        }, 1000);
    },

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.getElementById('timerDisplay').classList.remove('text-red-800', 'bg-red-100');
    },

    // Leaderboard Functions
    renderLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = '';
        
        const topScores = [
            { name: 'David Bharat', score: 94, rank: 1 },
            { name: 'Anand Bharat', score: 92, rank: 2 },
            { name: 'Darrel Bharat', score: 86, rank: 3 },
            { name: 'Tom Boys', score: 75, rank: 4 }
        ];
        
        topScores.forEach((player) => {
            const item = document.createElement('div');
            item.className = 'player-card';
            item.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="player-avatar">
                        <span>${player.name.charAt(0)}</span>
                    </div>
                    <div>
                        <p class="font-bold text-white text-lg">${player.name}</p>
                        <p class="text-sm text-gray-300">Rank #${player.rank}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-3xl font-bold text-yellow-400">${player.score}%</p>
                    <p class="text-xs text-gray-400">Score</p>
                </div>
            `;
            leaderboardList.appendChild(item);
        });
    },

    filterLeaderboard(filter) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });
        // In a real app, this would filter the leaderboard data
    },

    // Stats Functions
    saveStats(score) {
        this.stats.totalQuizzes++;
        this.stats.scores.push(score);
        if (score > this.stats.bestScore) {
            this.stats.bestScore = score;
        }
        
        // Track topic stats
        if (!this.stats.topicStats[this.currentTopic]) {
            this.stats.topicStats[this.currentTopic] = {
                attempts: 0,
                totalScore: 0,
                bestScore: 0
            };
        }
        this.stats.topicStats[this.currentTopic].attempts++;
        this.stats.topicStats[this.currentTopic].totalScore += score;
        if (score > this.stats.topicStats[this.currentTopic].bestScore) {
            this.stats.topicStats[this.currentTopic].bestScore = score;
        }
        
        localStorage.setItem('mathQuizStats', JSON.stringify(this.stats));
    },

    loadStats() {
        const saved = localStorage.getItem('mathQuizStats');
        if (saved) {
            this.stats = JSON.parse(saved);
        }
    },

    renderStats() {
        document.getElementById('totalQuizzes').textContent = this.stats.totalQuizzes;
        const avg = this.stats.scores.length > 0 
            ? Math.round(this.stats.scores.reduce((a, b) => a + b, 0) / this.stats.scores.length) 
            : 0;
        document.getElementById('avgScore').textContent = avg + '%';
        document.getElementById('bestScore').textContent = this.stats.bestScore + '%';
        
        // Topic Performance
        const topicPerformance = document.getElementById('topicPerformance');
        topicPerformance.innerHTML = '';
        
        const topicIcons = {
            'statistics': '📊',
            'algebra': '🔢',
            'calculus': '∫',
            'geometry': '📐',
            'linearAlgebra': '📈',
            'discreteMath': '🎲'
        };
        
        const topicNames = {
            'statistics': 'Statistics',
            'algebra': 'Algebra',
            'calculus': 'Calculus',
            'geometry': 'Geometry',
            'linearAlgebra': 'Linear Algebra',
            'discreteMath': 'Discrete Math'
        };
        
        for (const [topic, data] of Object.entries(this.stats.topicStats)) {
            const avgTopicScore = Math.round(data.totalScore / data.attempts);
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center bg-white p-3 rounded-lg';
            div.innerHTML = `
                <div class="flex items-center gap-2">
                    <span class="text-2xl">${topicIcons[topic] || '📚'}</span>
                    <div>
                        <p class="font-bold text-gray-800">${topicNames[topic] || topic}</p>
                        <p class="text-xs text-gray-500">${data.attempts} attempts</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold text-purple-700">${avgTopicScore}%</p>
                    <p class="text-xs text-gray-500">Best: ${data.bestScore}%</p>
                </div>
            `;
            topicPerformance.appendChild(div);
        }
        
        // Achievements
        this.renderAchievements();
    },

    renderAchievements() {
        const achievementsList = document.getElementById('achievementsList');
        achievementsList.innerHTML = '';
        
        const achievements = [
            { icon: '🎯', name: 'First Quiz', unlocked: this.stats.totalQuizzes >= 1 },
            { icon: '🔥', name: '10 Quizzes', unlocked: this.stats.totalQuizzes >= 10 },
            { icon: '🌟', name: 'Perfect Score', unlocked: this.stats.bestScore === 100 },
            { icon: '💯', name: 'Score 90+', unlocked: this.stats.bestScore >= 90 },
            { icon: '📚', name: 'All Topics', unlocked: Object.keys(this.stats.topicStats).length >= 6 },
            { icon: '👑', name: 'Math King', unlocked: this.stats.totalQuizzes >= 50 }
        ];
        
        achievements.forEach(achievement => {
            const div = document.createElement('div');
            div.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            div.innerHTML = `
                <div class="text-3xl mb-1">${achievement.icon}</div>
                <p class="text-xs font-bold text-gray-700">${achievement.name}</p>
            `;
            achievementsList.appendChild(div);
        });
    },

    // Settings Functions
    loadSettings() {
        const saved = localStorage.getItem('mathQuizSettings');
        if (saved) {
            this.settings = JSON.parse(saved);
        }
    },

    saveSettings() {
        localStorage.setItem('mathQuizSettings', JSON.stringify(this.settings));
    },

    loadSettingsUI() {
        document.getElementById('timerToggle').checked = this.settings.timerEnabled;
        document.getElementById('soundToggle').checked = this.settings.soundEnabled;
        document.getElementById('difficultySelect').value = this.settings.difficulty;
    },

    toggleTimer() {
        this.settings.timerEnabled = document.getElementById('timerToggle').checked;
        this.saveSettings();
    },

    toggleSound() {
        this.settings.soundEnabled = document.getElementById('soundToggle').checked;
        this.saveSettings();
    },

    changeDifficulty() {
        this.settings.difficulty = document.getElementById('difficultySelect').value;
        this.saveSettings();
    },

    resetAllData() {
        if (confirm('Are you sure you want to reset all your data? This cannot be undone!')) {
            localStorage.removeItem('mathQuizStats');
            localStorage.removeItem('mathQuizSettings');
            this.stats = {
                totalQuizzes: 0,
                scores: [],
                bestScore: 0,
                topicStats: {}
            };
            this.settings = {
                timerEnabled: true,
                soundEnabled: true,
                difficulty: 'medium'
            };
            alert('All data has been reset!');
            this.showHome();
        }
    },

    // Utility Functions
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    playSound(isCorrect) {
        // Create simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = isCorrect ? 800 : 400;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Audio not supported');
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
