// script.js - Enhanced Multi-Type Quiz App

// Game State
let gameState = {
    userName: '',
    currentLevel: 0,
    currentQuestionIndex: 0,
    score: 0,
    maxLevel: 0,
    answeredQuestions: 0
};

// Quiz Data with Multiple Question Types
const levels = [
    { 
        name: 'TECH JUNGLE', 
        icon: '🌴', 
        difficulty: 'Easy',
        gradient: 'from-green-500 to-teal-600'
    },
    { 
        name: 'GALACTIC VISTA', 
        icon: '🚀', 
        difficulty: 'Medium',
        gradient: 'from-blue-500 to-purple-600'
    },
    { 
        name: 'UNDERWATER BASE', 
        icon: '🌊', 
        difficulty: 'Hard',
        gradient: 'from-cyan-500 to-blue-600'
    },
    { 
        name: 'GAMING WORKSHOP', 
        icon: '🎮', 
        difficulty: 'Expert',
        gradient: 'from-pink-500 to-purple-600'
    }
];

// Enhanced Questions with Multiple Types
const questions = [
    // Level 0 - TECH JUNGLE (Easy)
    {
        level: 0,
        type: 'multiple-choice',
        question: "What is 15 + 27?",
        options: ["40", "42", "45", "38"],
        correct: 1
    },
    {
        level: 0,
        type: 'true-false',
        question: "Is 8 × 7 equal to 56?",
        options: ["True", "False"],
        correct: 0
    },
    {
        level: 0,
        type: 'fill-blank',
        question: "12 + 8 = ___",
        correct: "20",
        acceptableAnswers: ["20", "twenty"]
    },
    
    // Level 1 - GALACTIC VISTA (Medium)
    {
        level: 1,
        type: 'multiple-choice',
        question: "What is 8 × 9?",
        options: ["72", "81", "64", "56"],
        correct: 0
    },
    {
        level: 1,
        type: 'true-false',
        question: "Is 100 ÷ 5 equal to 25?",
        options: ["True", "False"],
        correct: 1
    },
    {
        level: 1,
        type: 'fill-blank',
        question: "9 × 6 = ___",
        correct: "54",
        acceptableAnswers: ["54", "fifty-four", "fifty four"]
    },
    
    // Level 2 - UNDERWATER BASE (Hard)
    {
        level: 2,
        type: 'multiple-choice',
        question: "What is 144 ÷ 12?",
        options: ["10", "11", "12", "13"],
        correct: 2
    },
    {
        level: 2,
        type: 'true-false',
        question: "Is 15² equal to 225?",
        options: ["True", "False"],
        correct: 0
    },
    {
        level: 2,
        type: 'fill-blank',
        question: "√64 = ___",
        correct: "8",
        acceptableAnswers: ["8", "eight"]
    },
    
    // Level 3 - GAMING WORKSHOP (Expert)
    {
        level: 3,
        type: 'multiple-choice',
        question: "What is 25²?",
        options: ["525", "625", "725", "500"],
        correct: 1
    },
    {
        level: 3,
        type: 'true-false',
        question: "Is 7³ equal to 343?",
        options: ["True", "False"],
        correct: 0
    },
    {
        level: 3,
        type: 'fill-blank',
        question: "√121 = ___",
        correct: "11",
        acceptableAnswers: ["11", "eleven"]
    }
];

let leaderboardData = [
    { name: 'Arjun Bharat', score: 94, xp: 870 },
    { name: 'Priya Sharma', score: 92, xp: 820 },
    { name: 'Rohan Singh', score: 86, xp: 750 }
];

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
    createStars();
    updateLeaderboard();
});

// Create animated stars
function createStars() {
    const container = document.getElementById('starsContainer');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = Math.random() * 2 + 2 + 's';
        container.appendChild(star);
    }
}

// Screen Navigation
function showScreen(screenId) {
    const screens = ['homeScreen', 'registerScreen', 'levelsScreen', 'quizScreen', 'leaderboardScreen'];
    screens.forEach(id => {
        const screen = document.getElementById(id);
        if (id === screenId) {
            screen.classList.remove('hidden');
        } else {
            screen.classList.add('hidden');
        }
    });
}

// Start Game
function startGame() {
    const nameInput = document.getElementById('userName');
    const name = nameInput.value.trim();
    
    if (name === '') {
        alert('Please enter your name!');
        return;
    }
    
    gameState.userName = name;
    gameState.maxLevel = 0;
    gameState.score = 0;
    gameState.answeredQuestions = 0;
    renderLevels();
    showScreen('levelsScreen');
}

