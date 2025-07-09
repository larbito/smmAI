// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    initializeParticles();
    initializeSidebar();
    initializeContentSections();
    initializeTabSwitching();
    initializeModalSystem();
    initializeAnimations();
    initializeContentCreator();
    initializeAnalytics();
    initializeCalendar();
    initializeMobileMenu();
});

// Initialize Dashboard
function initializeDashboard() {
    // Animate stats on load
    animateStats();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize drag and drop
    initializeDragDrop();
    
    // Auto-refresh data
    setInterval(refreshDashboardData, 30000); // Every 30 seconds
}

// Particle System
function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Sidebar Navigation
function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding content section
            const targetSection = this.getAttribute('href').substring(1);
            showContentSection(targetSection);
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
}

// Content Sections
function initializeContentSections() {
    const sections = document.querySelectorAll('.content-section');
    
    // Show overview section by default
    showContentSection('overview');
}

function showContentSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Animate section entrance
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetSection.style.transition = 'all 0.3s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Tab Switching
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// Modal System
function initializeModalSystem() {
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal:not(.hidden)');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Animations
function initializeAnimations() {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    });
    
    const animatedElements = document.querySelectorAll('.stat-card, .action-btn, .account-card');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add fade in up animation
    const style = document.createElement('style');
    style.textContent = `
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
    document.head.appendChild(style);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            
            // Format number based on original format
            const originalText = stat.textContent;
            if (originalText.includes('K')) {
                stat.textContent = (current / 1000).toFixed(1) + 'K';
            } else if (originalText.includes('%')) {
                stat.textContent = current.toFixed(1) + '%';
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Content Creator
function initializeContentCreator() {
    const generateBtn = document.querySelector('.generate-btn');
    const previewText = document.querySelector('.preview-text p');
    const previewActions = document.querySelector('.preview-actions');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            this.disabled = true;
            
            // Simulate AI content generation
            setTimeout(() => {
                const sampleContent = [
                    "🚀 Ready to transform your social media presence? Our AI-powered tools help you create engaging content that resonates with your audience and drives real results. #SMM #AI #SocialMedia #Growth",
                    "💡 Did you know that consistent posting can increase your engagement by 300%? Let our AI assistant help you maintain a perfect posting schedule across all platforms! #ContentStrategy #SocialMediaTips",
                    "✨ From zero to viral: Our AI analyzes trending topics and creates content that your audience will love. Start your journey to social media success today! #ViralContent #AIAssistant #SocialGrowth"
                ];
                
                const randomContent = sampleContent[Math.floor(Math.random() * sampleContent.length)];
                previewText.textContent = randomContent;
                
                // Show action buttons
                previewActions.style.display = 'flex';
                
                // Reset button
                this.innerHTML = '<i class="fas fa-magic"></i> Generate Content';
                this.disabled = false;
                
                // Show success message
                showNotification('Content generated successfully!', 'success');
            }, 2000);
        });
    }
    
    // Handle preview actions
    const editBtn = document.querySelector('.preview-actions .btn-secondary');
    const postBtn = document.querySelector('.preview-actions .btn-primary');
    const scheduleBtn = document.querySelector('.preview-actions .btn-secondary:last-child');
    
    if (postBtn) {
        postBtn.addEventListener('click', function() {
            showModal('successModal');
            showNotification('Post published successfully!', 'success');
        });
    }
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            showNotification('Post scheduled successfully!', 'success');
        });
    }
}

// Analytics
function initializeAnalytics() {
    // Simulate real-time data updates
    setInterval(updateAnalytics, 5000);
}

function updateAnalytics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const currentValue = parseFloat(stat.textContent.replace(/[^\d.]/g, ''));
        const change = (Math.random() - 0.5) * 0.1; // Small random change
        const newValue = currentValue + change;
        
        const originalText = stat.textContent;
        if (originalText.includes('K')) {
            stat.textContent = newValue.toFixed(1) + 'K';
        } else if (originalText.includes('%')) {
            stat.textContent = newValue.toFixed(1) + '%';
        } else {
            stat.textContent = Math.floor(newValue).toLocaleString();
        }
    });
}

// Calendar
function initializeCalendar() {
    const calendarDays = document.querySelectorAll('.calendar-day');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            // Remove active class from all days
            calendarDays.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked day
            this.classList.add('active');
            
            // Show day details (placeholder)
            console.log('Selected day:', this.querySelector('.day-number').textContent);
        });
    });
    
    // Add today highlight
    const today = new Date().getDate();
    calendarDays.forEach(day => {
        const dayNumber = parseInt(day.querySelector('.day-number').textContent);
        if (dayNumber === today) {
            day.style.background = 'rgba(0, 255, 136, 0.2)';
            day.style.borderColor = 'var(--primary-green)';
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-dark);
                color: var(--text-light);
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                border: 1px solid var(--glass-border);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// Drag and Drop
function initializeDragDrop() {
    const draggableElements = document.querySelectorAll('.post-item');
    
    draggableElements.forEach(element => {
        element.draggable = true;
        
        element.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.id || '');
            this.style.opacity = '0.5';
        });
        
        element.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });
}

// Refresh Dashboard Data
function refreshDashboardData() {
    // Simulate data refresh
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        // Add subtle animation to indicate refresh
        activityList.style.transform = 'scale(0.98)';
        setTimeout(() => {
            activityList.style.transform = 'scale(1)';
        }, 200);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        color: var(--text-light);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 2000;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'var(--primary-green)';
        notification.querySelector('i').style.color = 'var(--primary-green)';
    }
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--text-gray);
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
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
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Account Management
function connectAccount(platform) {
    showNotification(`Connecting to ${platform}...`, 'info');
    
    // Simulate connection process
    setTimeout(() => {
        showNotification(`Successfully connected to ${platform}!`, 'success');
        
        // Update UI to show connected state
        const accountCard = document.querySelector(`[data-platform="${platform}"]`);
        if (accountCard) {
            accountCard.classList.remove('disconnected');
            accountCard.classList.add('connected');
        }
    }, 2000);
}

function disconnectAccount(platform) {
    if (confirm(`Are you sure you want to disconnect from ${platform}?`)) {
        showNotification(`Disconnected from ${platform}`, 'info');
        
        // Update UI to show disconnected state
        const accountCard = document.querySelector(`[data-platform="${platform}"]`);
        if (accountCard) {
            accountCard.classList.remove('connected');
            accountCard.classList.add('disconnected');
        }
    }
}

// Quick Actions
function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            switch(action) {
                case 'Create Post':
                    showContentSection('content');
                    break;
                case 'AI Content':
                    showContentSection('content');
                    document.querySelector('.generate-btn').click();
                    break;
                case 'Schedule Post':
                    showContentSection('scheduler');
                    break;
                case 'View Analytics':
                    showContentSection('analytics');
                    break;
            }
        });
    });
}

// Initialize quick actions
document.addEventListener('DOMContentLoaded', function() {
    initializeQuickActions();
});

// Handle account connection buttons
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Connect') {
        const platform = e.target.closest('.account-card').querySelector('h3').textContent;
        connectAccount(platform);
    } else if (e.target.textContent === 'Disconnect') {
        const platform = e.target.closest('.account-card').querySelector('h3').textContent;
        disconnectAccount(platform);
    }
});

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', query);
        });
    }
}

// Export functions for global use
window.dashboardFunctions = {
    showModal,
    closeModal,
    showNotification,
    connectAccount,
    disconnectAccount,
    showContentSection
}; 