// Application State
const appState = {
    selectedPlatform: null,
    userPrompt: '',
    generatedPlan: '',
    username: ''
};

// Sample AI responses for different platforms
const aiResponses = {
    'Instagram': `🎯 **Custom Instagram Growth Strategy**

**Phase 1: Content Optimization (Weeks 1-2)**
- Post 1-2 high-quality photos/reels daily during peak hours (7-9 PM)
- Use trending hashtags: #instagram #viral #content + 27 niche-specific tags
- Focus on aesthetic consistency with a cohesive color palette

**Phase 2: Engagement Boost (Weeks 3-4)**
- Budget allocation: $200 for Instagram ads targeting similar accounts
- $150 for micro-influencer collaborations (5-10K followers)
- Engage with 50+ accounts daily in your niche

**Phase 3: Growth Acceleration (Weeks 5-8)**
- Run story ads and reels promotion campaigns
- Partner with 2-3 larger accounts for shoutouts
- Implement user-generated content campaigns

**Expected Results:** 25-35K new followers within 6-8 weeks
**Investment breakdown:** $300 ads + $200 influencer costs`,

    'TikTok': `🚀 **TikTok Viral Strategy for 35K Followers**

**Phase 1: Content Creation Mastery (Week 1-2)**
- Post 2-3 videos daily at peak times (6-9 PM, 9-12 AM)
- Focus on trending sounds and challenges
- Create hook-heavy content (first 3 seconds crucial)

**Phase 2: Algorithm Optimization (Week 3-4)**
- Budget: $250 for TikTok Promote feature on best-performing videos
- Collaborate with creators in your niche (3-5 partnerships)
- Use trending hashtags + create branded hashtag challenge

**Phase 3: Viral Acceleration (Week 5-6)**
- Invest $150 in TikTok ads for broader reach
- Launch duet/stitch campaigns with followers
- Partner with micro-influencers for authentic content

**Expected Timeline:** 35K followers in 6-8 weeks
**Total Investment:** $500 (perfectly within your budget!)`,

    'YouTube': `📹 **YouTube Channel Growth Blueprint**

**Phase 1: Channel Optimization (Week 1)**
- Professional channel art and compelling channel trailer
- SEO-optimized channel description with keywords
- Create 3-5 evergreen videos as foundation content

**Phase 2: Content Strategy (Week 2-6)**
- Upload 2-3 videos weekly on consistent schedule
- Budget: $200 for YouTube ads (skippable video ads)
- Focus on searchable content with trending keywords

**Phase 3: Community Building (Week 7-12)**
- Invest $200 in collaborations with similar channels
- Run community posts and live streams weekly
- Create playlists and optimize for suggested videos

**Expected Growth:** 10-15K subscribers, significant watch time increase
**ROI Focus:** Long-term sustainable growth over quick gains`,

    'Facebook': `📘 **Facebook Growth & Engagement Strategy**

**Phase 1: Page Optimization (Week 1)**
- Complete business page setup with all info
- Create engaging cover video and profile optimization
- Set up Facebook Shop if applicable

**Phase 2: Content & Advertising (Week 2-6)**
- Post daily: mix of images, videos, and live content
- Budget: $300 for targeted Facebook ads (lookalike audiences)
- Join and engage in 10-15 relevant Facebook groups

**Phase 3: Community Expansion (Week 7-8)**
- Run Facebook events and contests ($100 prize budget)
- Partner with local businesses or complementary pages
- Utilize Facebook Stories and Reels features

**Expected Results:** 15-25K page likes, improved engagement rates
**Focus:** Building genuine community over vanity metrics`,

    'LinkedIn': `👔 **LinkedIn Growth Strategy**

**Phase 1: Profile Optimization (Week 1)**
- Complete LinkedIn profile with all sections (Experience, Education, Skills, etc.)
- Add relevant keywords and connections
- Create a compelling headline

**Phase 2: Content Creation (Week 2-6)**
- Post 1-2 articles or blog posts weekly
- Share industry news and insights
- Engage with relevant groups and discussions

**Phase 3: Networking (Week 7-12)**
- Connect with 10-15 professionals in your field
- Join and participate in relevant LinkedIn groups
- Utilize LinkedIn's advanced targeting options

**Expected Growth:** 10-15K connections, improved profile visibility
**Focus:** Building a strong professional network`,

    'Twitter': `�� **Twitter Growth & Engagement Strategy**

**Phase 1: Profile Optimization (Week 1)**
- Complete Twitter profile with bio, profile picture, and cover photo
- Add relevant hashtags and keywords
- Create a compelling description

**Phase 2: Content Creation (Week 2-6)**
- Post 1-2 tweets daily, including relevant hashtags
- Engage with other users and reply to mentions
- Share industry news and trends

**Phase 3: Community Building (Week 7-12)**
- Follow 10-15 relevant accounts
- Engage with 5-10 accounts daily in your niche
- Utilize Twitter's advanced targeting options

**Expected Growth:** 10-15K followers, improved engagement rates
**Focus:** Building a strong Twitter presence`,

    'default': `🎯 **Custom Multi-Platform Growth Strategy**

**Phase 1: Foundation Building (Week 1-2)**
- Optimize profiles across all selected platforms
- Develop consistent brand voice and visual identity
- Create content calendar for regular posting

**Phase 2: Targeted Growth (Week 3-6)**
- Allocate 60% budget to your top 2 performing platforms
- Run cross-platform campaigns for maximum reach
- Engage with audiences through comments, DMs, and stories

**Phase 3: Scale & Optimize (Week 7-8)**
- Analyze performance data and double down on what works
- Expand successful campaigns to other platforms
- Build partnerships and collaborations

**Expected Results:** Significant growth across chosen platforms
**Budget Distribution:** Strategic allocation based on performance metrics`
};

