// Application State
const landingState = {
    isLoggedIn: false,
    userEmail: '',
    userName: '',
    preferredPlatform: ''
};

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const successModal = document.getElementById('success-modal');

// Smooth scroll to sections
function scrollToSignUp() {
    document.getElementById('signup').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Mobile navigation toggle
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Header scroll effect
function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.classList.remove('scrolled');
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.step-card, .platform-item, .feature-item, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// Platform hover effects
function setupPlatformInteractions() {
    const platformItems = document.querySelectorAll('.platform-item');
    
    platformItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add pulse animation
            item.style.animation = 'pulse 0.6s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.animation = '';
        });
        
        item.addEventListener('click', () => {
            const platform = item.dataset.platform;
            // Pre-fill the signup form
            const platformSelect = document.getElementById('platform-interest');
            platformSelect.value = platform;
            scrollToSignUp();
        });
    });
}

// Form validation
function validateSignupForm() {
    const email = document.getElementById('email').value.trim();
    const fullname = document.getElementById('fullname').value.trim();
    const platform = document.getElementById('platform-interest').value;
    
    const errors = [];
    
    if (!email) {
        errors.push('Email is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!fullname) {
        errors.push('Full name is required');
    } else if (fullname.length < 2) {
        errors.push('Full name must be at least 2 characters');
    }
    
    if (!platform) {
        errors.push('Please select your main platform');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        data: { email, fullname, platform }
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle sign up
function handleSignUp() {
    const validation = validateSignupForm();
    
    if (!validation.isValid) {
        showErrors(validation.errors);
        return;
    }
    
    // Update application state
    landingState.isLoggedIn = true;
    landingState.userEmail = validation.data.email;
    landingState.userName = validation.data.fullname;
    landingState.preferredPlatform = validation.data.platform;
    
    // Save to localStorage
    localStorage.setItem('smmUser', JSON.stringify(landingState));
    
    // Show success modal
    showSuccessModal();
    
    // Redirect to main app after delay
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 3000);
}

function showErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.style.cssText = `
        background: #fee2e2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        font-size: 0.9rem;
    `;
    
    const errorList = document.createElement('ul');
    errorList.style.margin = '0';
    errorList.style.paddingLeft = '1.5rem';
    
    errors.forEach(error => {
        const listItem = document.createElement('li');
        listItem.textContent = error;
        errorList.appendChild(listItem);
    });
    
    errorContainer.appendChild(errorList);
    
    // Insert before signup button
    const signupBtn = document.querySelector('.signup-btn');
    signupBtn.parentNode.insertBefore(errorContainer, signupBtn);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.remove();
        }
    }, 5000);
}

function showSuccessModal() {
    successModal.classList.remove('hidden');
    
    // Add celebration animation
    createCelebrationEffect();
}

function createCelebrationEffect() {
    const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10001;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileNav();
                }
            }
        });
    });
}

// Testimonial carousel effect
function setupTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.transform = 'scale(1.05)';
                testimonial.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.3)';
            } else {
                testimonial.style.transform = 'scale(1)';
                testimonial.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 4000);
}

// Platform statistics animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                animateNumber(target, finalNumber);
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, finalText) {
    const number = parseInt(finalText.replace(/[^0-9]/g, ''));
    const suffix = finalText.replace(/[0-9]/g, '');
    const duration = 2000;
    const steps = 50;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = finalText;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, duration / steps);
}

// Typing effect for hero subtitle
function typeWriter(text, element, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Check if user is already logged in
function checkUserStatus() {
    const savedUser = localStorage.getItem('smmUser');
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            if (userData.isLoggedIn) {
                // User is already logged in, show option to go to app
                showLoggedInState(userData);
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('smmUser');
        }
    }
}

function showLoggedInState(userData) {
    const signupSection = document.getElementById('signup');
    const ctaContent = signupSection.querySelector('.cta-content');
    
    ctaContent.innerHTML = `
        <h2>👋 Welcome back, ${userData.userName}!</h2>
        <p>Ready to continue growing your ${userData.preferredPlatform} presence?</p>
        <button class="signup-btn" onclick="goToApp()">
            🚀 Go to Dashboard
        </button>
        <p class="signup-note">
            <a href="#" onclick="logout()" style="color: rgba(255,255,255,0.8); text-decoration: underline;">
                Not you? Sign out
            </a>
        </p>
    `;
}

function goToApp() {
    window.location.href = 'app.html';
}

function logout() {
    localStorage.removeItem('smmUser');
    landingState.isLoggedIn = false;
    location.reload();
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .error-message {
            animation: slideInFromTop 0.3s ease;
        }
        
        @keyframes slideInFromTop {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    addDynamicStyles();
    checkUserStatus();
    setupScrollAnimations();
    setupPlatformInteractions();
    setupSmoothScrolling();
    setupTestimonialCarousel();
    animateStats();
    
    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileNav);
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Hero subtitle typing effect
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    setTimeout(() => {
        typeWriter(originalText, heroSubtitle, 30);
    }, 1000);
    
    // Form input enhancements
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
            input.style.boxShadow = 'none';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileNav();
            }
        }
    });
    
    // Platform selection from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const platform = urlParams.get('platform');
    if (platform) {
        const platformSelect = document.getElementById('platform-interest');
        platformSelect.value = platform;
        setTimeout(() => scrollToSignUp(), 1000);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key in form fields
    if (e.key === 'Enter' && e.target.matches('#email, #fullname, #platform-interest')) {
        e.preventDefault();
        handleSignUp();
    }
    
    // Escape to close modal
    if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
        successModal.classList.add('hidden');
    }
});

// Export functions for global access
window.scrollToSignUp = scrollToSignUp;
window.handleSignUp = handleSignUp;
window.goToApp = goToApp;
window.logout = logout; 