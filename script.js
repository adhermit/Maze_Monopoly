// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Dice Elements
const diceElement = document.getElementById('diceElement');
const rollDiceButton = document.getElementById('rollDice');
const diceResult = document.getElementById('diceResult');

// Coin Elements
const coinElement = document.getElementById('coinElement');
const flipCoinButton = document.getElementById('flipCoin');
const coinResult = document.getElementById('coinResult');

// Quiz Elements
const getQuizButton = document.getElementById('getQuiz');
const quizQuestion = document.getElementById('quizQuestion');
const backButtonQuiz = document.getElementById('backButtonQuiz');

// Dares Elements
const getDareButton = document.getElementById('getDare');
const dareQuestion = document.getElementById('dareQuestion');
const backButtonDare = document.getElementById('backButtonDare');

// Mystery Elements
const getMysteryButton = document.getElementById('getMystery');
const mysteryQuestion = document.getElementById('mysteryQuestion');
const backButtonMystery = document.getElementById('backButtonMystery');

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
    }, 500);
}

// Coin Flip Functionality
function flipCoin() {
    // Add flipping animation
    coinElement.classList.add('flipping');
    coinResult.textContent = '';
    
    setTimeout(() => {
        const isHeads = Math.random() < 0.5;
        const result = isHeads ? 'Heads' : 'Tails';
        
        // Rotate coin to show correct side
        coinElement.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';
        coinElement.classList.remove('flipping');
        
        coinResult.textContent = `It's ${result}!`;
    }, 600);
}

// Computer Science Quiz Questions
const computerScienceQuiz = [
    "What is the worst-case time complexity of QuickSort?",
    "Which algorithm finds shortest paths from a single source?",
    "What does SQL injection attack target?",
    "What is overfitting in machine learning?",
    "Which data structure uses LIFO principle?",
    "What phase converts source code to intermediate code?",
    "What is polymorphism in OOP?",
    "What does Big O notation represent?",
    "Which protocol ensures data confidentiality online?",
    "What does ACID guarantee in databases?"
];

// Dares List
const daresList = [
    "Stand up and do the chicken dance for 15 seconds",
    "Go to the front of class and take a dramatic bow",
    "Ask the teacher 'Is this going to be on the test?' seriously",
    "Do 10 star jumps while whispering 'I'm a shining star'",
    "Walk to the trash can and back using only tiptoes",
    "Sing the ABC song backwards (or attempt to!)",
    "Ask to borrow a pen using only hand gestures",
    "Do your best impression of the teacher's walking style",
    "Pretend to be a statue until someone laughs",
    "Write 'I ❤ homework' and hold it up for 10 seconds"
];

// QUIZ FUNCTIONALITY
function getRandomQuiz() {
    // Hide the filter button and show back button
    getQuizButton.style.display = 'none';
    backButtonQuiz.style.display = 'block';
    
    // Get a random question
    const randomIndex = Math.floor(Math.random() * computerScienceQuiz.length);
    const question = computerScienceQuiz[randomIndex];
    
    quizQuestion.textContent = question;
}

function goBackToQuizHome() {
    // Reset quiz state
    quizQuestion.textContent = 'Click "Filter Random Quiz" to get a random computer science question!';
    
    // Show filter button and hide back button
    getQuizButton.style.display = 'block';
    backButtonQuiz.style.display = 'none';
}

// DARES FUNCTIONALITY
function getRandomDare() {
    console.log("Dare button clicked!");
    
    // Hide the filter button and show back button
    getDareButton.style.display = 'none';
    backButtonDare.style.display = 'block';
    
    // Get a random dare
    const randomIndex = Math.floor(Math.random() * daresList.length);
    const dare = daresList[randomIndex];
    
    dareQuestion.textContent = dare;
}

function goBackToDareHome() {
    // Reset dare state
    dareQuestion.textContent = 'Click "Filter Dare" to get a random dare!';
    
    // Show filter button and hide back button
    getDareButton.style.display = 'block';
    backButtonDare.style.display = 'none';
}

// MYSTERY FUNCTIONALITY
function getRandomMystery() {
    console.log("Mystery button clicked!");
    
    // Hide the filter button and show back button
    getMysteryButton.style.display = 'none';
    backButtonMystery.style.display = 'block';
    
    // Randomly choose between quiz question or dare (50/50 chance)
    const isQuiz = Math.random() < 0.5;
    
    if (isQuiz) {
        // Show a random quiz question
        const randomQuizIndex = Math.floor(Math.random() * computerScienceQuiz.length);
        const question = computerScienceQuiz[randomQuizIndex];
        mysteryQuestion.textContent = `QUIZ: ${question}`;
    } else {
        // Show a random dare
        const randomDareIndex = Math.floor(Math.random() * daresList.length);
        const dare = daresList[randomDareIndex];
        mysteryQuestion.textContent = `DARE: ${dare}`;
    }
}

function goBackToMysteryHome() {
    // Reset mystery state
    mysteryQuestion.textContent = 'Click "?" when you reach the mystery box to get a random quiz or dare!';
    
    // Show filter button and hide back button
    getMysteryButton.style.display = 'block';
    backButtonMystery.style.display = 'none';
}

// EVENT LISTENERS
rollDiceButton.addEventListener('click', rollDice);
diceElement.addEventListener('click', rollDice);

flipCoinButton.addEventListener('click', flipCoin);
coinElement.addEventListener('click', flipCoin);

getQuizButton.addEventListener('click', getRandomQuiz);
backButtonQuiz.addEventListener('click', goBackToQuizHome);

getDareButton.addEventListener('click', getRandomDare);
backButtonDare.addEventListener('click', goBackToDareHome);

getMysteryButton.addEventListener('click', getRandomMystery);
backButtonMystery.addEventListener('click', goBackToMysteryHome);

console.log('🎲 Maze Monopoly App Loaded Successfully!');