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
    initializeHowItWorksInteractions();
    initializeCounterAnimations();
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

// ================================
// How It Works Interactions
// ================================

function initializeHowItWorksInteractions() {
    const flowSteps = document.querySelectorAll('.flow-step');
    
    flowSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Remove active class from all steps
            flowSteps.forEach(s => s.classList.remove('active'));
            // Add active class to clicked step
            this.classList.add('active');
            
            // Update demo metrics based on step
            updateDemoMetrics(index + 1);
        });
        
        // Auto-advance steps
        setTimeout(() => {
            flowSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            updateDemoMetrics(index + 1);
        }, (index + 1) * 3000);
    });
}

function updateDemoMetrics(step) {
    const followersEl = document.getElementById('followersCount');
    const engagementEl = document.getElementById('engagementRate');
    const reachEl = document.getElementById('reachCount');
    
    if (!followersEl || !engagementEl || !reachEl) return;
    
    const metrics = {
        1: { followers: '1,247', engagement: '8.4%', reach: '47.2K' },
        2: { followers: '3,891', engagement: '12.7%', reach: '156.8K' },
        3: { followers: '12,456', engagement: '18.3%', reach: '487.2K' },
        4: { followers: '45,789', engagement: '24.9%', reach: '1.2M' }
    };
    
    const stepMetrics = metrics[step] || metrics[1];
    
    // Animate the changes
    animateText(followersEl, stepMetrics.followers);
    animateText(engagementEl, stepMetrics.engagement);
    animateText(reachEl, stepMetrics.reach);
}

function animateText(element, newText) {
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0.5';
    
    setTimeout(() => {
        element.textContent = newText;
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 150);
}

// ================================
// Counter Animations
// ================================

function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ================================
// Testimonials Interactive Features
// ================================

function initializeTestimonialsSection() {
    initializeTestimonialsCarousel();
    initializeTestimonialsFilters();
    initializeLiveSuccessCounter();
    initializeSuccessWallAnimations();
}

function initializeTestimonialsCarousel() {
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!testimonialTrack || !prevBtn || !nextBtn || !dotsContainer) {
        console.warn('Testimonials carousel elements not found');
        return;
    }
    
    const slides = testimonialTrack.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    let autoplayInterval;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    function updateSlide() {
        const slideWidth = 100;
        testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
        
        // Add slide entrance animation
        slides[currentSlide].style.animation = 'slideInUp 0.6s ease-out';
        setTimeout(() => {
            slides[currentSlide].style.animation = '';
        }, 600);
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        resetAutoplay();
    }
    
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        } else {
            currentSlide = 0;
            updateSlide();
        }
        resetAutoplay();
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
        resetAutoplay();
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, 7000); // Change slide every 7 seconds
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide(); // Swipe left
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide(); // Swipe right
        }
    });
    
    // Initialize
    updateSlide();
    startAutoplay();
    
    // Pause autoplay on hover
    testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    testimonialTrack.addEventListener('mouseleave', startAutoplay);
}

function initializeTestimonialsFilters() {
    const filters = document.querySelectorAll('.testimonial-filter');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (!filters.length || !slides.length) {
        console.warn('Testimonials filter elements not found');
        return;
    }
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter slides with animation
            slides.forEach((slide, index) => {
                const slideCategory = slide.getAttribute('data-category');
                const shouldShow = category === 'all' || slideCategory === category;
                
                if (shouldShow) {
                    slide.style.display = 'block';
                    slide.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    slide.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        slide.style.display = 'none';
                    }, 300);
                }
            });
            
            // Track interaction
            trackInteraction('testimonials_filter', category);
        });
    });
}

function initializeLiveSuccessCounter() {
    const milestones = document.getElementById('liveMilestones');
    const revenue = document.getElementById('liveRevenue');
    const growth = document.getElementById('liveGrowth');
    
    if (!milestones || !revenue || !growth) {
        console.warn('Live success counter elements not found');
        return;
    }
    
    // Base values
    const baseValues = {
        milestones: 847,
        revenue: 2.8,
        growth: 125
    };
    
    function updateLiveCounters() {
        // Add small random increments to simulate real-time updates
        const milestonesIncrement = Math.floor(Math.random() * 3) + 1;
        const revenueIncrement = (Math.random() * 0.1).toFixed(1);
        const growthIncrement = Math.floor(Math.random() * 5) + 2;
        
        // Update milestones
        const currentMilestones = parseInt(milestones.textContent) || baseValues.milestones;
        const newMilestones = currentMilestones + milestonesIncrement;
        animateCounterChange(milestones, newMilestones);
        
        // Update revenue
        const currentRevenue = parseFloat(revenue.textContent.replace('$', '').replace('M', '')) || baseValues.revenue;
        const newRevenue = (currentRevenue + parseFloat(revenueIncrement)).toFixed(1);
        animateCounterChange(revenue, `$${newRevenue}M`);
        
        // Update growth
        const currentGrowth = parseInt(growth.textContent.replace('M', '')) || baseValues.growth;
        const newGrowth = currentGrowth + growthIncrement;
        animateCounterChange(growth, `${newGrowth}M`);
    }
    
    function animateCounterChange(element, newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#10b981'; // Green flash
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 200);
    }
    
    // Start live updates
    setInterval(updateLiveCounters, 8000); // Update every 8 seconds
    
    // Initial animation after page load
    setTimeout(() => {
        updateLiveCounters();
    }, 2000);
}

function initializeSuccessWallAnimations() {
    const successCards = document.querySelectorAll('.success-card');
    
    if (!successCards.length) {
        console.warn('Success wall cards not found');
        return;
    }
    
    // Intersection Observer for staggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out';
                    entry.target.style.opacity = '1';
                }, index * 100); // Stagger by 100ms
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    successCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Add hover sound effect simulation
    successCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px) scale(1)';
        });
    });
}

// Add required CSS animations dynamically if not present
function addTestimonialsAnimations() {
    if (document.getElementById('testimonials-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'testimonials-animations';
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        .testimonial-slide {
            animation-fill-mode: both;
        }
    `;
    document.head.appendChild(style);
}

// Initialize testimonials when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addTestimonialsAnimations();
    initializeTestimonialsSection();
});

// Export functions for potential external use
window.SmmAi = {
    toggleMobileMenu,
    trackInteraction,
    updateDemoMetrics,
    initializeTestimonialsSection
}; 