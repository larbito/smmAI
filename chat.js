// Chat functionality for SMM AI Assistant
// API Configuration
const API_CONFIG = {
    JUSTANOTHERPANEL_KEY: '1523ddd09ac7c607db9767ba8a25ac2a',
    JUSTANOTHERPANEL_URL: 'https://justanotherpanel.com/api/v2'
};

// Global chat state
let chatState = {
    conversation: [],
    currentStrategy: null,
    userGoals: null,
    awaitingInput: false
};

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    setupEventListeners();
    loadChatHistory();
});

function initializeChat() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    // Enable auto-resize for message input
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // Send message on Enter (but allow Shift+Enter for new lines)
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Update send button state based on input
    messageInput.addEventListener('input', function() {
        sendButton.disabled = !this.value.trim();
    });
}

function setupEventListeners() {
    // Modal close functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmission);
    }
}

// Chat functions
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Clear input and disable send button
    messageInput.value = '';
    messageInput.style.height = 'auto';
    document.getElementById('sendButton').disabled = true;
    
    // Hide quick actions after first message
    const quickActions = document.getElementById('quickActions');
    if (quickActions && chatState.conversation.length === 0) {
        quickActions.style.display = 'none';
    }
    
    // Add user message to chat
    addMessage('user', message);
    
    // Save message to state
    chatState.conversation.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
    });
    
    // Process message and generate AI response
    setTimeout(() => {
        processUserMessage(message);
    }, 500);
    
    // Save chat history
    saveChatHistory();
}

function addMessage(sender, content, actions = null) {
    const messagesArea = document.getElementById('messagesArea');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="sender">SMM AI Assistant</span>
                    <span class="timestamp">${formatTimestamp()}</span>
                </div>
                <div class="message-text">
                    ${content}
                </div>
                ${actions ? `<div class="message-actions">${actions}</div>` : ''}
            </div>
        `;
    }
    
    messagesArea.appendChild(messageDiv);
    scrollToBottom(messagesArea);
}

function showTypingIndicator() {
    const messagesArea = document.getElementById('messagesArea');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    messagesArea.appendChild(typingDiv);
    scrollToBottom(messagesArea);
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function processUserMessage(message) {
    showTypingIndicator();
    
    // Parse user goals from message
    const goals = parseUserGoals(message);
    
    setTimeout(() => {
        hideTypingIndicator();
        
        if (!goals.platform || !goals.budget) {
            // Ask for missing information
            askForMissingInfo(goals, message);
        } else {
            // Generate strategies
            generateStrategies(goals);
        }
    }, 1500);
}

function parseUserGoals(message) {
    const goals = {
        platform: null,
        currentFollowers: null,
        budget: null,
        targetFollowers: null,
        niche: null
    };
    
    const msg = message.toLowerCase();
    
    // Extract platform
    const platforms = {
        'instagram': ['instagram', 'insta', 'ig'],
        'tiktok': ['tiktok', 'tik tok'],
        'youtube': ['youtube', 'yt'],
        'twitter': ['twitter', 'x.com'],
        'linkedin': ['linkedin'],
        'facebook': ['facebook', 'fb']
    };
    
    for (const [platform, keywords] of Object.entries(platforms)) {
        if (keywords.some(keyword => msg.includes(keyword))) {
            goals.platform = platform;
            break;
        }
    }
    
    // Extract budget
    const budgetMatch = msg.match(/\$(\d+)/);
    if (budgetMatch) {
        goals.budget = parseInt(budgetMatch[1]);
    }
    
    // Extract current followers
    const currentMatch = msg.match(/(\d+)k?\s*(followers?|subs?)/i);
    if (currentMatch) {
        const num = parseInt(currentMatch[1]);
        goals.currentFollowers = currentMatch[0].toLowerCase().includes('k') ? num * 1000 : num;
    }
    
    // Extract target followers
    const targetMatch = msg.match(/(?:to|reach)\s*(\d+)k?\s*(followers?|subs?)/i);
    if (targetMatch) {
        const num = parseInt(targetMatch[1]);
        goals.targetFollowers = targetMatch[0].toLowerCase().includes('k') ? num * 1000 : num;
    }
    
    // Extract niche/category
    const niches = ['food', 'fitness', 'fashion', 'tech', 'gaming', 'music', 'travel', 'business', 'lifestyle'];
    for (const niche of niches) {
        if (msg.includes(niche)) {
            goals.niche = niche;
            break;
        }
    }
    
    return goals;
}

function askForMissingInfo(goals, originalMessage) {
    let questions = [];
    
    if (!goals.platform) {
        questions.push("What platform do you want to grow on? (Instagram, TikTok, YouTube, etc.)");
    }
    
    if (!goals.budget) {
        questions.push("What's your budget for growth services?");
    }
    
    if (!goals.currentFollowers) {
        questions.push("How many followers do you currently have?");
    }
    
    if (!goals.targetFollowers) {
        questions.push("What's your follower goal?");
    }
    
    const questionText = questions.length > 1 
        ? "I need a bit more information:\n\n" + questions.map(q => `• ${q}`).join('\n')
        : questions[0];
    
    addMessage('ai', `<p>Thanks for that information! ${questionText}</p>`);
    
    // Store partial goals
    chatState.userGoals = { ...goals, originalMessage };
    chatState.awaitingInput = true;
}

async function generateStrategies(goals) {
    try {
        // Store user goals
        chatState.userGoals = goals;
        
        // Generate 3 different strategies based on budget and platform
        const strategies = await createStrategies(goals);
        
        let responseText = `<p>Perfect! Based on your goals, I've created 3 custom growth strategies for your ${goals.platform} account:</p>`;
        
        // Create strategy cards HTML
        const strategyCards = strategies.map((strategy, index) => `
            <div class="strategy-card" onclick="selectStrategy(${index})">
                <h4><i class="fas fa-chart-line"></i> ${strategy.name}</h4>
                <p>${strategy.description}</p>
                <div class="strategy-features">
                    ${strategy.features.map(feature => `<span class="strategy-feature">${feature}</span>`).join('')}
                </div>
                <div class="strategy-price">$${strategy.price}</div>
            </div>
        `).join('');
        
        responseText += `<div class="strategy-cards">${strategyCards}</div>`;
        
        const actions = `
            <button class="action-button" onclick="showStrategyModal()">
                <i class="fas fa-eye"></i> Compare All Plans
            </button>
            <button class="action-button secondary" onclick="askQuestion()">
                <i class="fas fa-question"></i> Ask a Question
            </button>
        `;
        
        addMessage('ai', responseText, actions);
        
        // Store strategies for later use
        chatState.strategies = strategies;
        
    } catch (error) {
        console.error('Error generating strategies:', error);
        addMessage('ai', '<p>I apologize, but I encountered an error while generating your strategies. Please try again or contact support.</p>');
    }
}