// Render Levels
function renderLevels() {
    const container = document.getElementById('levelsContainer');
    container.innerHTML = '';
    
    levels.forEach((level, index) => {
        const isUnlocked = index <= gameState.maxLevel;
        const alignment = index % 2 === 0 ? 'justify-start pr-[55%]' : 'justify-end pl-[55%]';
        
        const levelItem = document.createElement('div');
        levelItem.className = `flex ${alignment}`;
        levelItem.innerHTML = `
            <div class="bg-gradient-to-br ${level.gradient} rounded-3xl p-6 shadow-2xl cursor-pointer transition-all hover:scale-105 ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''} min-w-[180px]"
                ${isUnlocked ? `onclick="startLevel(${index})"` : ''}>
                <div class="text-5xl mb-3">${level.icon}</div>
                <h3 class="text-white text-lg font-bold mb-1">${level.name}</h3>
                <p class="text-white/80 text-sm mb-2">${level.difficulty}</p>
                ${isUnlocked ? '<div class="text-2xl">⚡</div>' : '<div class="text-2xl">🔒</div>'}
            </div>
        `;
        container.appendChild(levelItem);
    });
}

// Start Level
function startLevel(levelIndex) {
    if (levelIndex > gameState.maxLevel) return;
    
    gameState.currentLevel = levelIndex;
    gameState.currentQuestionIndex = levelIndex * 3; // 3 questions per level
    loadQuestion();
    showScreen('quizScreen');
}

// Load Question
function loadQuestion() {
    const question = questions[gameState.currentQuestionIndex];
    const level = levels[gameState.currentLevel];
    
    // Update UI elements
    document.getElementById('quizLevelName').textContent = level.name;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = gameState.answeredQuestions + 1;
    document.getElementById('scoreValue').textContent = gameState.score;
    
    // Update progress bar
    const progress = ((gameState.answeredQuestions + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Update question type badge
    const typeBadge = document.getElementById('questionTypeBadge');
    const typeLabels = {
        'multiple-choice': 'Multiple Choice',
        'true-false': 'True or False',
        'fill-blank': 'Fill in the Blank'
    };
    typeBadge.textContent = typeLabels[question.type];
    
    // Hide try again button
    document.getElementById('tryAgainBtn').classList.add('hidden');
    
    // Render question based on type
    if (question.type === 'fill-blank') {
        renderFillBlankQuestion();
    } else {
        renderChoiceQuestion(question);
    }
}

// Render Multiple Choice or True/False Question
function renderChoiceQuestion(question) {
    document.getElementById('optionsContainer').classList.remove('hidden');
    document.getElementById('fillBlankContainer').classList.add('hidden');
    
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left py-4 px-6 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 bg-white/20 backdrop-blur-lg border border-white/30 text-white hover:bg-white/30';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        container.appendChild(btn);
    });
}

// Render Fill in the Blank Question
function renderFillBlankQuestion() {
    document.getElementById('optionsContainer').classList.add('hidden');
    document.getElementById('fillBlankContainer').classList.remove('hidden');
    
    const input = document.getElementById('fillBlankInput');
    input.value = '';
    input.disabled = false;
    input.className = 'w-full bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white text-xl placeholder-white/60 rounded-2xl py-4 px-6 focus:border-yellow-400 focus:bg-white/30 transition-all text-center font-bold';
    
    // Allow Enter key to submit
    input.onkeypress = (e) => {
        if (e.key === 'Enter') {
            submitFillBlank();
        }
    };
}

// Select Answer (Multiple Choice / True-False)
function selectAnswer(selectedIndex) {
    const question = questions[gameState.currentQuestionIndex];
    const optionBtns = document.querySelectorAll('#optionsContainer button');
    
    // Disable all buttons
    optionBtns.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('hover:scale-105', 'hover:bg-white/30');
        btn.classList.add('cursor-not-allowed', 'opacity-60');
    });
    
    // Check if answer is correct
    const isCorrect = selectedIndex === question.correct;
    
    // Mark correct answer
    optionBtns[question.correct].classList.remove('bg-white/20');
    optionBtns[question.correct].classList.add('bg-gradient-to-r', 'from-green-500', 'to-emerald-600', 'pulse-correct');
    
    if (isCorrect) {
        // Correct answer
        gameState.score += 10;
        document.getElementById('scoreValue').textContent = gameState.score;
        gameState.answeredQuestions++;
        
        setTimeout(() => {
            nextQuestion();
        }, 1500);
    } else {
        // Wrong answer
        optionBtns[selectedIndex].classList.remove('bg-white/20');
        optionBtns[selectedIndex].classList.add('bg-gradient-to-r', 'from-red-500', 'to-pink-600', 'shake-wrong');
        document.getElementById('tryAgainBtn').classList.remove('hidden');
    }
}

