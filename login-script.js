// Login & Register Page JavaScript

// DOM Elements
const particlesCanvas = document.getElementById('particles-canvas');
const successModal = document.getElementById('success-modal');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeFormValidation();
    initializeAnimations();
});

// Particle System
function initializeParticles() {
    if (!particlesCanvas) return;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }
    
    function createParticle() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1
        };
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Clear previous errors
    clearFieldError(event);
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (fieldType === 'password' && value) {
        if (value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            isValid = false;
            errorMessage = 'Password must contain uppercase, lowercase, and number';
        }
    } else if (fieldName === 'confirm-password' && value) {
        const passwordField = document.getElementById('password');
        if (passwordField && value !== passwordField.value) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(event) {
    const field = event.target;
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

// Animation initialization
function initializeAnimations() {
    // Animate form elements on load
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        authCard.classList.add('animate-in');
    }
    
    // Add hover effects to social buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Social Authentication Functions
function loginWithGoogle() {
    showLoadingState('Connecting to Google...');
    
    // Simulate API call
    setTimeout(() => {
        showSuccessModal('Google Sign-In Successful!', 'You have successfully signed in with Google.');
    }, 1500);
}

function loginWithApple() {
    showLoadingState('Connecting to Apple...');
    
    setTimeout(() => {
        showSuccessModal('Apple Sign-In Successful!', 'You have successfully signed in with Apple.');
    }, 1500);
}

function loginWithFacebook() {
    showLoadingState('Connecting to Facebook...');
    
    setTimeout(() => {
        showSuccessModal('Facebook Sign-In Successful!', 'You have successfully signed in with Facebook.');
    }, 1500);
}

function loginWithTwitter() {
    showLoadingState('Connecting to X...');
    
    setTimeout(() => {
        showSuccessModal('X Sign-In Successful!', 'You have successfully signed in with X.');
    }, 1500);
}

function loginWithGithub() {
    showLoadingState('Connecting to GitHub...');
    
    setTimeout(() => {
        showSuccessModal('GitHub Sign-In Successful!', 'You have successfully signed in with GitHub.');
    }, 1500);
}

function loginWithLinkedIn() {
    showLoadingState('Connecting to LinkedIn...');
    
    setTimeout(() => {
        showSuccessModal('LinkedIn Sign-In Successful!', 'You have successfully signed in with LinkedIn.');
    }, 1500);
}

// Register functions (same as login for demo)
function registerWithGoogle() { loginWithGoogle(); }
function registerWithApple() { loginWithApple(); }
function registerWithFacebook() { loginWithFacebook(); }
function registerWithTwitter() { loginWithTwitter(); }
function registerWithGithub() { loginWithGithub(); }
function registerWithLinkedIn() { loginWithLinkedIn(); }

// Form Submission Handlers
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    showLoadingState('Signing you in...');
    
    // Simulate API call
    setTimeout(() => {
        if (email && password) {
            showSuccessModal('Welcome Back!', 'You have successfully signed in to your account.');
            
            // Simulate redirect after success
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 3000);
        } else {
            showErrorMessage('Please check your credentials and try again.');
        }
    }, 2000);
}

function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const fullname = formData.get('fullname');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const platform = formData.get('platform');
    const termsAccepted = formData.get('terms');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match.');
        return;
    }
    
    // Check if terms are accepted
    if (!termsAccepted) {
        showErrorMessage('Please accept the Terms of Service to continue.');
        return;
    }
    
    showLoadingState('Creating your account...');
    
    // Simulate API call
    setTimeout(() => {
        if (fullname && email && password && platform) {
            showSuccessModal('Account Created!', 'Welcome to SMM-AI! Please check your email to verify your account.');
            
            // Simulate redirect after success
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 3000);
        } else {
            showErrorMessage('Please fill in all required fields.');
        }
    }, 2000);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const fieldEvent = { target: input };
        if (!validateField(fieldEvent)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Password Toggle Functions
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleBtn = passwordField.nextElementSibling.nextElementSibling;
    const icon = toggleBtn.querySelector('i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function toggleConfirmPassword() {
    const passwordField = document.getElementById('confirm-password');
    const toggleBtn = passwordField.nextElementSibling.nextElementSibling;
    const icon = toggleBtn.querySelector('i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Modal Functions
function showSuccessModal(title, message) {
    const modal = document.getElementById('success-modal');
    const modalTitle = modal.querySelector('.modal-body h3');
    const modalMessage = modal.querySelector('.modal-body p');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    modal.classList.remove('hidden');
    
    // Show confetti effect
    createConfetti();
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
}

function showLoadingState(message) {
    const buttons = document.querySelectorAll('.auth-btn, .social-btn');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.7';
        button.style.cursor = 'not-allowed';
    });
    
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    loadingDiv.innerHTML = `
        <div class="spinner"></div>
        <span>${message}</span>
    `;
    
    document.body.appendChild(loadingDiv);
}

function hideLoadingState() {
    const buttons = document.querySelectorAll('.auth-btn, .social-btn');
    buttons.forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    });
    
    const loadingDiv = document.querySelector('.loading-indicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function showErrorMessage(message) {
    hideLoadingState();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Confetti Effect
function createConfetti() {
    const colors = ['#00ff88', '#39ff14', '#00ffaa', '#ffffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 10001;
            animation: confettiFall ${Math.random() * 2 + 1}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .field-error {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 0.3rem;
        display: block;
    }
    
    .error {
        border-color: #ff4757 !important;
        box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1) !important;
    }
    
    .loading-indicator {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10002;
        color: var(--text-light);
    }
    
    .spinner {
        width: 24px;
        height: 24px;
        border: 3px solid var(--glass-border);
        border-top: 3px solid var(--primary-green);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .error-message {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #ff4757;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10003;
        animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }
`;

document.head.appendChild(style);

// Close modal on backdrop click
document.addEventListener('click', function(event) {
    const modal = document.getElementById('success-modal');
    if (event.target === modal.querySelector('.modal-backdrop')) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Initialize tooltips for social buttons
document.addEventListener('DOMContentLoaded', function() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const platform = this.classList[1]; // Get platform class
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `Sign in with ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-dark);
                color: var(--text-light);
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                opacity: 0;
                animation: fadeIn 0.2s ease-out forwards;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        button.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Add fadeIn animation for tooltips
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(tooltipStyle); 