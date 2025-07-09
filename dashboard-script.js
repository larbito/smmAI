// SMM AI Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Initialize particles
    initializeParticles();
    
    // Initialize step workflow
    initializeStepWorkflow();
    
    // Initialize mobile menu
    initializeMobileMenu();
});

// Global variables
let selectedPlatform = null;
let userGoal = '';
let aiPlan = '';
let username = '';
let currentStep = 1;

// Initialize dashboard
function initializeDashboard() {
    // Update username display
    const usernameElement = document.querySelector('.username');
    if (usernameElement) {
        usernameElement.textContent = 'John Doe'; // This would come from user session
    }
    
    // Set up logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Initialize particles animation
function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize step workflow
function initializeStepWorkflow() {
    // Step 1: Platform Selection
    initializePlatformSelection();
    
    // Step 2: Goal Input
    initializeGoalInput();
    
    // Step 3: Plan Display
    initializePlanDisplay();
    
    // Step 4: Username Input
    initializeUsernameInput();
    
    // Step 5: Launch Campaign
    initializeLaunchCampaign();
}

// Platform Selection (Step 1)
function initializePlatformSelection() {
    const platformCards = document.querySelectorAll('.platform-card');
    
    platformCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            platformCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Get platform info
            selectedPlatform = this.dataset.platform;
            
            // Update platform badge in step 2
            updatePlatformBadge(selectedPlatform);
            
            // Auto-scroll to next step after a delay
            setTimeout(() => {
                showStep(2);
                document.getElementById('step-2').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 800);
        });
    });
}

// Goal Input (Step 2)
function initializeGoalInput() {
    const generateBtn = document.getElementById('generate-plan');
    const goalTextarea = document.getElementById('goal-input');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const goal = goalTextarea.value.trim();
            
            if (!goal) {
                showNotification('Please enter your goal and budget.', 'error');
                return;
            }
            
            if (!selectedPlatform) {
                showNotification('Please select a platform first.', 'error');
                return;
            }
            
            userGoal = goal;
            generateAIPlan();
        });
    }
}

// Generate AI Plan
function generateAIPlan() {
    showStep(3);
    
    // Show loading state
    const planLoading = document.querySelector('.plan-loading');
    const planContent = document.querySelector('.plan-content');
    
    planLoading.classList.remove('hidden');
    planContent.classList.add('hidden');
    
    // Simulate AI processing
    setTimeout(() => {
        // Generate mock AI response
        const mockPlan = generateMockAIPlan(selectedPlatform, userGoal);
        
        // Display the plan
        displayAIPlan(mockPlan);
        
        // Hide loading, show content
        planLoading.classList.add('hidden');
        planContent.classList.remove('hidden');
        
        // Scroll to the plan
        document.getElementById('step-3').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }, 3000);
}

