// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Dice Elements
const diceElement = document.getElementById('diceElement');
const rollDiceButton = document.getElementById('rollDice');
const diceResult = document.getElementById('diceResult');
const diceHistory = document.getElementById('diceHistory');

// Coin Elements
const coinElement = document.getElementById('coinElement');
const flipCoinButton = document.getElementById('flipCoin');
const coinResult = document.getElementById('coinResult');
const coinHistory = document.getElementById('coinHistory');

// Quiz Elements
const getQuizButton = document.getElementById('getQuiz');
const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const backButton = document.getElementById('backButton');

// Dares Elements
const getDareButton = document.getElementById('getDare');
const getRandomButton = document.getElementById('getRandom');
const backButtonDares = document.getElementById('backButtonDares');
const daresContent = document.getElementById('daresContent');

// State
let diceRolls = [];
let coinFlips = [];

// Debug: Check if elements exist
console.log('🔍 Debug: Checking element existence...');
console.log('flipCoinButton:', flipCoinButton);
console.log('coinElement:', coinElement);
console.log('coinResult:', coinResult);

// Tab Switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update content
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});

// Dice Roller Functionality
function rollDice() {
    console.log('🎲 Rolling dice...');
    // Add rolling animation
    diceElement.classList.add('rolling');
    diceResult.textContent = '';
    
    setTimeout(() => {
        const roll = Math.floor(Math.random() * 6) + 1;
        const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        
        diceElement.innerHTML = `<div class="face">${diceFaces[roll - 1]}</div>`;
        diceElement.classList.remove('rolling');
        
        diceResult.textContent = `You rolled a ${roll}!`;
        diceRolls.push(roll);
        updateDiceHistory();
    }, 500);
}

function updateDiceHistory() {
    if (diceRolls.length > 0) {
        const lastFive = diceRolls.slice(-5);
        diceHistory.textContent = `Recent rolls: ${lastFive.join(', ')}`;
    }
}

// Coin Flip Functionality - COMPLETE VERSION
function flipCoin() {
    console.log('🪙 Flipping coin...');
    
    // Check if elements exist
    if (!coinElement || !coinResult) {
        console.error('❌ Coin elements not found!');
        return;
    }
    
    // Add flipping animation
    coinElement.classList.add('flipping');
    coinResult.textContent = '';
    
    setTimeout(() => {
        const isHeads = Math.random() < 0.5;
        const result = isHeads ? 'Heads' : 'Tails';
        
        console.log('Coin flip result:', result);
        
        // Rotate coin to show correct side
        if (isHeads) {
            coinElement.style.transform = 'rotateY(0deg)';
        } else {
            coinElement.style.transform = 'rotateY(180deg)';
        }
        
        coinElement.classList.remove('flipping');
        
        coinResult.textContent = `It's ${result}!`;
        coinFlips.push(result);
        updateCoinHistory();
    }, 600);
}

function updateCoinHistory() {
    if (coinFlips.length > 0) {
        const lastFive = coinFlips.slice(-5);
        coinHistory.textContent = `Recent flips: ${lastFive.join(', ')}`;
    }
}

// Computer Science Quiz Questions (Bac+4 Level - English)
const computerScienceQuiz = [
    {
        question: "What is the worst-case time complexity of QuickSort?",
        answers: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
        correct: 1
    },
    // ... (include all your other quiz questions)
];

// Dares & Advantages Database
const daresList = [
    "Stand up and do the chicken dance for 15 seconds",
    // ... (include all your other dares)
];

const advantagesList = [
    "You get to make the teacher tell a joke to the class",
    // ... (include all your other advantages)
];

// Quiz Functionality
function getRandomQuiz() {
    // Hide the filter button and show back button
    getQuizButton.style.display = 'none';
    backButton.style.display = 'block';
    
    // Get a random question
    const randomIndex = Math.floor(Math.random() * computerScienceQuiz.length);
    const quiz = computerScienceQuiz[randomIndex];
    
    displayQuiz(quiz);
}

