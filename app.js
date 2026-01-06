// Bus data with various bus types and personalities (now with technical specs!)
const buses = [
    {
        name: "Red Double-Decker",
        age: 25,
        details: "Classic British charm, loves long routes",
        tags: ["Vintage", "Romantic", "Tall"],
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "AEC Routemaster",
            engine: "AEC 9.6L Diesel",
            fuelType: "Diesel",
            mpg: 8.5,
            capacity: 64
        }
    },
    {
        name: "Yellow School Bus",
        age: 22,
        details: "Cheerful and reliable, brings joy to everyone",
        tags: ["Friendly", "Punctual", "Yellow"],
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "Blue Bird",
            engine: "Cummins 6.7L Turbo Diesel",
            fuelType: "Diesel",
            mpg: 9.2,
            capacity: 72
        }
    },
    {
        name: "Sleek City Express",
        age: 28,
        details: "Modern and efficient, loves the fast lane",
        tags: ["Modern", "Fast", "Stylish"],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "New Flyer",
            engine: "Cummins ISL9 320hp",
            fuelType: "Diesel",
            mpg: 10.5,
            capacity: 40
        }
    },
    {
        name: "Vintage VW Bus",
        age: 45,
        details: "Free spirit, beach lover, hippie at heart",
        tags: ["Retro", "Adventurous", "Colorful"],
        image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "Volkswagen Type 2",
            engine: "1.6L Flat-4 Air-Cooled",
            fuelType: "Gasoline",
            mpg: 18.0,
            capacity: 9
        }
    },
    {
        name: "Electric Green Bus",
        age: 24,
        details: "Eco-friendly and forward-thinking",
        tags: ["Green", "Quiet", "Future"],
        image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "BYD K9",
            engine: "Dual Electric Motors 335kW",
            fuelType: "Electric",
            mpg: null, // 1.2 kWh per mile
            capacity: 35
        }
    },
    {
        name: "Party Bus Deluxe",
        age: 26,
        details: "Life of the party, disco lights included",
        tags: ["Fun", "Loud", "Social"],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "Krystal Koach",
            engine: "CAT C7 ACERT Turbo Diesel",
            fuelType: "Diesel",
            mpg: 7.8,
            capacity: 30
        }
    },
    {
        name: "Articulated Bendy",
        age: 30,
        details: "Flexible and accommodating, great capacity",
        tags: ["Flexible", "Spacious", "Unique"],
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "Mercedes-Benz Citaro G",
            engine: "OM 906 LA 7.7L Inline-6",
            fuelType: "Diesel",
            mpg: 8.9,
            capacity: 120
        }
    },
    {
        name: "Tourist Sightseeing Bus",
        age: 27,
        details: "Loves showing you around town",
        tags: ["Cultured", "Open-top", "Chatty"],
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "Van Hool",
            engine: "Cummins ISL 8.9L",
            fuelType: "Diesel",
            mpg: 9.5,
            capacity: 48
        }
    },
    {
        name: "Night Rider Express",
        age: 29,
        details: "Mysterious late-night cruiser",
        tags: ["Mysterious", "Nocturnal", "Cool"],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "MCI D4500",
            engine: "Cummins ISX12 425hp",
            fuelType: "Diesel",
            mpg: 11.2,
            capacity: 55
        }
    },
    {
        name: "Airport Shuttle",
        age: 23,
        details: "Always ready for an adventure",
        tags: ["Traveler", "Reliable", "Adventurous"],
        image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop",
        specs: {
            manufacturer: "Ford E-450",
            engine: "6.8L V10 Triton",
            fuelType: "Gasoline",
            mpg: 12.5,
            capacity: 14
        }
    }
];