// Mock AI Plan Generator
function generateMockAIPlan(platform, goal) {
    const plans = {
        instagram: `
            <h3>📸 Instagram Growth Strategy</h3>
            <p><strong>Objective:</strong> ${goal}</p>
            
            <h4>📊 Strategy Breakdown:</h4>
            <ul>
                <li><strong>Content Creation:</strong> 3-5 high-quality posts per week</li>
                <li><strong>Hashtag Strategy:</strong> Mix of trending and niche hashtags</li>
                <li><strong>Engagement:</strong> Story interactions and comment engagement</li>
                <li><strong>Collaborations:</strong> Partner with micro-influencers</li>
                <li><strong>Analytics:</strong> Weekly performance tracking</li>
            </ul>
            
            <h4>⏰ Timeline:</h4>
            <p>Expected results within 2-4 weeks with consistent execution.</p>
            
            <h4>💰 Budget Allocation:</h4>
            <p>70% content creation, 20% paid promotion, 10% tools/analytics</p>
        `,
        tiktok: `
            <h3>🎵 TikTok Viral Strategy</h3>
            <p><strong>Objective:</strong> ${goal}</p>
            
            <h4>🚀 Strategy Breakdown:</h4>
            <ul>
                <li><strong>Content Style:</strong> Trending sounds and hashtags</li>
                <li><strong>Posting Schedule:</strong> 1-2 videos daily during peak hours</li>
                <li><strong>Engagement:</strong> Quick responses to comments</li>
                <li><strong>Trends:</strong> Daily trend monitoring and adaptation</li>
                <li><strong>Duets/Stitches:</strong> Engage with popular creators</li>
            </ul>
            
            <h4>⏰ Timeline:</h4>
            <p>Potential viral breakthrough within 1-3 weeks.</p>
            
            <h4>💰 Budget Allocation:</h4>
            <p>60% content creation, 30% trend tools, 10% promotion</p>
        `,
        youtube: `
            <h3>🎬 YouTube Growth Strategy</h3>
            <p><strong>Objective:</strong> ${goal}</p>
            
            <h4>📹 Strategy Breakdown:</h4>
            <ul>
                <li><strong>Content Planning:</strong> Weekly upload schedule</li>
                <li><strong>SEO Optimization:</strong> Keyword research and optimization</li>
                <li><strong>Thumbnails:</strong> Eye-catching custom thumbnails</li>
                <li><strong>Community:</strong> Engage with comments and community tab</li>
                <li><strong>Collaborations:</strong> Guest appearances and partnerships</li>
            </ul>
            
            <h4>⏰ Timeline:</h4>
            <p>Steady growth expected over 4-8 weeks.</p>
            
            <h4>💰 Budget Allocation:</h4>
            <p>50% video production, 30% promotion, 20% tools</p>
        `,
        twitter: `
            <h3>🐦 Twitter Growth Strategy</h3>
            <p><strong>Objective:</strong> ${goal}</p>
            
            <h4>📱 Strategy Breakdown:</h4>
            <ul>
                <li><strong>Content Mix:</strong> 60% original tweets, 40% engagement</li>
                <li><strong>Timing:</strong> Tweet during peak engagement hours</li>
                <li><strong>Hashtags:</strong> 1-2 relevant hashtags per tweet</li>
                <li><strong>Threads:</strong> Create engaging thread content</li>
                <li><strong>Spaces:</strong> Participate in relevant Twitter Spaces</li>
            </ul>
            
            <h4>⏰ Timeline:</h4>
            <p>Organic growth within 3-6 weeks.</p>
            
            <h4>💰 Budget Allocation:</h4>
            <p>40% content creation, 40% promotion, 20% analytics</p>
        `,
        linkedin: `
            <h3>💼 LinkedIn Professional Growth</h3>
            <p><strong>Objective:</strong> ${goal}</p>
            
            <h4>🎯 Strategy Breakdown:</h4>
            <ul>
                <li><strong>Content Strategy:</strong> Industry insights and thought leadership</li>
                <li><strong>Posting Schedule:</strong> 3-4 posts per week</li>
                <li><strong>Networking:</strong> Connect with industry professionals</li>
                <li><strong>Articles:</strong> Weekly long-form content</li>
                <li><strong>Engagement:</strong> Comment on industry leaders' posts</li>
            </ul>
            
            <h4>⏰ Timeline:</h4>
            <p>Professional network growth over 6-12 weeks.</p>
            
            <h4>💰 Budget Allocation:</h4>
            <p>60% content creation, 25% networking events, 15% premium tools</p>
        `,
        facebook: `
            <h3>👥 Facebook Growth Strategy</h3>
            <p><strong>Objective:</strong> ${goal}</p>
            
            <h4>📘 Strategy Breakdown:</h4>
            <ul>
                <li><strong>Page Optimization:</strong> Complete profile with compelling bio</li>
                <li><strong>Content Mix:</strong> Videos, images, and engaging posts</li>
                <li><strong>Community:</strong> Create and manage Facebook groups</li>
                <li><strong>Events:</strong> Host virtual events and live sessions</li>
                <li><strong>Advertising:</strong> Targeted Facebook ad campaigns</li>
            </ul>
            
            <h4>⏰ Timeline:</h4>
            <p>Community growth over 4-8 weeks.</p>
            
            <h4>💰 Budget Allocation:</h4>
            <p>50% content creation, 35% advertising, 15% tools</p>
        `
    };
    
    return plans[platform] || plans.instagram;
}

// Display AI Plan
function displayAIPlan(plan) {
    const planText = document.querySelector('.plan-text');
    if (planText) {
        planText.innerHTML = plan;
        aiPlan = plan;
    }
}

// Plan Display (Step 3)
function initializePlanDisplay() {
    const regenerateBtn = document.querySelector('.regenerate-btn');
    const acceptBtn = document.querySelector('.accept-plan-btn');
    
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', function() {
            generateAIPlan();
        });
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            showStep(4);
            updateUsernameStep();
            document.getElementById('step-4').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        });
    }
}

// Username Input (Step 4)
function initializeUsernameInput() {
    const continueBtn = document.getElementById('continue-username');
    const usernameInput = document.getElementById('username-input');
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            const inputUsername = usernameInput.value.trim();
            
            if (!inputUsername) {
                showNotification('Please enter your username.', 'error');
                return;
            }
            
            username = inputUsername;
            showStep(5);
            updateLaunchSummary();
            document.getElementById('step-5').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        });
    }
}

