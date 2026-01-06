// Bus data with various bus types and personalities
const buses = [
    {
        name: "Red Double-Decker",
        age: 25,
        details: "Classic British charm, loves long routes",
        tags: ["Vintage", "Romantic", "Tall"],
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    },
    {
        name: "Yellow School Bus",
        age: 22,
        details: "Cheerful and reliable, brings joy to everyone",
        tags: ["Friendly", "Punctual", "Yellow"],
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop"
    },
    {
        name: "Sleek City Express",
        age: 28,
        details: "Modern and efficient, loves the fast lane",
        tags: ["Modern", "Fast", "Stylish"],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop"
    },
    {
        name: "Vintage VW Bus",
        age: 45,
        details: "Free spirit, beach lover, hippie at heart",
        tags: ["Retro", "Adventurous", "Colorful"],
        image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop"
    },
    {
        name: "Electric Green Bus",
        age: 24,
        details: "Eco-friendly and forward-thinking",
        tags: ["Green", "Quiet", "Future"],
        image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop"
    },
    {
        name: "Party Bus Deluxe",
        age: 26,
        details: "Life of the party, disco lights included",
        tags: ["Fun", "Loud", "Social"],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop"
    },
    {
        name: "Articulated Bendy",
        age: 30,
        details: "Flexible and accommodating, great capacity",
        tags: ["Flexible", "Spacious", "Unique"],
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop"
    },
    {
        name: "Tourist Sightseeing Bus",
        age: 27,
        details: "Loves showing you around town",
        tags: ["Cultured", "Open-top", "Chatty"],
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    },
    {
        name: "Night Rider Express",
        age: 29,
        details: "Mysterious late-night cruiser",
        tags: ["Mysterious", "Nocturnal", "Cool"],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop"
    },
    {
        name: "Airport Shuttle",
        age: 23,
        details: "Always ready for an adventure",
        tags: ["Traveler", "Reliable", "Adventurous"],
        image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop"
    }
];

// App state
let currentBusIndex = 0;
let swipeCount = 0;
let matchCount = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

// DOM elements
const busCard = document.getElementById('busCard');
const busImage = document.getElementById('busImage');
const busName = document.getElementById('busName');
const busDetails = document.getElementById('busDetails');
const busTags = document.getElementById('busTags');
const likeBtn = document.getElementById('likeBtn');
const nopeBtn = document.getElementById('nopeBtn');
const matchScreen = document.getElementById('matchScreen');
const continueBtn = document.getElementById('continueBtn');
const swipeCountEl = document.getElementById('swipeCount');
const matchCountEl = document.getElementById('matchCount');
const likeOverlay = document.getElementById('likeOverlay');
const nopeOverlay = document.getElementById('nopeOverlay');
const loveOverlay = document.getElementById('loveOverlay');
const closeLoveBtn = document.getElementById('closeLoveBtn');

// Initialize app
function init() {
    shuffleBuses();
    loadBus(currentBusIndex);
    attachEventListeners();
}

// Shuffle buses array
function shuffleBuses() {
    for (let i = buses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [buses[i], buses[j]] = [buses[j], buses[i]];
    }
}

// Load bus data into card
function loadBus(index) {
    if (index >= buses.length) {
        currentBusIndex = 0;
        shuffleBuses();
        index = 0;
    }

    const bus = buses[index];
    busImage.src = bus.image;
    busName.textContent = `${bus.name}, ${bus.age}`;
    busDetails.textContent = bus.details;

    // Load tags
    busTags.innerHTML = '';
    bus.tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'bg-red-100 text-tfl-red px-3 py-1 rounded-full text-sm font-medium';
        tagEl.textContent = tag;
        busTags.appendChild(tagEl);
    });

    // Reset card position and rotation
    busCard.style.transform = 'translate(0, 0) rotate(0deg)';
    busCard.classList.remove('swipe-left', 'swipe-right');
}