// Maintenance event templates (the dorky stuff!)
const maintenanceEvents = {
    match: [
        { msg: "Welcome to the garage! Your new match is all fueled up and ready to roll! 🚌💕", emoji: "⛽" },
        { msg: "First inspection complete - everything looks perfect! You two are going places! 🔧", emoji: "✅" },
        { msg: "VIN registered and relationship officially on the road! 📋", emoji: "📝" }
    ],
    oilChange: [
        { msg: "Oil change completed - running smooth as silk! 🥰", emoji: "🛢️" },
        { msg: "Fresh synthetic oil installed - she's purring like a kitten! 😻", emoji: "🛢️" },
        { msg: "Oil filter replaced - breathing easy now! *happy engine noises*", emoji: "🛢️" }
    ],
    tireRotation: [
        { msg: "Tires rotated - ready to keep rolling together! 🔄", emoji: "⚙️" },
        { msg: "All four corners looking good! Even wear means a long journey ahead! 💕", emoji: "🔄" },
        { msg: "Tread depth checked and rotated - grip is strong, just like our connection! 🤝", emoji: "⚙️" }
    ],
    brakes: [
        { msg: "New air brakes installed - stopping power increased by 30%! 🥰", emoji: "🛑" },
        { msg: "Brake pads replaced - safety first, always! 🦺", emoji: "🛑" },
        { msg: "Brake fluid flushed - that *pssshhht* sound never felt so good! 😌", emoji: "🛑" }
    ],
    airFilter: [
        { msg: "Air filter replaced - breathing easier than ever! 🌬️", emoji: "💨" },
        { msg: "New cabin air filter installed - the interior smells amazing! ✨", emoji: "💨" },
        { msg: "Engine air filter swapped - improved efficiency by 5%! 📈", emoji: "💨" }
    ],
    coolant: [
        { msg: "Coolant flush completed - running at optimal temperature! 🌡️", emoji: "❄️" },
        { msg: "Radiator serviced - keeping cool under pressure, as always! 😎", emoji: "❄️" },
        { msg: "Thermostat checked - maintaining that perfect 195°F! 🔥", emoji: "❄️" }
    ],
    transmission: [
        { msg: "Transmission service complete - shifting gears has never been smoother! 💫", emoji: "⚙️" },
        { msg: "ATF replaced - that ZF 6-speed is happy now! 🎉", emoji: "⚙️" },
        { msg: "Transmission filter changed - smooth operator! 😏", emoji: "⚙️" }
    ],
    inspection: [
        { msg: "Annual inspection passed with flying colors! 🌈", emoji: "✅" },
        { msg: "Safety inspection complete - all systems nominal! 🚦", emoji: "✅" },
        { msg: "DOT inspection cleared - roadworthy and relationship-worthy! 💯", emoji: "✅" }
    ],
    cosmetic: [
        { msg: "Full exterior wash and wax - looking absolutely stunning! ✨", emoji: "🧼" },
        { msg: "Paint touch-up completed - those scratches never happened! 🎨", emoji: "🎨" },
        { msg: "Interior detailed - smells like new bus! 🤩", emoji: "✨" },
        { msg: "Headlights polished - can see the future clearly now! 🔮", emoji: "💡" }
    ],
    fuel: [
        { msg: "Fueled up and ready for another week together! ⛽", emoji: "⛽" },
        { msg: "Topped off the tank - 100 gallons of diesel, 100% commitment! 💪", emoji: "⛽" },
        { msg: "DEF fluid refilled - keeping it clean and green! 🌱", emoji: "⛽" }
    ],
    battery: [
        { msg: "Battery terminals cleaned - strong connection, just like us! 🔋", emoji: "🔋" },
        { msg: "Battery tested at 98% capacity - still going strong! 💪", emoji: "🔋" },
        { msg: "New battery installed - ready for another 5 years together! 💕", emoji: "🔋" }
    ],
    milestone: [
        { msg: "We've been together for 1 week! Time flies when you're having fun! 🎉", emoji: "🎊" },
        { msg: "1 month anniversary! Our mileage together is adding up! 📅", emoji: "🎊" },
        { msg: "We've covered 10,000 miles together! Here's to many more! 🛣️", emoji: "🎊" },
        { msg: "6 months together! Best relationship of my life! 💕", emoji: "🎊" }
    ]
};

// App state
let currentBusIndex = 0;
let swipeCount = 0;
let matchCount = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let currentView = 'swipe'; // 'swipe' or 'garage'
let matchedBuses = []; // Will be loaded from localStorage

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

// Initialize app
function init() {
    loadMatchedBuses();
    shuffleBuses();
    loadBus(currentBusIndex);
    attachEventListeners();
    updateMatchedBusesCount();
}

// Load matched buses from localStorage
function loadMatchedBuses() {
    const saved = localStorage.getItem('matchedBuses');
    if (saved) {
        matchedBuses = JSON.parse(saved);
        // Update mileage for all buses based on time passed
        matchedBuses.forEach(bus => updateBusMileage(bus));
        saveMatchedBuses();
    }
}