async function createStrategies(goals) {
    // This would normally call an AI API, but for now we'll generate based on rules
    const { platform, budget, currentFollowers, targetFollowers } = goals;
    
    const strategies = [];
    
    // Strategy 1: Basic Growth
    strategies.push({
        name: "Rapid Follower Boost",
        description: "Quick follower increase with high-quality accounts",
        price: Math.min(budget * 0.4, 25),
        features: ["Real followers", "Fast delivery", "24/7 support"],
        services: await getSMMServices(platform, 'followers', Math.min(budget * 0.4, 25))
    });
    
    // Strategy 2: Engagement Focus
    strategies.push({
        name: "Engagement Amplifier",
        description: "Boost likes, comments, and shares for viral potential",
        price: Math.min(budget * 0.6, 35),
        features: ["High engagement", "Viral boost", "Content optimization"],
        services: await getSMMServices(platform, 'engagement', Math.min(budget * 0.6, 35))
    });
    
    // Strategy 3: Comprehensive Growth
    strategies.push({
        name: "Complete Growth Package",
        description: "Full-service growth with followers, engagement, and optimization",
        price: Math.min(budget * 0.8, 50),
        features: ["Followers + Engagement", "Story/Reel boosts", "Analytics tracking"],
        services: await getSMMServices(platform, 'complete', Math.min(budget * 0.8, 50))
    });
    
    return strategies;
}