function displayQuiz(quiz) {
    quizQuestion.textContent = quiz.question;
}

function goBackToHome() {
    // Reset quiz state
    quizQuestion.textContent = 'Click "Filter Random Quiz" to get a random computer science question!';
    
    // Show filter button and hide back button
    getQuizButton.style.display = 'block';
    backButton.style.display = 'none';
}

// Dares & Advantages Functionality
function getRandomDare() {
    // Hide the main buttons and show back button
    getDareButton.style.display = 'none';
    getRandomButton.style.display = 'none';
    backButtonDares.style.display = 'block';
    
    // Get a random dare
    const randomIndex = Math.floor(Math.random() * daresList.length);
    const dare = daresList[randomIndex];
    
    displayDare(dare);
}

function getRandomFilter() {
    // Hide the main buttons and show back button
    getDareButton.style.display = 'none';
    getRandomButton.style.display = 'none';
    backButtonDares.style.display = 'block';
    
    // Randomly choose between quiz question or dare/advantage
    const randomChoice = Math.random();
    
    if (randomChoice < 0.5) {
        // Show a random quiz question
        const randomQuizIndex = Math.floor(Math.random() * computerScienceQuiz.length);
        const quiz = computerScienceQuiz[randomQuizIndex];
        displayQuizInDares(quiz.question);
    } else if (randomChoice < 0.75) {
        // Show a random dare
        const randomDareIndex = Math.floor(Math.random() * daresList.length);
        const dare = daresList[randomDareIndex];
        displayDare(dare);
    } else {
        // Show a random advantage
        const randomAdvantageIndex = Math.floor(Math.random() * advantagesList.length);
        const advantage = advantagesList[randomAdvantageIndex];
        displayAdvantage(advantage);
    }
}

function displayDare(dare) {
    daresContent.innerHTML = `<div class="dare-item">${dare}</div>`;
}

function displayAdvantage(advantage) {
    daresContent.innerHTML = `<div class="advantage-item">${advantage}</div>`;
}

function displayQuizInDares(question) {
    daresContent.innerHTML = `<div class="quiz-question">${question}</div>`;
}

function goBackToDaresHome() {
    // Reset dares state
    daresContent.innerHTML = 'Click "Get Dare" for dares or "Random Filter" for random quiz/dares!';
    
    // Show main buttons and hide back button
    getDareButton.style.display = 'block';
    getRandomButton.style.display = 'block';
    backButtonDares.style.display = 'none';
}

// Event Listeners for all tools
function initializeEventListeners() {
    console.log('🔗 Initializing event listeners...');
    
    // Dice events
    if (rollDiceButton) {
        rollDiceButton.addEventListener('click', rollDice);
        console.log('✅ Dice button listener attached');
    }
    if (diceElement) {
        diceElement.addEventListener('click', rollDice);
    }
    
    // Coin events - MAKE SURE THESE ARE INCLUDED
    if (flipCoinButton) {
        flipCoinButton.addEventListener('click', flipCoin);
        console.log('✅ Coin button listener attached');
    }
    if (coinElement) {
        coinElement.addEventListener('click', flipCoin);
        console.log('✅ Coin element listener attached');
    }
    
    // Quiz events
    if (getQuizButton) {
        getQuizButton.addEventListener('click', getRandomQuiz);
        console.log('✅ Quiz button listener attached');
    }
    if (backButton) {
        backButton.addEventListener('click', goBackToHome);
    }
    
    // Dares events
    if (getDareButton) {
        getDareButton.addEventListener('click', getRandomDare);
    }
    if (getRandomButton) {
        getRandomButton.addEventListener('click', getRandomFilter);
    }
    if (backButtonDares) {
        backButtonDares.addEventListener('click', goBackToDaresHome);
    }
    
    console.log('🎉 All event listeners initialized');
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM fully loaded, initializing app...');
    initializeEventListeners();
    goBackToHome(); // Initialize quiz screen
    goBackToDaresHome(); // Initialize dares screen
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}