// Save matched buses to localStorage
function saveMatchedBuses() {
    localStorage.setItem('matchedBuses', JSON.stringify(matchedBuses));
}

// Update mileage based on time since last update
function updateBusMileage(matchedBus) {
    const now = Date.now();
    const hoursSinceUpdate = (now - matchedBus.lastMileageUpdate) / (1000 * 60 * 60);

    // Buses "drive" about 100-150 miles per day when in a relationship
    // That's roughly 4-6 miles per hour on average
    const milesPerHour = 4 + Math.random() * 2;
    const mileageGained = Math.floor(hoursSinceUpdate * milesPerHour);

    matchedBus.currentMileage += mileageGained;
    matchedBus.lastMileageUpdate = now;

    // Generate maintenance events based on mileage milestones
    checkMaintenanceDue(matchedBus, mileageGained);
}

// Check if maintenance is due and generate events
function checkMaintenanceDue(matchedBus, mileageGained) {
    if (!matchedBus.lastMaintenanceMileage) {
        matchedBus.lastMaintenanceMileage = {
            oilChange: 0,
            tireRotation: 0,
            brakes: 0,
            airFilter: 0,
            coolant: 0,
            transmission: 0
        };
    }

    const maintenanceSchedule = {
        oilChange: 3000,
        tireRotation: 5000,
        airFilter: 8000,
        brakes: 10000,
        coolant: 15000,
        transmission: 20000
    };

    // Check each maintenance type
    for (const [type, interval] of Object.entries(maintenanceSchedule)) {
        const milesSinceLastService = matchedBus.currentMileage - matchedBus.lastMaintenanceMileage[type];

        if (milesSinceLastService >= interval) {
            // Generate maintenance event
            const event = maintenanceEvents[type][Math.floor(Math.random() * maintenanceEvents[type].length)];
            addMaintenanceLog(matchedBus, event.msg, event.emoji);
            matchedBus.lastMaintenanceMileage[type] = matchedBus.currentMileage;
        }
    }

    // Random cosmetic/fuel events (10% chance per mileage update)
    if (Math.random() < 0.1) {
        const randomEvent = Math.random() < 0.5 ? 'cosmetic' : 'fuel';
        const event = maintenanceEvents[randomEvent][Math.floor(Math.random() * maintenanceEvents[randomEvent].length)];
        addMaintenanceLog(matchedBus, event.msg, event.emoji);
    }

    // Check for relationship milestones
    checkRelationshipMilestones(matchedBus);
}

// Check and add relationship milestone events
function checkRelationshipMilestones(matchedBus) {
    const daysTogether = Math.floor((Date.now() - matchedBus.matchedAt) / (1000 * 60 * 60 * 24));
    const milestones = [
        { days: 7, msg: "We've been together for 1 week! Time flies when you're having fun! 🎉" },
        { days: 30, msg: "1 month anniversary! Our mileage together is adding up! 📅" },
        { days: 180, msg: "6 months together! Best relationship of my life! 💕" },
        { days: 365, msg: "1 YEAR TOGETHER! You complete my route! 🎊🚌💕" }
    ];

    const mileageMilestones = [
        { miles: 10000, msg: "We've covered 10,000 miles together! Here's to many more! 🛣️" },
        { miles: 25000, msg: "25,000 miles! That's basically around the Earth! 🌍" },
        { miles: 50000, msg: "50,000 miles and counting! Our journey is legendary! ⭐" },
        { miles: 100000, msg: "100K MILES! You're my forever bus! 💯🚌💕" }
    ];

    // Check if we just hit a day milestone
    milestones.forEach(milestone => {
        if (daysTogether === milestone.days && !matchedBus.milestonesReached?.includes(`day_${milestone.days}`)) {
            addMaintenanceLog(matchedBus, milestone.msg, "🎊");
            if (!matchedBus.milestonesReached) matchedBus.milestonesReached = [];
            matchedBus.milestonesReached.push(`day_${milestone.days}`);
        }
    });

    // Check if we just hit a mileage milestone
    mileageMilestones.forEach(milestone => {
        if (matchedBus.currentMileage >= milestone.miles && !matchedBus.milestonesReached?.includes(`miles_${milestone.miles}`)) {
            addMaintenanceLog(matchedBus, milestone.msg, "🎊");
            if (!matchedBus.milestonesReached) matchedBus.milestonesReached = [];
            matchedBus.milestonesReached.push(`miles_${milestone.miles}`);
        }
    });
}