async function getSMMServices(platform, type, budget) {
    try {
        // Fetch available services from JustAnotherPanel
        const response = await fetch(`${API_CONFIG.JUSTANOTHERPANEL_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: API_CONFIG.JUSTANOTHERPANEL_KEY,
                action: 'services'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            return filterServicesByPlatformAndBudget(data, platform, type, budget);
        }
    } catch (error) {
        console.error('Error fetching SMM services:', error);
    }
    
    // Fallback mock services if API fails
    return getMockServices(platform, type, budget);
}

function filterServicesByPlatformAndBudget(services, platform, type, budget) {
    // Filter and select best services based on platform, type, and budget
    return services
        .filter(service => service.name.toLowerCase().includes(platform))
        .filter(service => service.rate <= budget)
        .slice(0, 3); // Take top 3 services
}

function getMockServices(platform, type, budget) {
    // Mock services for demo purposes
    const mockServices = {
        instagram: {
            followers: [
                { id: 1, name: 'Instagram Followers - High Quality', rate: 15, min: 100, max: 10000 },
                { id: 2, name: 'Instagram Followers - Premium', rate: 25, min: 500, max: 50000 }
            ],
            engagement: [
                { id: 3, name: 'Instagram Likes - Instant', rate: 8, min: 100, max: 5000 },
                { id: 4, name: 'Instagram Comments - Real', rate: 20, min: 10, max: 500 }
            ]
        },
        tiktok: {
            followers: [
                { id: 5, name: 'TikTok Followers - Real Active', rate: 18, min: 100, max: 20000 },
                { id: 6, name: 'TikTok Likes - High Quality', rate: 12, min: 100, max: 10000 }
            ]
        }
    };
    
    return mockServices[platform]?.[type] || [];
}

// Strategy selection functions
function selectStrategy(index) {
    chatState.currentStrategy = chatState.strategies[index];
    const strategy = chatState.currentStrategy;
    
    addMessage('ai', `
        <p>Great choice! You've selected the <strong>${strategy.name}</strong> for $${strategy.price}.</p>
        <p>To proceed, I'll need some information about your account:</p>
    `);
    
    setTimeout(() => {
        showFormModal();
    }, 1000);
}

function showStrategyModal() {
    const modal = document.getElementById('strategyModal');
    const optionsContainer = document.getElementById('strategyOptions');
    
    if (!chatState.strategies) return;
    
    const optionsHTML = chatState.strategies.map((strategy, index) => `
        <div class="strategy-option-card" onclick="selectStrategyFromModal(${index})">
            <div class="strategy-header">
                <div>
                    <div class="strategy-title">${strategy.name}</div>
                    <div class="strategy-subtitle">${strategy.description}</div>
                </div>
                <div class="strategy-price-large">$${strategy.price}</div>
            </div>
            <div class="strategy-description">
                Perfect for growing your ${chatState.userGoals.platform} account with a focus on ${strategy.name.toLowerCase()}.
            </div>
            <div class="strategy-includes">
                <h5>What's included:</h5>
                <ul class="strategy-list">
                    ${strategy.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    
    optionsContainer.innerHTML = optionsHTML;
    modal.classList.add('active');
}

function selectStrategyFromModal(index) {
    closeModal();
    selectStrategy(index);
}

function showFormModal() {
    const modal = document.getElementById('formModal');
    modal.classList.add('active');
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.classList.remove('active'));
}

async function handleOrderSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        username: formData.get('accountUsername'),
        accountLink: formData.get('accountLink'),
        postLinks: formData.get('postLinks'),
        additionalInfo: formData.get('additionalInfo'),
        strategy: chatState.currentStrategy,
        userGoals: chatState.userGoals
    };
    
    // Validate form
    if (!validateForm(e.target)) {
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    showLoading(submitBtn, 'Processing...');
    
    try {
        // Close modal and show loading overlay
        closeModal();
        showLoadingOverlay();
        
        // Process order with JustAnotherPanel API
        const result = await processOrder(orderData);
        
        if (result.success) {
            hideLoadingOverlay();
            showOrderSuccess(result);
        } else {
            throw new Error(result.error || 'Order processing failed');
        }
        
    } catch (error) {
        console.error('Order submission failed:', error);
        hideLoadingOverlay();
        hideLoading(submitBtn);
        showNotification('Order processing failed. Please try again.', 'error');
    }
}

async function processOrder(orderData) {
    try {
        // This would normally process the order with JustAnotherPanel API
        // For demo purposes, we'll simulate the API call
        
        const orderPayload = {
            key: API_CONFIG.JUSTANOTHERPANEL_KEY,
            action: 'add',
            service: orderData.strategy.services[0]?.id || 1,
            link: orderData.accountLink,
            quantity: Math.floor(orderData.strategy.price * 100) // Convert price to quantity
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Mock successful response
        return {
            success: true,
            orderId: generateId(),
            estimatedDelivery: '24-48 hours',
            status: 'processing'
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

function showOrderSuccess(result) {
    const successMessage = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
            <h3 style="color: #10b981; margin-bottom: 16px;">Order Placed Successfully!</h3>
            <p style="margin-bottom: 20px;">
                Your growth campaign is now being set up. You should start seeing results within ${result.estimatedDelivery}.
            </p>
            <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <strong>Order ID:</strong> ${result.orderId}<br>
                <strong>Status:</strong> ${result.status}<br>
                <strong>Strategy:</strong> ${chatState.currentStrategy.name}
            </div>
            <p style="color: #6b7280; font-size: 14px;">
                We'll send you updates on your campaign progress. Thank you for choosing SMM AI!
            </p>
        </div>
    `;
    
    addMessage('ai', successMessage);
    
    // Show notification
    showNotification('Order placed successfully! Check your email for updates.', 'success');
    
    // Reset chat state
    resetChatState();
}

function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
}

// Quick start functions
function selectQuickStart(platform) {
    const prompts = {
        instagram: "I want to grow my Instagram account. I currently have 1K followers and have a $30 budget.",
        tiktok: "I need help growing my TikTok account. I have 500 followers and can spend $25.",
        youtube: "I want to grow my YouTube channel. I have 100 subscribers and a $40 budget.",
        multiple: "I want to grow across multiple platforms. I have small accounts on Instagram and TikTok with a $50 budget."
    };
    
    const messageInput = document.getElementById('messageInput');
    messageInput.value = prompts[platform] || prompts.instagram;
    messageInput.focus();
    
    // Trigger input event to resize textarea
    messageInput.dispatchEvent(new Event('input'));
    
    // Enable send button
    document.getElementById('sendButton').disabled = false;
}

// Utility functions
function clearChat() {
    const messagesArea = document.getElementById('messagesArea');
    const quickActions = document.getElementById('quickActions');
    
    // Keep only the welcome message
    const welcomeMessage = messagesArea.querySelector('.message.ai-message');
    messagesArea.innerHTML = '';
    if (welcomeMessage) {
        messagesArea.appendChild(welcomeMessage);
    }
    
    // Show quick actions again
    quickActions.style.display = 'flex';
    
    // Reset chat state
    resetChatState();
    
    // Clear storage
    removeFromStorage('chatHistory');
    
    showNotification('Chat cleared successfully', 'info');
}

function resetChatState() {
    chatState = {
        conversation: [],
        currentStrategy: null,
        userGoals: null,
        awaitingInput: false
    };
}

function askQuestion() {
    const questions = [
        "How long does it take to see results?",
        "Are the followers/likes real people?",
        "Is this safe for my account?",
        "Can I customize my strategy?",
        "What if I'm not satisfied with the results?"
    ];
    
    const questionsList = questions.map(q => `• ${q}`).join('\n');
    
    addMessage('ai', `
        <p>I'm here to help! Here are some common questions:</p>
        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin: 12px 0;">
            ${questionsList.replace(/\n/g, '<br>')}
        </div>
        <p>Feel free to ask me anything about our services, strategies, or the growth process!</p>
    `);
}

// Chat history functions
function saveChatHistory() {
    saveToStorage('chatHistory', {
        conversation: chatState.conversation,
        userGoals: chatState.userGoals,
        timestamp: new Date().toISOString()
    });
}

function loadChatHistory() {
    const history = loadFromStorage('chatHistory');
    if (history && history.conversation.length > 0) {
        // Optionally restore previous conversation
        // For now, we'll start fresh each time
    }
}

// Utility functions from utils
const { formatTimestamp, generateId, scrollToBottom, showNotification, 
        saveToStorage, loadFromStorage, removeFromStorage, validateForm, 
        showLoading, hideLoading } = window.smmUtils; 