// DOM Elements
const platformBoxes = document.querySelectorAll('.platform-box');
const promptSection = document.getElementById('prompt-section');
const planSection = document.getElementById('plan-section');
const accountSection = document.getElementById('account-section');
const successSection = document.getElementById('success-section');

const promptTextarea = document.getElementById('prompt-textarea');
const generatePlanBtn = document.getElementById('generate-plan-btn');
const loadingAnimation = document.getElementById('loading-animation');
const planResponse = document.getElementById('plan-response');
const planText = document.getElementById('plan-text');
const acceptPlanBtn = document.getElementById('accept-plan-btn');
const regeneratePlanBtn = document.getElementById('regenerate-plan-btn');
const usernameInput = document.getElementById('username-input');
const startCampaignBtn = document.getElementById('start-campaign-btn');
const startNewBtn = document.getElementById('start-new-btn');

// Utility Functions
function showSection(section) {
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideSection(section) {
    section.classList.add('hidden');
}

function updatePromptPlaceholder(platform) {
    const placeholders = {
        'Instagram': `I have an Instagram account and I want approximately 35K followers.\nI have a $500 budget.\nWhat is the best strategy to achieve this?`,
        'TikTok': `I have a TikTok account and I want approximately 35K followers.\nI have a $500 budget.\nWhat is the best strategy to achieve this?`,
        'YouTube': `I have a YouTube channel and I want 15K subscribers.\nI have a $500 budget.\nWhat is the best strategy to achieve this?`,
        'Facebook': `I have a Facebook page and I want 25K likes.\nI have a $500 budget.\nWhat is the best strategy to achieve this?`,
        'LinkedIn': `I have a LinkedIn profile and I want to grow my professional network.\nI have a $500 budget.\nWhat is the best strategy to achieve this?`,
        'Twitter': `I have a Twitter account and I want 20K followers.\nI have a $500 budget.\nWhat is the best strategy to achieve this?`,
        'default': `I want to grow my ${platform} presence significantly.\nI have a $500 budget.\nWhat is the best strategy to achieve this?`
    };
    
    const placeholder = placeholders[platform] || placeholders['default'];
    promptTextarea.placeholder = placeholder;
}

function typeWriter(text, element, speed = 30) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            // Handle markdown-style formatting
            if (text.substr(i, 2) === '**') {
                element.innerHTML += '<strong>';
                i += 2;
                // Find closing **
                while (i < text.length && text.substr(i, 2) !== '**') {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                element.innerHTML += '</strong>';
                i += 2;
            } else if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
                i++;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    type();
}

// Event Listeners

// Platform Selection
platformBoxes.forEach(box => {
    box.addEventListener('click', () => {
        // Remove selection from all boxes
        platformBoxes.forEach(b => b.classList.remove('selected'));
        
        // Add selection to clicked box
        box.classList.add('selected');
        
        // Update app state
        appState.selectedPlatform = box.dataset.platform;
        
        // Update prompt placeholder
        updatePromptPlaceholder(appState.selectedPlatform);
        
        // Show prompt section with delay for smooth transition
        setTimeout(() => {
            showSection(promptSection);
        }, 300);
    });
});

// Generate Plan Button
generatePlanBtn.addEventListener('click', () => {
    const prompt = promptTextarea.value.trim();
    
    if (!prompt) {
        alert('Please describe your goals and budget first! 📝');
        promptTextarea.focus();
        return;
    }
    
    if (!appState.selectedPlatform) {
        alert('Please select a platform first! 📱');
        return;
    }
    
    // Update app state
    appState.userPrompt = prompt;
    
    // Show plan section and loading
    showSection(planSection);
    loadingAnimation.classList.remove('hidden');
    planResponse.classList.add('hidden');
    
    // Simulate AI processing time
    setTimeout(() => {
        loadingAnimation.classList.add('hidden');
        planResponse.classList.remove('hidden');
        
        // Generate and display plan
        const response = aiResponses[appState.selectedPlatform] || aiResponses['default'];
        appState.generatedPlan = response;
        
        // Type out the response with animation
        typeWriter(response, planText, 20);
        
    }, 3000); // 3 second loading time
});

// Accept Plan Button
acceptPlanBtn.addEventListener('click', () => {
    showSection(accountSection);
});

// Regenerate Plan Button
regeneratePlanBtn.addEventListener('click', () => {
    loadingAnimation.classList.remove('hidden');
    planResponse.classList.add('hidden');
    
    // Simulate regeneration with slight variation
    setTimeout(() => {
        loadingAnimation.classList.add('hidden');
        planResponse.classList.remove('hidden');
        
        // Add variation to the response
        let response = aiResponses[appState.selectedPlatform] || aiResponses['default'];
        response = "🔄 **UPDATED STRATEGY** 🔄\n\n" + response.replace('Phase 1:', '**Enhanced Phase 1:**');
        
        appState.generatedPlan = response;
        typeWriter(response, planText, 15);
        
    }, 2500);
});

// Start Campaign Button
startCampaignBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert('Please enter your username! 👤');
        usernameInput.focus();
        return;
    }
    
    if (!username.startsWith('@')) {
        usernameInput.value = '@' + username;
    }
    
    appState.username = usernameInput.value;
    
    // Show success section
    showSection(successSection);
    
    // Add confetti effect (simple version)
    createConfetti();
});