// Add a maintenance log entry
function addMaintenanceLog(matchedBus, message, emoji) {
    if (!matchedBus.maintenanceLog) {
        matchedBus.maintenanceLog = [];
    }

    matchedBus.maintenanceLog.unshift({
        timestamp: Date.now(),
        message: message,
        emoji: emoji,
        mileage: matchedBus.currentMileage
    });

    // Keep only the last 50 entries
    if (matchedBus.maintenanceLog.length > 50) {
        matchedBus.maintenanceLog = matchedBus.maintenanceLog.slice(0, 50);
    }
}

// Create a new matched bus entry
function createMatchedBus(bus) {
    const now = Date.now();
    const matchedBus = {
        bus: {...bus}, // Clone the bus object
        matchedAt: now,
        lastMileageUpdate: now,
        currentMileage: 0,
        maintenanceLog: [],
        lastMaintenanceMileage: {
            oilChange: 0,
            tireRotation: 0,
            brakes: 0,
            airFilter: 0,
            coolant: 0,
            transmission: 0
        },
        milestonesReached: []
    };

    // Add initial "welcome to the garage" message
    const welcomeEvent = maintenanceEvents.match[Math.floor(Math.random() * maintenanceEvents.match.length)];
    addMaintenanceLog(matchedBus, welcomeEvent.msg, welcomeEvent.emoji);

    return matchedBus;
}

// Update the matched buses count display
function updateMatchedBusesCount() {
    const garageCount = document.getElementById('garageCount');
    if (garageCount) {
        garageCount.textContent = matchedBuses.length;
    }
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

    // Check for match (1 in 4 chance on likes)
    const isMatch = isLike && Math.random() < 0.25;

    if (isMatch) {
        // Create matched bus entry
        const matchedBus = createMatchedBus(buses[currentBusIndex]);
        matchedBuses.push(matchedBus);
        saveMatchedBuses();

        setTimeout(() => {
            showMatchScreen(matchedBus);
            matchCount++;
            matchCountEl.textContent = matchCount;
            updateMatchedBusesCount();
        }, 500);
    } else {
        setTimeout(() => {
            currentBusIndex++;
            loadBus(currentBusIndex);
        }, 500);
    }
}

// Show match screen with animation
function showMatchScreen(matchedBus) {
    // Update match screen with maintenance message
    const maintenanceMessage = document.getElementById('maintenanceMessage');
    if (maintenanceMessage && matchedBus.maintenanceLog && matchedBus.maintenanceLog.length > 0) {
        const latestLog = matchedBus.maintenanceLog[0];
        maintenanceMessage.innerHTML = `
            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4">
                <p class="text-white text-lg font-body flex items-center justify-center gap-2">
                    <span class="text-2xl">${latestLog.emoji}</span>
                    <span>${latestLog.message}</span>
                </p>
            </div>
        `;
    }

    matchScreen.classList.remove('hidden');
    createConfetti();
}

// Hide match screen and continue
function hideMatchScreen() {
    matchScreen.classList.add('hidden');
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

// Touch and mouse events for swiping
function attachEventListeners() {
    // Button clicks
    likeBtn.addEventListener('click', () => handleSwipe('right'));
    nopeBtn.addEventListener('click', () => handleSwipe('left'));
    continueBtn.addEventListener('click', hideMatchScreen);

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
    if (matchScreen.classList.contains('hidden') && currentView === 'swipe') {
        if (e.key === 'ArrowLeft') handleSwipe('left');
        if (e.key === 'ArrowRight') handleSwipe('right');
    }
});

// Format timestamp to readable date
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
}

// Format mileage with commas
function formatMileage(mileage) {
    return mileage.toLocaleString();
}

// Calculate days together
function getDaysTogether(matchedAt) {
    return Math.floor((Date.now() - matchedAt) / (1000 * 60 * 60 * 24));
}