// Submit Fill in the Blank Answer
function submitFillBlank() {
    const question = questions[gameState.currentQuestionIndex];
    const input = document.getElementById('fillBlankInput');
    const userAnswer = input.value.trim().toLowerCase();
    
    if (userAnswer === '') {
        alert('Please enter an answer!');
        return;
    }
    
    // Disable input
    input.disabled = true;
    
    // Check if answer is correct
    const acceptableAnswers = question.acceptableAnswers.map(ans => ans.toLowerCase());
    const isCorrect = acceptableAnswers.includes(userAnswer);
    
    if (isCorrect) {
        // Correct answer
        input.className = 'w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl rounded-2xl py-4 px-6 text-center font-bold pulse-correct';
        gameState.score += 10;
        document.getElementById('scoreValue').textContent = gameState.score;
        gameState.answeredQuestions++;
        
        setTimeout(() => {
            nextQuestion();
        }, 1500);
    } else {
        // Wrong answer
        input.className = 'w-full bg-gradient-to-r from-red-500 to-pink-600 text-white text-xl rounded-2xl py-4 px-6 text-center font-bold shake-wrong';
        document.getElementById('tryAgainBtn').classList.remove('hidden');
        
        // Show correct answer after 2 seconds
        setTimeout(() => {
            alert(`Correct answer: ${question.correct}`);
        }, 1000);
    }
}

// Next Question
function nextQuestion() {
    // Check if we've completed all questions in current level
    const questionsPerLevel = 3;
    const questionsInCurrentLevel = gameState.currentQuestionIndex - (gameState.currentLevel * questionsPerLevel) + 1;
    
    if (questionsInCurrentLevel >= questionsPerLevel) {
        // Level completed, unlock next level
        if (gameState.currentLevel < levels.length - 1) {
            gameState.maxLevel = Math.max(gameState.maxLevel, gameState.currentLevel + 1);
            renderLevels();
            showScreen('levelsScreen');
        } else {
            // All levels completed
            finishQuiz();
        }
    } else {
        // Load next question in current level
        gameState.currentQuestionIndex++;
        loadQuestion();
    }
}

// Finish Quiz
function finishQuiz() {
    // Add player to leaderboard
    const playerEntry = {
        name: gameState.userName,
        score: gameState.score,
        xp: gameState.score * 10
    };
    
    leaderboardData.push(playerEntry);
    leaderboardData.sort((a, b) => b.score - a.score);
    leaderboardData = leaderboardData.slice(0, 5);
    
    updateLeaderboard();
    document.getElementById('finalScore').textContent = gameState.score;
    showScreen('leaderboardScreen');
}

// Update Leaderboard
function updateLeaderboard() {
    const container = document.getElementById('leaderboardList');
    container.innerHTML = '';
    
    leaderboardData.forEach((player, index) => {
        const rankClasses = [
            'bg-gradient-to-br from-yellow-400 to-orange-500 text-yellow-900',
            'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700',
            'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900',
            'bg-gradient-to-br from-purple-400 to-purple-600 text-white'
        ];
        const rankClass = rankClasses[Math.min(index, 3)];
        
        const item = document.createElement('div');
        item.className = 'flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4';
        item.innerHTML = `
            <div class="w-12 h-12 rounded-full ${rankClass} flex items-center justify-center font-black text-lg flex-shrink-0">
                ${index + 1}
            </div>
            <div class="flex-1">
                <div class="text-white font-bold text-lg">${player.name}</div>
                <div class="text-white/60 text-sm">${player.xp} XP</div>
            </div>
            <div class="text-right">
                <div class="text-white font-black text-2xl">${player.score}</div>
                <div class="text-yellow-300">⭐</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// Reset Quiz
function resetQuiz() {
    gameState.score = 0;
    gameState.currentLevel = 0;
    gameState.currentQuestionIndex = 0;
    gameState.answeredQuestions = 0;
    renderLevels();
    showScreen('levelsScreen');
}