// Start New Campaign Button
startNewBtn.addEventListener('click', () => {
    // Reset app state
    appState.selectedPlatform = null;
    appState.userPrompt = '';
    appState.generatedPlan = '';
    appState.username = '';
    
    // Clear form inputs
    promptTextarea.value = '';
    usernameInput.value = '';
    
    // Remove all platform selections
    platformBoxes.forEach(box => box.classList.remove('selected'));
    
    // Hide all sections except platform selection
    hideSection(promptSection);
    hideSection(planSection);
    hideSection(accountSection);
    hideSection(successSection);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Confetti Effect
function createConfetti() {
    const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiContainer.appendChild(confetti);
    }
    
    // Clean up after animation
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation enhancements
promptTextarea.addEventListener('input', (e) => {
    const charCount = e.target.value.length;
    const button = generatePlanBtn;
    
    if (charCount > 20) {
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
    } else {
        button.style.opacity = '0.7';
        button.style.transform = 'scale(0.98)';
    }
});

usernameInput.addEventListener('input', (e) => {
    let value = e.target.value;
    
    // Auto-add @ symbol
    if (value && !value.startsWith('@')) {
        e.target.value = '@' + value;
    }
    
    // Remove spaces and special characters except underscore and period
    e.target.value = e.target.value.replace(/[^@\w._]/g, '');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key in textarea to generate plan (with Ctrl/Cmd)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement === promptTextarea) {
        e.preventDefault();
        generatePlanBtn.click();
    }
    
    // Enter key in username input to start campaign
    if (e.key === 'Enter' && document.activeElement === usernameInput) {
        e.preventDefault();
        startCampaignBtn.click();
    }
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #8B5CF6, #3B82F6)';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.3s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    addScrollProgress();
    
    // Add entrance animations
    const header = document.querySelector('.header');
    const platformSection = document.querySelector('.platform-section');
    
    setTimeout(() => {
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        platformSection.style.transform = 'translateY(0)';
        platformSection.style.opacity = '1';
    }, 300);
});

// Add initial styles for entrance animations
document.querySelector('.header').style.transform = 'translateY(-20px)';
document.querySelector('.header').style.opacity = '0';
document.querySelector('.header').style.transition = 'all 0.6s ease';

document.querySelector('.platform-section').style.transform = 'translateY(20px)';
document.querySelector('.platform-section').style.opacity = '0';
document.querySelector('.platform-section').style.transition = 'all 0.6s ease'; 