// Render garage view
function renderGarage() {
    const garageContainer = document.getElementById('garageContainer');
    const emptyGarage = document.getElementById('emptyGarage');

    if (matchedBuses.length === 0) {
        garageContainer.classList.add('hidden');
        emptyGarage.classList.remove('hidden');
        return;
    }

    garageContainer.classList.remove('hidden');
    emptyGarage.classList.add('hidden');

    // Update mileage for all buses before rendering
    matchedBuses.forEach(bus => updateBusMileage(bus));
    saveMatchedBuses();

    garageContainer.innerHTML = matchedBuses.map(matchedBus => {
        const bus = matchedBus.bus;
        const daysTogether = getDaysTogether(matchedBus.matchedAt);
        const latestMaintenance = matchedBus.maintenanceLog.slice(0, 5); // Show latest 5

        return `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div class="flex gap-4 p-4">
                    <!-- Bus Image -->
                    <div class="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
                        <img src="${bus.image}" alt="${bus.name}" class="w-full h-full object-cover">
                    </div>

                    <!-- Bus Info -->
                    <div class="flex-grow">
                        <h3 class="text-xl font-johnston font-bold text-gray-800">${bus.name}, ${bus.age}</h3>
                        <p class="text-sm text-gray-600 mb-2">${bus.specs.manufacturer}</p>

                        <!-- Stats -->
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div class="bg-red-50 rounded-lg p-2">
                                <div class="text-tfl-red font-bold">${formatMileage(matchedBus.currentMileage)} mi</div>
                                <div class="text-gray-600 text-xs">Together</div>
                            </div>
                            <div class="bg-blue-50 rounded-lg p-2">
                                <div class="text-tfl-blue font-bold">${daysTogether} days</div>
                                <div class="text-gray-600 text-xs">Relationship</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Maintenance Log -->
                <div class="bg-gray-50 p-4 border-t">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="text-lg">🔧</span>
                        <h4 class="font-johnston font-bold text-gray-800">Maintenance Log</h4>
                    </div>

                    <div class="space-y-2">
                        ${latestMaintenance.map(log => `
                            <div class="bg-white rounded-lg p-3 text-sm">
                                <div class="flex items-start gap-2">
                                    <span class="text-xl flex-shrink-0">${log.emoji}</span>
                                    <div class="flex-grow">
                                        <p class="text-gray-700">${log.message}</p>
                                        <p class="text-gray-400 text-xs mt-1">
                                            ${formatDate(log.timestamp)} • ${formatMileage(log.mileage)} mi
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    ${matchedBus.maintenanceLog.length > 5 ? `
                        <p class="text-center text-sm text-gray-500 mt-2">
                            +${matchedBus.maintenanceLog.length - 5} more entries
                        </p>
                    ` : ''}
                </div>

                <!-- Technical Specs -->
                <div class="bg-gray-100 p-4 border-t">
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span class="text-gray-600">Engine:</span>
                            <span class="font-medium text-gray-800 ml-1">${bus.specs.engine}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Fuel:</span>
                            <span class="font-medium text-gray-800 ml-1">${bus.specs.fuelType}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Capacity:</span>
                            <span class="font-medium text-gray-800 ml-1">${bus.specs.capacity} passengers</span>
                        </div>
                        <div>
                            <span class="text-gray-600">MPG:</span>
                            <span class="font-medium text-gray-800 ml-1">${bus.specs.mpg || 'Electric'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Switch between swipe and garage views
function showGarage() {
    currentView = 'garage';
    document.getElementById('cardContainer').classList.add('hidden');
    document.getElementById('garageView').classList.remove('hidden');
    document.querySelector('.mt-6').classList.add('hidden'); // Hide stats
    renderGarage();
}

function showSwipe() {
    currentView = 'swipe';
    document.getElementById('cardContainer').classList.remove('hidden');
    document.getElementById('garageView').classList.add('hidden');
    document.querySelector('.mt-6').classList.remove('hidden'); // Show stats
}

// Add garage navigation event listeners
function attachGarageListeners() {
    const garageBtn = document.getElementById('garageBtn');
    const backToSwipeBtn = document.getElementById('backToSwipeBtn');
    const startSwipingBtn = document.getElementById('startSwipingBtn');

    if (garageBtn) {
        garageBtn.addEventListener('click', showGarage);
    }

    if (backToSwipeBtn) {
        backToSwipeBtn.addEventListener('click', showSwipe);
    }

    if (startSwipingBtn) {
        startSwipingBtn.addEventListener('click', showSwipe);
    }
}

// Start the app
init();
attachGarageListeners();
