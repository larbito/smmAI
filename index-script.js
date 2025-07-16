// ================================
// SMM AI - Modern JavaScript
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SMM AI - Modern Design Loaded');
    
    // Initialize all components
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeInteractiveElements();
    initializeHeroAnimations();
});



// ================================
// Mobile Menu System
// ================================

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    let isMenuOpen = false;
    
    // Toggle menu
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        toggleMobileMenu(isMenuOpen);
    });
    
    // Close menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                isMenuOpen = false;
                toggleMobileMenu(false);
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            isMenuOpen = false;
            toggleMobileMenu(false);
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            isMenuOpen = false;
            toggleMobileMenu(false);
        }
    });
}

function toggleMobileMenu(isOpen) {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const spans = mobileMenuBtn.querySelectorAll('span');
    
    if (isOpen) {
        mobileMenu.style.display = 'block';
        mobileMenuBtn.classList.add('active');
        
        // Animate hamburger to X
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        
        // Animate menu appearance
        setTimeout(() => {
            mobileMenu.style.opacity = '1';
            mobileMenu.style.transform = 'translateY(0)';
        }, 10);
        
    } else {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        mobileMenuBtn.classList.remove('active');
        
        // Reset hamburger
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        
        // Hide menu after animation
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
    }
}

// ================================
// Smooth Scrolling
// ================================

function initializeSmoothScrolling() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && mobileMenu.style.display === 'block') {
                    toggleMobileMenu(false);
                }
                
                console.log(`📍 Scrolled to: ${targetId}`);
            }
        });
    });
}

// ================================
// Scroll Animations
// ================================

function initializeScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll(`
        .feature-card,
        .platform-card,
        .testimonial-card,
        .step,
        .section-header
    `);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.8)';
                header.style.boxShadow = 'none';
            }
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// ================================
// Interactive Elements
// ================================

function initializeInteractiveElements() {
    // Platform cards interaction
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
        });
    });
    
    // Feature cards interaction
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-1px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading state to buttons on click
    const actionButtons = document.querySelectorAll('a[href^="register"], a[href^="login"]');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                
                // Remove loading state after delay (simulated)
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
}

// ================================
// Hero Animations
// ================================

function initializeHeroAnimations() {
    // Animate chart bars
    const chartBars = document.querySelectorAll('.bar');
    if (chartBars.length > 0) {
        // Trigger animation after a delay
        setTimeout(() => {
            chartBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, index * 150);
            });
        }, 1000);
    }
    
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Add random gentle movement
        setInterval(() => {
            if (Math.random() > 0.7) {
                card.style.transform = `translateY(-${Math.random() * 5 + 5}px)`;
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                }, 1000);
            }
        }, 3000 + Math.random() * 2000);
    });
    
    // Gradient orbs movement
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach(orb => {
        orb.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        orb.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ================================
// Utility Functions
// ================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ================================
// Performance Optimizations
// ================================

// Optimize scroll events
const optimizedScroll = debounce(function() {
    // Any heavy scroll operations can go here
}, 100);

window.addEventListener('scroll', optimizedScroll, { passive: true });

// Preload critical assets
function preloadAssets() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b60a0b9a?w=64&h=64&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&crop=face'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
setTimeout(preloadAssets, 1000);

// ================================
// Error Handling
// ================================

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ================================
// Analytics & Tracking (Optional)
// ================================

function trackInteraction(action, element) {
    // Placeholder for analytics tracking
    console.log(`📊 Tracked: ${action} on ${element}`);
    
    // Example: Google Analytics, Mixpanel, etc.
    // gtag('event', action, { 'element': element });
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .nav-link, .platform-card')) {
        const elementType = e.target.className.split(' ')[0];
        trackInteraction('click', elementType);
    }
});

// ================================
// Accessibility Enhancements
// ================================

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Skip links functionality
    if (e.key === 'Tab' && e.target.tagName === 'BODY') {
        const firstFocusable = document.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
});



// ================================
// Final Initialization
// ================================

console.log('✅ SMM AI Modern JavaScript Loaded Successfully');

// Export functions for potential external use
window.SmmAi = {
    toggleMobileMenu,
    trackInteraction
}; 