// Launch Campaign (Step 5)
function initializeLaunchCampaign() {
    const launchBtn = document.getElementById('launch-campaign');
    
    if (launchBtn) {
        launchBtn.addEventListener('click', function() {
            launchCampaign();
        });
    }
}

// Launch Campaign
function launchCampaign() {
    // Show loading state
    const launchBtn = document.getElementById('launch-campaign');
    const originalText = launchBtn.innerHTML;
    
    launchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Launching...';
    launchBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        launchBtn.innerHTML = originalText;
        launchBtn.disabled = false;
        
        // Show success
        showStep(6);
        document.getElementById('step-6').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add to history
        addToHistory();
        
        // Show notification
        showNotification('Campaign launched successfully!', 'success');
    }, 2000);
}

// Helper Functions
function showStep(stepNumber) {
    currentStep = stepNumber;
    
    // Hide all steps
    const steps = document.querySelectorAll('.step-section');
    steps.forEach(step => {
        step.classList.add('hidden');
    });
    
    // Show current step
    const currentStepElement = document.getElementById(`step-${stepNumber}`);
    if (currentStepElement) {
        currentStepElement.classList.remove('hidden');
    }
}

function updatePlatformBadge(platform) {
    const badge = document.querySelector('.platform-badge');
    const platformNames = {
        instagram: 'Instagram',
        tiktok: 'TikTok',
        youtube: 'YouTube',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        facebook: 'Facebook'
    };
    
    const platformIcons = {
        instagram: 'fab fa-instagram',
        tiktok: 'fab fa-tiktok',
        youtube: 'fab fa-youtube',
        twitter: 'fab fa-twitter',
        linkedin: 'fab fa-linkedin',
        facebook: 'fab fa-facebook'
    };
    
    if (badge) {
        badge.innerHTML = `<i class="${platformIcons[platform]}"></i> ${platformNames[platform]}`;
        badge.className = `platform-badge ${platform}`;
    }
}

function updateUsernameStep() {
    const platformBadge = document.querySelector('#step-4 .platform-badge');
    const platformName = document.querySelector('#step-4 .platform-name');
    const usernameInput = document.getElementById('username-input');
    
    const platformNames = {
        instagram: 'Instagram',
        tiktok: 'TikTok',
        youtube: 'YouTube',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        facebook: 'Facebook'
    };
    
    if (platformBadge) {
        platformBadge.innerHTML = `<i class="fab fa-${selectedPlatform}"></i> ${platformNames[selectedPlatform]}`;
        platformBadge.className = `platform-badge ${selectedPlatform}`;
    }
    
    if (platformName) {
        platformName.textContent = platformNames[selectedPlatform];
    }
    
    if (usernameInput) {
        usernameInput.placeholder = `my${selectedPlatform}account`;
    }
}

function updateLaunchSummary() {
    const platformName = document.querySelector('#step-5 .platform-name');
    const usernameDisplay = document.querySelector('#step-5 .username-display');
    const goalDisplay = document.querySelector('#step-5 .goal-display');
    
    const platformNames = {
        instagram: 'Instagram',
        tiktok: 'TikTok',
        youtube: 'YouTube',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        facebook: 'Facebook'
    };
    
    if (platformName) {
        platformName.textContent = platformNames[selectedPlatform];
    }
    
    if (usernameDisplay) {
        usernameDisplay.textContent = `@${username}`;
    }
    
    if (goalDisplay) {
        goalDisplay.textContent = userGoal.length > 100 ? 
            userGoal.substring(0, 100) + '...' : userGoal;
    }
}

function addToHistory() {
    // This would typically save to a database
    // For now, we'll just update the history section
    const historyTable = document.querySelector('.history-table');
    if (historyTable) {
        const newRow = document.createElement('div');
        newRow.className = 'table-row';
        newRow.innerHTML = `
            <div class="table-cell">
                <span class="platform-badge ${selectedPlatform}">
                    <i class="fab fa-${selectedPlatform}"></i>
                    ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                </span>
            </div>
            <div class="table-cell">${new Date().toLocaleDateString()}</div>
            <div class="table-cell">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <span class="progress-text">0%</span>
            </div>
            <div class="table-cell">
                <span class="status-badge active">Active</span>
            </div>
        `;
        
        historyTable.appendChild(newRow);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : type === 'error' ? 'rgba(255, 68, 68, 0.9)' : 'rgba(0, 123, 255, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobile Menu
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Logout handler
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        selectedPlatform = null;
        userGoal = '';
        aiPlan = '';
        username = '';
        currentStep = 1;
        
        // Redirect to login or home
        window.location.href = 'index.html';
    }
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(notificationStyles); 