// Handle swipe decision
function handleSwipe(direction) {
    const isLike = direction === 'right';

    // Animate card
    busCard.classList.add(isLike ? 'swipe-right' : 'swipe-left');

    // Update stats
    swipeCount++;
    swipeCountEl.textContent = swipeCount;

    // Check for 6 swipes - show love animation!
    if (swipeCount === 6) {
        setTimeout(() => {
            showLoveAnimation();
        }, 500);
        return;
    }

    // Check for match (1 in 4 chance on likes)
    const isMatch = isLike && Math.random() < 0.25;

    if (isMatch) {
        setTimeout(() => {
            showMatchScreen();
            matchCount++;
            matchCountEl.textContent = matchCount;
        }, 500);
    } else {
        setTimeout(() => {
            currentBusIndex++;
            loadBus(currentBusIndex);
        }, 500);
    }
}

// Show match screen with animation
function showMatchScreen() {
    matchScreen.classList.remove('hidden');
    matchScreen.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
    matchScreen.style.display = 'flex';
    createConfetti();
}

// Hide match screen and continue
function hideMatchScreen() {
    matchScreen.classList.add('hidden');
    matchScreen.classList.remove('flex', 'flex-col', 'items-center', 'justify-center');
    matchScreen.style.display = 'none';
    currentBusIndex++;
    loadBus(currentBusIndex);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#DC241F', '#CC3333', '#0019A8', '#1C3F94', '#FFFFFF', '#FFD700'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            matchScreen.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Show love animation after 6 swipes
function showLoveAnimation() {
    loveOverlay.classList.add('active');
    createFloatingHearts();
    createSparkles();
}

// Hide love animation
function hideLoveAnimation() {
    loveOverlay.classList.remove('active');
    // Clean up floating hearts and sparkles
    const floatingHearts = loveOverlay.querySelectorAll('.floating-heart');
    const sparkles = loveOverlay.querySelectorAll('.sparkle-element');
    floatingHearts.forEach(heart => heart.remove());
    sparkles.forEach(sparkle => sparkle.remove());
    // Load next bus
    currentBusIndex++;
    loadBus(currentBusIndex);
}

// Create floating hearts effect
function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    const heartCount = 30;

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            loveOverlay.appendChild(heart);

            setTimeout(() => heart.remove(), 8000);
        }, i * 100);
    }
}

// Create sparkle effect
function createSparkles() {
    const sparkleCount = 40;

    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-element';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 1 + 's';
            loveOverlay.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 6000);
        }, i * 80);
    }
}

// Touch and mouse events for swiping
function attachEventListeners() {
    // Button clicks
    likeBtn.addEventListener('click', () => handleSwipe('right'));
    nopeBtn.addEventListener('click', () => handleSwipe('left'));
    continueBtn.addEventListener('click', hideMatchScreen);
    closeLoveBtn.addEventListener('click', hideLoveAnimation);

    // Mouse events
    busCard.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // Touch events
    busCard.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);
}

function dragStart(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    busCard.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;

    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX - startX;
    const rotation = deltaX * 0.1;

    busCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

    // Show like/nope overlay based on drag direction
    if (deltaX > 50) {
        likeOverlay.style.opacity = Math.min(deltaX / 100, 1);
        nopeOverlay.style.opacity = 0;
    } else if (deltaX < -50) {
        nopeOverlay.style.opacity = Math.min(Math.abs(deltaX) / 100, 1);
        likeOverlay.style.opacity = 0;
    } else {
        likeOverlay.style.opacity = 0;
        nopeOverlay.style.opacity = 0;
    }
}

function dragEnd(e) {
    if (!isDragging) return;

    isDragging = false;
    busCard.style.transition = 'transform 0.3s ease';

    const deltaX = currentX - startX;

    // Reset overlays
    likeOverlay.style.opacity = 0;
    nopeOverlay.style.opacity = 0;

    // Threshold for swipe
    if (Math.abs(deltaX) > 100) {
        handleSwipe(deltaX > 0 ? 'right' : 'left');
    } else {
        // Reset position
        busCard.style.transform = 'translate(0, 0) rotate(0deg)';
    }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (matchScreen.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') handleSwipe('left');
        if (e.key === 'ArrowRight') handleSwipe('right');
    }
});

// Start the app
init();
