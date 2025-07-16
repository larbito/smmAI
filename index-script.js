// Futuristic SMM-AI JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeParticles();
    initializeScrollEffects();
    initializeCounterAnimations();
    initializeMobileMenu();
    initializePlatformCards();
    initializeStepCards();
    initializeFeatureCards();
    initializeFormValidation();
    initializeFloatingEmojis();
    initializeFloatingSocialLogos();
    initializeEnhancedTextAnimations();
    initializeSmoothScrolling();
    initializeAOS(); // Animate on Scroll
});

// Particle System for Background
function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    // Create animated background gradients
    let particleCount = 0;
    const maxParticles = 50;
    
    setInterval(() => {
        if (particleCount < maxParticles) {
            createParticle();
            particleCount++;
        }
    }, 2000);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(45deg, var(--primary-green), var(--neon-green));
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.2};
            left: ${Math.random() * 100}%;
            top: 100%;
            pointer-events: none;
            box-shadow: 0 0 10px var(--primary-green);
            animation: floatUp ${Math.random() * 10 + 15}s linear infinite;
        `;
        
        canvas.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                particleCount--;
            }
        }, 25000);
    }
    
    // Add floating animation CSS
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Scroll Effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Header background effect
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect for floating emojis
        const emojis = document.querySelectorAll('.emoji');
        emojis.forEach((emoji, index) => {
            const speed = 0.5 + (index * 0.1);
            emoji.style.transform = `translateY(${currentScrollY * speed}px) rotate(${currentScrollY * 0.1}deg)`;
        });
        
        lastScrollY = currentScrollY;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different sections
                if (entry.target.classList.contains('step-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.opacity = '1';
                    }, entry.target.dataset.step * 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.step-card, .platform-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas for thousands
            let displayValue = Math.floor(current);
            if (target >= 1000) {
                displayValue = displayValue.toLocaleString();
            }
            
            // Add suffix for percentage
            if (counter.parentElement.querySelector('.stat-label').textContent.includes('Rate')) {
                displayValue += '%';
            } else if (target >= 1000) {
                displayValue = Math.floor(current / 1000) + 'K+';
            }
            
            counter.textContent = displayValue;
        }, 16);
    };
    
    // Trigger animation when section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number[data-target]');
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 300);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Enhanced Mobile Menu
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add body scroll lock when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Platform Cards Enhanced Interactions
function initializePlatformCards() {
    const platformCards = document.querySelectorAll('.platform-card');
    
    platformCards.forEach((card, index) => {
        // Staggered animation on page load
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            card.style.boxShadow = '0 20px 60px var(--shadow-green), 0 0 40px var(--primary-green)';
            
            // Animate icon
            const icon = card.querySelector('.platform-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.color = 'var(--neon-green)';
            }
            
            // Start pulse animation
            const pulse = card.querySelector('.platform-pulse');
            if (pulse) {
                pulse.style.animation = 'platformPulse 0.5s ease-in-out infinite';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            
            const icon = card.querySelector('.platform-icon i');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = 'var(--primary-green)';
            }
            
            const pulse = card.querySelector('.platform-pulse');
            if (pulse) {
                pulse.style.animation = 'platformPulse 2s ease-in-out infinite';
            }
        });
        
        // Click effect
        card.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: var(--primary-green);
                opacity: 0.3;
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect CSS
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Step Cards Animation
function initializeStepCards() {
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-100px) rotate(-5deg)';
        
        // Enhanced hover interactions
        card.addEventListener('mouseenter', () => {
            // Glow effect
            const glow = card.querySelector('.step-glow');
            if (glow) {
                glow.style.opacity = '0.2';
            }
            
            // Animate emoji
            const emoji = card.querySelector('.step-emoji');
            if (emoji) {
                emoji.style.animation = 'stepFloat 1s ease-in-out infinite';
                emoji.style.transform = 'scale(1.2) rotate(10deg)';
            }
            
            // Number animation
            const number = card.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.step-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
            
            const emoji = card.querySelector('.step-emoji');
            if (emoji) {
                emoji.style.animation = 'stepFloat 3s ease-in-out infinite';
                emoji.style.transform = '';
            }
            
            const number = card.querySelector('.step-number');
            if (number) {
                number.style.transform = '';
            }
        });
    });
}

// Feature Cards Animation
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Enhanced glow effect
            const glow = card.querySelector('.feature-glow');
            if (glow) {
                glow.style.opacity = '0.1';
                glow.style.transform = 'scale(1.1)';
            }
            
            // Icon animation
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.filter = 'drop-shadow(0 0 30px var(--primary-green))';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.feature-glow');
            if (glow) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(1)';
            }
            
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.filter = 'drop-shadow(0 0 20px var(--shadow-green))';
            }
        });
    });
}

// Enhanced Form Validation
function initializeFormValidation() {
    const form = document.querySelector('.signup-form');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        // Real-time validation feedback
        input.addEventListener('input', () => {
            validateField(input);
        });
        
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.boxShadow = '0 0 0 3px rgba(0, 255, 136, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = '';
            if (!input.value) {
                input.style.boxShadow = '';
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing validation classes
        field.classList.remove('valid', 'invalid');
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else if (field.required) {
            isValid = value.length > 0;
        }
        
        // Add validation styling
        if (value.length > 0) {
            field.classList.add(isValid ? 'valid' : 'invalid');
            
            if (isValid) {
                field.style.borderColor = 'var(--primary-green)';
                field.style.boxShadow = '0 0 0 2px rgba(0, 255, 136, 0.3)';
            } else {
                field.style.borderColor = '#ff4444';
                field.style.boxShadow = '0 0 0 2px rgba(255, 68, 68, 0.3)';
            }
        }
        
        return isValid;
    }
}

// Floating Social Media Logos
function initializeFloatingSocialLogos() {
    const socialLogos = document.querySelectorAll('.floating-logo');
    
    socialLogos.forEach((logo, index) => {
        // Enhanced hover interactions
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.5) rotate(15deg)';
            logo.style.opacity = '0.9';
            logo.style.filter = 'drop-shadow(0 0 30px var(--primary-green))';
            logo.style.zIndex = '20';
            
            // Create ripple effect
            createSocialRipple(logo);
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = '';
            logo.style.opacity = '0.3';
            logo.style.filter = 'drop-shadow(0 0 15px var(--shadow-green))';
            logo.style.zIndex = '';
        });
        
        // Click interaction
        logo.addEventListener('click', () => {
            // Create burst effect
            createSocialBurst(logo);
            
            // Get platform name from icon class
            const iconClass = logo.querySelector('i').className;
            let platform = 'social media';
            
            if (iconClass.includes('instagram')) platform = 'Instagram';
            else if (iconClass.includes('tiktok')) platform = 'TikTok';
            else if (iconClass.includes('youtube')) platform = 'YouTube';
            else if (iconClass.includes('facebook')) platform = 'Facebook';
            else if (iconClass.includes('twitter')) platform = 'Twitter';
            else if (iconClass.includes('linkedin')) platform = 'LinkedIn';
            else if (iconClass.includes('spotify')) platform = 'Spotify';
            else if (iconClass.includes('discord')) platform = 'Discord';
            else if (iconClass.includes('telegram')) platform = 'Telegram';
            else if (iconClass.includes('twitch')) platform = 'Twitch';
            else if (iconClass.includes('snapchat')) platform = 'Snapchat';
            else if (iconClass.includes('google')) platform = 'Google';
            else if (iconClass.includes('gamepad')) platform = 'Kick';
            else if (iconClass.includes('globe')) platform = 'Website Traffic';
            else if (iconClass.includes('star')) platform = 'Reviews';
            
            // Show tooltip
            showSocialTooltip(logo, `Grow your ${platform} presence!`);
        });
        
        // Add magnetic effect near mouse
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            logo.style.transform += ` translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
    });
}

function createSocialRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: var(--primary-green);
        opacity: 0.3;
        transform: translate(-50%, -50%);
        animation: socialRipple 1s ease-out;
        pointer-events: none;
        z-index: -1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
}

function createSocialBurst(element) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50;
        
        particle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: var(--primary-green);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: burstParticle 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 100;
        `;
        
        particle.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
        
        element.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
    
    // Add burst animation CSS if not exists
    if (!document.getElementById('burst-styles')) {
        const style = document.createElement('style');
        style.id = 'burst-styles';
        style.textContent = `
            @keyframes socialRipple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
            @keyframes burstParticle {
                to {
                    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)));
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function showSocialTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--glass-bg);
        backdrop-filter: blur(10px);
        border: 1px solid var(--glass-border);
        color: var(--text-light);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.8rem;
        white-space: nowrap;
        opacity: 0;
        animation: tooltipShow 2s ease forwards;
        z-index: 1000;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    setTimeout(() => tooltip.remove(), 2000);
    
    // Add tooltip animation
    if (!document.getElementById('tooltip-styles')) {
        const style = document.createElement('style');
        style.id = 'tooltip-styles';
        style.textContent = `
            @keyframes tooltipShow {
                0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Text Animations
function initializeEnhancedTextAnimations() {
    // Typing effect for hero title
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.dataset.text;
        typingText.textContent = '';
        
        setTimeout(() => {
            let index = 0;
            const typeTimer = setInterval(() => {
                typingText.textContent += text[index];
                index++;
                
                if (index >= text.length) {
                    clearInterval(typeTimer);
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        typingText.style.setProperty('--cursor-opacity', '0');
                    }, 2000);
                }
            }, 100);
        }, 1000);
    }
    
    // Rocket launch effect on hover
    const rocketIcon = document.querySelector('.rocket-icon');
    if (rocketIcon) {
        rocketIcon.addEventListener('mouseenter', () => {
            rocketIcon.style.animation = 'rocketLaunch 1s ease-out';
            
            // Create trail effect
            createRocketTrail(rocketIcon);
        });
        
        rocketIcon.addEventListener('animationend', () => {
            rocketIcon.style.animation = 'rocketLaunch 4s ease-in-out infinite';
        });
    }
    
    // Interactive word effects
    const subtitleWords = document.querySelectorAll('.subtitle-word');
    subtitleWords.forEach((word, index) => {
        word.addEventListener('mouseenter', () => {
            // Create word glow effect
            word.style.color = 'var(--primary-green)';
            word.style.textShadow = '0 0 20px var(--shadow-green)';
            word.style.transform = 'translateY(-3px) scale(1.1)';
            
            // Ripple effect from the word
            createWordRipple(word);
        });
        
        word.addEventListener('mouseleave', () => {
            word.style.color = '';
            word.style.textShadow = '';
            word.style.transform = '';
        });
    });
}

function createRocketTrail(rocket) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const trail = document.createElement('div');
            trail.textContent = '✨';
            trail.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 1rem;
                color: var(--primary-green);
                opacity: 0.8;
                transform: translate(-50%, -50%);
                animation: rocketTrail 1s ease-out forwards;
                pointer-events: none;
                z-index: 10;
            `;
            
            rocket.parentElement.appendChild(trail);
            setTimeout(() => trail.remove(), 1000);
        }, i * 100);
    }
    
    // Add trail animation
    if (!document.getElementById('rocket-trail-styles')) {
        const style = document.createElement('style');
        style.id = 'rocket-trail-styles';
        style.textContent = `
            @keyframes rocketTrail {
                0% {
                    opacity: 0.8;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) translateY(50px) scale(0.3);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createWordRipple(word) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid var(--primary-green);
        border-radius: 50%;
        opacity: 0.6;
        transform: translate(-50%, -50%);
        animation: wordRipple 0.6s ease-out;
        pointer-events: none;
        z-index: -1;
    `;
    
    word.style.position = 'relative';
    word.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    // Add word ripple animation
    if (!document.getElementById('word-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'word-ripple-styles';
        style.textContent = `
            @keyframes wordRipple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Floating Emojis Enhancement
function initializeFloatingEmojis() {
    const emojis = document.querySelectorAll('.emoji');
    
    emojis.forEach((emoji, index) => {
        // Add random gentle movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            emoji.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            
            setTimeout(() => {
                emoji.style.transform = emoji.style.transform.replace(` translate(${randomX}px, ${randomY}px)`, '');
            }, 2000);
        }, Math.random() * 5000 + 5000);
        
        // Pulse effect on hover
        emoji.addEventListener('mouseenter', () => {
            emoji.style.transform += ' scale(1.5)';
            emoji.style.opacity = '0.8';
        });
        
        emoji.addEventListener('mouseleave', () => {
            emoji.style.transform = emoji.style.transform.replace(' scale(1.5)', '');
            emoji.style.opacity = '0.15';
        });
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    // Simple AOS implementation
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Global Functions
function scrollToSignUp() {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
        signupSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add attention effect
        setTimeout(() => {
            const form = signupSection.querySelector('.signup-form');
            if (form) {
                form.style.animation = 'pulse 1s ease-in-out 3';
            }
        }, 1000);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function playDemo() {
    // Create demo modal or redirect to demo video
    const demoModal = document.createElement('div');
    demoModal.className = 'demo-modal';
    demoModal.innerHTML = `
        <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎬 SMM-AI Demo</h3>
                <button onclick="this.closest('.demo-modal').remove()" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="demo-video-placeholder">
                    <div class="play-icon">▶️</div>
                    <p>Demo video coming soon!</p>
                    <p>See how SMM-AI can grow your social media in minutes.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(demoModal);
    
    // Add demo modal styles
    if (!document.getElementById('demo-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'demo-modal-styles';
        style.textContent = `
            .demo-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .demo-video-placeholder {
                text-align: center;
                padding: 3rem;
                background: var(--glass-bg);
                border-radius: 16px;
                border: 1px solid var(--glass-border);
            }
            .play-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                animation: pulse 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    }
}

function handleSignUp() {
    const form = document.querySelector('.signup-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    // Validate all fields
    inputs.forEach(input => {
        const fieldValid = validateField(input);
        if (!fieldValid) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Shake animation for invalid form
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
        return;
    }
    
    // Show loading state
    const button = form.querySelector('.signup-btn');
    const originalText = button.innerHTML;
    button.innerHTML = `
        <div class="spinner"></div>
        <span>Creating Account...</span>
    `;
    button.disabled = true;
    
    // Add spinner styles
    if (!document.getElementById('spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            .spinner {
                width: 20px;
                height: 20px;
                border: 2px solid var(--bg-dark);
                border-top: 2px solid transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Simulate API call
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        showSuccessModal();
    }, 2000);
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (field.required) {
        isValid = value.length > 0;
    }
    
    // Update field styling
    field.classList.remove('valid', 'invalid');
    if (value.length > 0) {
        field.classList.add(isValid ? 'valid' : 'invalid');
        
        if (isValid) {
            field.style.borderColor = 'var(--primary-green)';
            field.style.boxShadow = '0 0 0 2px rgba(0, 255, 136, 0.3)';
        } else {
            field.style.borderColor = '#ff4444';
            field.style.boxShadow = '0 0 0 2px rgba(255, 68, 68, 0.3)';
        }
    }
    
    return isValid;
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // Celebration effects
        createConfetti();
        
        // Auto redirect after 3 seconds
        setTimeout(() => {
            redirectToApp();
        }, 3000);
    }
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function createConfetti() {
    const colors = ['var(--primary-green)', 'var(--neon-green)', 'var(--electric-green)'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                z-index: 10002;
                border-radius: 50%;
                animation: confettiFall ${Math.random() * 2 + 3}s linear forwards;
                box-shadow: 0 0 10px currentColor;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
    
    // Add confetti animation
    if (!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function redirectToApp() {
    // Store user session
    localStorage.setItem('userAuthenticated', 'true');
    localStorage.setItem('userName', document.getElementById('fullname').value);
    localStorage.setItem('userEmail', document.getElementById('email').value);
    localStorage.setItem('userPlatform', document.getElementById('platform-interest').value);
    
    // Redirect to app
    window.location.href = 'app.html';
}

// Add global styles for enhanced effects
document.addEventListener('DOMContentLoaded', function() {
    const globalStyles = document.createElement('style');
    globalStyles.textContent = `
        .signup-form input.valid,
        .signup-form select.valid {
            border-color: var(--primary-green) !important;
            box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.3) !important;
        }
        
        .signup-form input.invalid,
        .signup-form select.invalid {
            border-color: #ff4444 !important;
            box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.3) !important;
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .aos-animate {
            animation: fadeInUp 1s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(globalStyles);
});

// Enhanced Performance Monitoring
(function() {
    // Track page load performance
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Add loaded class for enhanced animations
            document.body.classList.add('page-loaded');
            
            // Performance logging (remove in production)
            if (window.performance) {
                const loadTime = performance.now();
                console.log(`🚀 SMM-AI loaded in ${Math.round(loadTime)}ms`);
            }
        }, 100);
    });
    
    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Add smooth scroll polyfill here if needed
        console.log('Smooth scroll not supported, consider adding polyfill');
    }
})(); 