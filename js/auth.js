// Authentication System for Powermath Defenders
const authSystem = {
    currentUser: null,
    users: [],
    parents: [],

    // Initialize authentication system
    init() {
        this.loadUsers();
        this.loadParents();
        this.checkSession();
    },

    // Load users from localStorage
    loadUsers() {
        const savedUsers = localStorage.getItem('mathQuizUsers');
        this.users = savedUsers ? JSON.parse(savedUsers) : [];
    },

    // Load parents from localStorage
    loadParents() {
        const savedParents = localStorage.getItem('mathQuizParents');
        this.parents = savedParents ? JSON.parse(savedParents) : [];
    },

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('mathQuizUsers', JSON.stringify(this.users));
    },

    // Save parents to localStorage
    saveParents() {
        localStorage.setItem('mathQuizParents', JSON.stringify(this.parents));
    },

    // Check if user is already logged in
    checkSession() {
        const session = localStorage.getItem('mathQuizSession');
        if (session) {
            this.currentUser = JSON.parse(session);
            return true;
        }
        return false;
    },

    // Create session
    createSession(user) {
        this.currentUser = user;
        localStorage.setItem('mathQuizSession', JSON.stringify(user));
    },

    // Destroy session (logout)
    logout() {
        this.currentUser = null;
        localStorage.removeItem('mathQuizSession');
        app.showHome();
        this.showLoginUI();
    },

    // Show login modal
    showLogin() {
        const modal = document.createElement('div');
        modal.id = 'authModal';
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-overlay" onclick="authSystem.closeModal()"></div>
            <div class="auth-modal-content">
                <button class="auth-close-btn" onclick="authSystem.closeModal()">×</button>
                <div class="auth-header">
                    <h2 class="auth-title">Student Login</h2>
                    <p class="auth-subtitle">Enter your credentials to continue</p>
                </div>
                <form id="loginForm" onsubmit="authSystem.handleLogin(event)">
                    <div class="auth-input-group">
                        <label>Username or Email</label>
                        <input type="text" id="loginUsername" placeholder="Enter username or email" required>
                    </div>
                    <div class="auth-input-group">
                        <label>Password</label>
                        <input type="password" id="loginPassword" placeholder="Enter password" required>
                        <span class="password-toggle" onclick="authSystem.togglePassword('loginPassword')">👁️</span>
                    </div>
                    <div class="auth-remember">
                        <input type="checkbox" id="rememberMe">
                        <label for="rememberMe">Remember me</label>
                    </div>
                    <button type="submit" class="auth-btn auth-btn-primary">
                        Login
                    </button>
                    <div class="auth-divider">
                        <span>OR</span>
                    </div>
                    <button type="button" class="auth-btn auth-btn-secondary" onclick="authSystem.showRegister()">
                        Create New Account
                    </button>
                </form>
                <div id="authError" class="auth-error hidden"></div>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    },

    // Show registration modal
    showRegister() {
        const modal = document.getElementById('authModal');
        if (modal) modal.remove();

        const registerModal = document.createElement('div');
        registerModal.id = 'authModal';
        registerModal.className = 'auth-modal';
        registerModal.innerHTML = `
            <div class="auth-modal-overlay" onclick="authSystem.closeModal()"></div>
            <div class="auth-modal-content">
                <button class="auth-close-btn" onclick="authSystem.closeModal()">×</button>
                <div class="auth-header">
                    <h2 class="auth-title">Create Account</h2>
                    <p class="auth-subtitle">Join the Math Defenders team!</p>
                </div>
                <form id="registerForm" onsubmit="authSystem.handleRegister(event)">
                    <div class="auth-input-group">
                        <label>Full Name</label>
                        <input type="text" id="registerName" placeholder="Enter your full name" required>
                    </div>
                    <div class="auth-input-group">
                        <label>Username</label>
                        <input type="text" id="registerUsername" placeholder="Choose a username" required minlength="3">
                    </div>
                    <div class="auth-input-group">
                        <label>Email</label>
                        <input type="email" id="registerEmail" placeholder="Enter your email" required>
                    </div>
                    <div class="auth-input-group">
                        <label>Grade Level</label>
                        <select id="registerGrade" required>
                            <option value="">Select grade</option>
                            <option value="6">Grade 6</option>
                            <option value="7">Grade 7</option>
                            <option value="8">Grade 8</option>
                            <option value="9">Grade 9</option>
                            <option value="10">Grade 10</option>
                            <option value="11">Grade 11</option>
                            <option value="12">Grade 12</option>
                            <option value="college">College</option>
                        </select>
                    </div>
                    <div class="auth-input-group">
                        <label>Password</label>
                        <input type="password" id="registerPassword" placeholder="Create password" required minlength="6">
                        <span class="password-toggle" onclick="authSystem.togglePassword('registerPassword')">👁️</span>
                    </div>
                    <div class="auth-input-group">
                        <label>Confirm Password</label>
                        <input type="password" id="registerConfirmPassword" placeholder="Confirm password" required>
                        <span class="password-toggle" onclick="authSystem.togglePassword('registerConfirmPassword')">👁️</span>
                    </div>
                    <div class="auth-remember">
                        <input type="checkbox" id="agreeTerms" required>
                        <label for="agreeTerms">I agree to the Terms and Conditions</label>
                    </div>
                    <button type="submit" class="auth-btn auth-btn-primary">
                        Create Account
                    </button>
                    <div class="auth-divider">
                        <span>Already have an account?</span>
                    </div>
                    <button type="button" class="auth-btn auth-btn-secondary" onclick="authSystem.showLogin()">
                        Back to Login
                    </button>
                </form>
                <div id="authError" class="auth-error hidden"></div>
            </div>
        `;
        document.body.appendChild(registerModal);
        setTimeout(() => registerModal.classList.add('active'), 10);
    },

    // Show parent login modal
    showParentLogin() {
        const modal = document.createElement('div');
        modal.id = 'authModal';
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-overlay" onclick="authSystem.closeModal()"></div>
            <div class="auth-modal-content">
                <button class="auth-close-btn" onclick="authSystem.closeModal()">×</button>
                <div class="auth-header">
                    <h2 class="auth-title">Parent Login</h2>
                    <p class="auth-subtitle">Monitor your child's progress</p>
                </div>
                <form id="parentLoginForm" onsubmit="authSystem.handleParentLogin(event)">
                    <div class="auth-input-group">
                        <label>Email</label>
                        <input type="email" id="parentEmail" placeholder="Enter your email" required>
                    </div>
                    <div class="auth-input-group">
                        <label>Password</label>
                        <input type="password" id="parentPassword" placeholder="Enter password" required>
                        <span class="password-toggle" onclick="authSystem.togglePassword('parentPassword')">👁️</span>
                    </div>
                    <button type="submit" class="auth-btn auth-btn-primary">
                        Login as Parent
                    </button>
                    <div class="auth-divider">
                        <span>OR</span>
                    </div>
                    <button type="button" class="auth-btn auth-btn-secondary" onclick="authSystem.showParentRegister()">
                        Create Parent Account
                    </button>
                </form>
                <div id="authError" class="auth-error hidden"></div>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    },

    // Show parent registration modal
    showParentRegister() {
        const modal = document.getElementById('authModal');
        if (modal) modal.remove();

        const registerModal = document.createElement('div');
        registerModal.id = 'authModal';
        registerModal.className = 'auth-modal';
        registerModal.innerHTML = `
            <div class="auth-modal-overlay" onclick="authSystem.closeModal()"></div>
            <div class="auth-modal-content">
                <button class="auth-close-btn" onclick="authSystem.closeModal()">×</button>
                <div class="auth-header">
                    <h2 class="auth-title">Parent Registration</h2>
                    <p class="auth-subtitle">Create an account to monitor progress</p>
                </div>
                <form id="parentRegisterForm" onsubmit="authSystem.handleParentRegister(event)">
                    <div class="auth-input-group">
                        <label>Full Name</label>
                        <input type="text" id="parentRegisterName" placeholder="Enter your full name" required>
                    </div>
                    <div class="auth-input-group">
                        <label>Email</label>
                        <input type="email" id="parentRegisterEmail" placeholder="Enter your email" required>
                    </div>
                    <div class="auth-input-group">
                        <label>Phone Number</label>
                        <input type="tel" id="parentPhone" placeholder="Enter phone number" required>
                    </div>
                    <div class="auth-input-group">
                        <label>Child's Username</label>
                        <input type="text" id="childUsername" placeholder="Your child's username" required>
                    </div>
                    <div class="auth-input-group">
                        <label>Password</label>
                        <input type="password" id="parentRegisterPassword" placeholder="Create password" required minlength="6">
                        <span class="password-toggle" onclick="authSystem.togglePassword('parentRegisterPassword')">👁️</span>
                    </div>
                    <div class="auth-input-group">
                        <label>Confirm Password</label>
                        <input type="password" id="parentRegisterConfirmPassword" placeholder="Confirm password" required>
                        <span class="password-toggle" onclick="authSystem.togglePassword('parentRegisterConfirmPassword')">👁️</span>
                    </div>
                    <button type="submit" class="auth-btn auth-btn-primary">
                        Create Parent Account
                    </button>
                    <div class="auth-divider">
                        <span>Already have an account?</span>
                    </div>
                    <button type="button" class="auth-btn auth-btn-secondary" onclick="authSystem.showParentLogin()">
                        Back to Login
                    </button>
                </form>
                <div id="authError" class="auth-error hidden"></div>
            </div>
        `;
        document.body.appendChild(registerModal);
        setTimeout(() => registerModal.classList.add('active'), 10);
    },

    // Handle login
    handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Find user
        const user = this.users.find(u => 
            (u.username === username || u.email === username) && u.password === password
        );

        if (user) {
            this.createSession({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                grade: user.grade,
                type: 'student'
            });
            this.closeModal();
            this.showWelcomeMessage(user.name);
            app.showTopicSelection();
        } else {
            this.showError('Invalid username/email or password');
        }
    },

    // Handle registration
    handleRegister(event) {
        event.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const grade = document.getElementById('registerGrade').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validate
        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        // Check if username exists
        if (this.users.find(u => u.username === username)) {
            this.showError('Username already exists');
            return;
        }

        // Check if email exists
        if (this.users.find(u => u.email === email)) {
            this.showError('Email already registered');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            username,
            email,
            grade,
            password,
            createdAt: new Date().toISOString(),
            stats: {
                totalQuizzes: 0,
                scores: [],
                bestScore: 0
            }
        };

        this.users.push(newUser);
        this.saveUsers();

        // Auto login
        this.createSession({
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            grade: newUser.grade,
            type: 'student'
        });

        this.closeModal();
        this.showWelcomeMessage(newUser.name, true);
        app.showTopicSelection();
    },

    // Handle parent login
    handleParentLogin(event) {
        event.preventDefault();
        const email = document.getElementById('parentEmail').value.trim();
        const password = document.getElementById('parentPassword').value;

        const parent = this.parents.find(p => 
            p.email === email && p.password === password
        );

        if (parent) {
            this.createSession({
                id: parent.id,
                name: parent.name,
                email: parent.email,
                childUsername: parent.childUsername,
                type: 'parent'
            });
            this.closeModal();
            this.showParentDashboard();
        } else {
            this.showError('Invalid email or password');
        }
    },

    // Handle parent registration
    handleParentRegister(event) {
        event.preventDefault();
        const name = document.getElementById('parentRegisterName').value.trim();
        const email = document.getElementById('parentRegisterEmail').value.trim();
        const phone = document.getElementById('parentPhone').value.trim();
        const childUsername = document.getElementById('childUsername').value.trim();
        const password = document.getElementById('parentRegisterPassword').value;
        const confirmPassword = document.getElementById('parentRegisterConfirmPassword').value;

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        // Check if child exists
        const child = this.users.find(u => u.username === childUsername);
        if (!child) {
            this.showError('Child username not found. Please ensure your child has registered first.');
            return;
        }

        // Check if email exists
        if (this.parents.find(p => p.email === email)) {
            this.showError('Email already registered');
            return;
        }

        const newParent = {
            id: Date.now(),
            name,
            email,
            phone,
            childUsername,
            password,
            createdAt: new Date().toISOString()
        };

        this.parents.push(newParent);
        this.saveParents();

        this.createSession({
            id: newParent.id,
            name: newParent.name,
            email: newParent.email,
            childUsername: newParent.childUsername,
            type: 'parent'
        });

        this.closeModal();
        this.showParentDashboard();
    },

    // Show parent dashboard
    showParentDashboard() {
        app.hideAll();
        const child = this.users.find(u => u.username === this.currentUser.childUsername);
        
        const dashboardHTML = `
            <div class="max-w-4xl mx-auto">
                <div class="card p-8">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h2 class="text-3xl font-bold text-purple-800">Parent Dashboard</h2>
                            <p class="text-gray-600">Welcome, ${this.currentUser.name}</p>
                        </div>
                        <button onclick="authSystem.logout()" class="btn-back">Logout</button>
                    </div>

                    <div class="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
                        <h3 class="font-bold text-xl text-purple-800 mb-2">Monitoring: ${child ? child.name : 'Student not found'}</h3>
                        <p class="text-gray-600">Username: @${this.currentUser.childUsername}</p>
                    </div>

                    ${child ? `
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="stat-card bg-gradient-to-br from-blue-100 to-blue-200">
                                <div class="text-4xl mb-2">🎮</div>
                                <p class="text-sm text-gray-600">Total Quizzes</p>
                                <p class="text-3xl font-bold text-blue-800">${child.stats.totalQuizzes}</p>
                            </div>
                            <div class="stat-card bg-gradient-to-br from-green-100 to-green-200">
                                <div class="text-4xl mb-2">📈</div>
                                <p class="text-sm text-gray-600">Average Score</p>
                                <p class="text-3xl font-bold text-green-800">${child.stats.scores.length > 0 ? Math.round(child.stats.scores.reduce((a,b) => a+b, 0) / child.stats.scores.length) : 0}%</p>
                            </div>
                            <div class="stat-card bg-gradient-to-br from-yellow-100 to-yellow-200">
                                <div class="text-4xl mb-2">⭐</div>
                                <p class="text-sm text-gray-600">Best Score</p>
                                <p class="text-3xl font-bold text-yellow-800">${child.stats.bestScore}%</p>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 border-2 border-gray-200">
                            <h3 class="font-bold text-lg text-gray-800 mb-4">Recent Activity</h3>
                            ${child.stats.scores.length > 0 ? `
                                <div class="space-y-3">
                                    ${child.stats.scores.slice(-5).reverse().map((score, index) => `
                                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span class="text-gray-600">Quiz #${child.stats.scores.length - index}</span>
                                            <span class="font-bold ${score >= 70 ? 'text-green-600' : 'text-orange-600'}">${score}%</span>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<p class="text-gray-500 text-center py-4">No activity yet</p>'}
                        </div>
                    ` : '<p class="text-red-500 text-center py-8">Child account not found</p>'}
                </div>
            </div>
        `;

        const container = document.querySelector('.container');
        const tempDiv = document.createElement('div');
        tempDiv.id = 'parentDashboard';
        tempDiv.innerHTML = dashboardHTML;
        container.appendChild(tempDiv);
    },

    // Show welcome message
    showWelcomeMessage(name, isNewUser = false) {
        const message = document.createElement('div');
        message.className = 'welcome-message';
        message.innerHTML = `
            <div class="welcome-content">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="text-2xl font-bold text-white mb-2">
                    ${isNewUser ? 'Welcome to Powermath Defenders!' : 'Welcome Back!'}
                </h3>
                <p class="text-white text-lg">Hello, ${name}!</p>
            </div>
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.classList.add('show');
        }, 100);

        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 500);
        }, 3000);
    },

    // Show error message
    showError(message) {
        const errorDiv = document.getElementById('authError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            setTimeout(() => errorDiv.classList.add('hidden'), 5000);
        }
    },

    // Toggle password visibility
    togglePassword(inputId) {
        const input = document.getElementById(inputId);
        const toggle = input.nextElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
            toggle.textContent = '🙈';
        } else {
            input.type = 'password';
            toggle.textContent = '👁️';
        }
    },

    // Close modal
    closeModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    // Show login UI on home screen
    showLoginUI() {
        if (this.currentUser) {
            // User is logged in - show user info
            const userInfo = document.createElement('div');
            userInfo.className = 'user-info';
            userInfo.innerHTML = `
                <div class="user-avatar">${this.currentUser.name.charAt(0)}</div>
                <div class="user-details">
                    <p class="user-name">${this.currentUser.name}</p>
                    <p class="user-type">${this.currentUser.type === 'parent' ? 'Parent' : 'Student'}</p>
                </div>
                <button onclick="authSystem.logout()" class="logout-btn">Logout</button>
            `;
            
            const homeScreen = document.getElementById('homeScreen');
            if (homeScreen && !document.querySelector('.user-info')) {
                homeScreen.querySelector('.phone-content').prepend(userInfo);
            }
        }
    }
};

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    authSystem.init();
    
    if (authSystem.currentUser) {
        authSystem.showLoginUI();
    }
});
