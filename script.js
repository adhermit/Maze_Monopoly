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

// State
let diceRolls = [];
let coinFlips = [];

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

// Coin Flip Functionality
function flipCoin() {
    coinElement.classList.add('flipping');
    coinResult.textContent = '';
    
    setTimeout(() => {
        const isHeads = Math.random() < 0.5;
        const result = isHeads ? 'Heads' : 'Tails';
        
        // Rotate coin to show correct side
        coinElement.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';
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
    {
        question: "Which algorithm finds shortest paths from a single source?",
        answers: ["Dijkstra", "Kruskal", "Floyd-Warshall", "Prim"],
        correct: 0
    },
    {
        question: "What does SQL injection attack target?",
        answers: ["Databases", "Web servers", "Network packets", "User passwords"],
        correct: 0
    },
    {
        question: "What is overfitting in machine learning?",
        answers: ["Model fits training data too well", "Model doesn't learn enough", "Fast convergence", "Too many features"],
        correct: 0
    },
    {
        question: "Which data structure uses LIFO principle?",
        answers: ["Queue", "Stack", "Binary Tree", "Linked List"],
        correct: 1
    },
    {
        question: "What phase converts source code to intermediate code?",
        answers: ["Lexical analysis", "Syntax analysis", "Semantic analysis", "Intermediate code generation"],
        correct: 3
    },
    {
        question: "What is polymorphism in OOP?",
        answers: ["Same interface for different types", "Data encapsulation", "Multiple inheritance", "Operator overloading"],
        correct: 0
    },
    {
        question: "What does Big O notation represent?",
        answers: ["Average case", "Best case", "Worst case", "Space complexity"],
        correct: 2
    },
    {
        question: "Which protocol ensures data confidentiality online?",
        answers: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correct: 2
    },
    {
        question: "What does ACID guarantee in databases?",
        answers: ["Atomicity, Consistency, Isolation, Durability", "Authentication, Confidentiality, Integrity, Availability", "Access, Control, Indexing, Deployment", "Analysis, Conception, Implementation, Development"],
        correct: 0
    },
    {
        question: "What is an AVL tree?",
        answers: ["Height-balanced BST", "Binary tree with max 2 children", "Tree for sorting", "Decision tree"],
        correct: 0
    },
    {
        question: "What does a load balancer do?",
        answers: ["Distributes traffic", "Filters packets", "Caches requests", "Encrypts data"],
        correct: 0
    },
    {
        question: "Difference between TCP and UDP?",
        answers: ["TCP faster, UDP reliable", "TCP connection-oriented, UDP connectionless", "UDP guarantees order", "UDP for web browsing"],
        correct: 1
    },
    {
        question: "What is functional programming?",
        answers: ["Object and class based", "Pure functions and immutability", "Parallel processes", "Logic rules"],
        correct: 1
    },
    {
        question: "What is a zero-day vulnerability?",
        answers: ["Known and patched", "Critical in new software", "Unknown to vendor, no patch", "Affects old systems"],
        correct: 2
    },
    {
        question: "Which consensus algorithm does Bitcoin use?",
        answers: ["Proof of Stake", "Proof of Work", "Byzantine Fault Tolerance", "Raft"],
        correct: 1
    },
    {
        question: "What is MVC pattern?",
        answers: ["Model-View-Controller separation", "Module-View-Component", "Main-View-Controller", "Model-View-Container"],
        correct: 0
    },
    {
        question: "What is virtualization?",
        answers: ["Multiple OS on one hardware", "Virtual applications", "Network simulation", "Memory optimization"],
        correct: 0
    },
    {
        question: "What does NP-complete mean?",
        answers: ["Solvable in polynomial time", "Solution verifiable in polynomial time", "Impossible to solve", "Logarithmic time solvable"],
        correct: 1
    },
    {
        question: "What is microservice architecture?",
        answers: ["Modular monolith", "Small independent services", "Traditional client-server", "Macro services"],
        correct: 1
    }
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

// Event Listeners for all tools
function initializeEventListeners() {
    // Dice events
    if (rollDiceButton) {
        rollDiceButton.addEventListener('click', rollDice);
    }
    if (diceElement) {
        diceElement.addEventListener('click', rollDice);
    }
    
    // Coin events
    if (flipCoinButton) {
        flipCoinButton.addEventListener('click', flipCoin);
    }
    if (coinElement) {
        coinElement.addEventListener('click', flipCoin);
    }
    
    // Quiz events
    if (getQuizButton) {
        getQuizButton.addEventListener('click', getRandomQuiz);
    }
    if (backButton) {
        backButton.addEventListener('click', goBackToHome);
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    goBackToHome(); // Initialize quiz screen
    
    // Debug info
    console.log('🎲 Random Tools App Loaded Successfully!');
    console.log('- Dice elements:', !!diceElement, !!rollDiceButton);
    console.log('- Coin elements:', !!coinElement, !!flipCoinButton);
    console.log('- Quiz elements:', !!getQuizButton, !!backButton);
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}