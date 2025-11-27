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
const quizAnswer = document.getElementById('quizAnswer');
const showAnswerButton = document.getElementById('showAnswer');
const nextQuestionButton = document.getElementById('nextQuestion'); // Make sure this exists in HTML
const quizActions = document.querySelector('.quiz-actions');
const backButtonQuiz = document.getElementById('backButtonQuiz');

// Dares Elements
const getDareButton = document.getElementById('getDare');
const dareQuestion = document.getElementById('dareQuestion');
const backButtonDare = document.getElementById('backButtonDare');

// Mystery Elements
const getMysteryButton = document.getElementById('getMystery');
const mysteryQuestion = document.getElementById('mysteryQuestion');
const mysteryAnswer = document.getElementById('mysteryAnswer'); // Add this to HTML
const showMysteryAnswerButton = document.getElementById('showMysteryAnswer'); // Add this to HTML
const mysteryActions = document.querySelector('.mystery-actions'); 
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
    {
        question: "What is the worst-case time complexity of QuickSort?",
        answer: "O(n²) - This occurs when the pivot is always the smallest or largest element, creating highly unbalanced partitions."
    },
    {
        question: "Which algorithm finds shortest paths from a single source in a weighted graph?",
        answer: "Dijkstra's Algorithm - It finds the shortest path from a single source to all other vertices in a graph with non-negative weights."
    },
    {
        question: "What does SQL injection attack target?",
        answer: "Database vulnerabilities - SQL injection exploits unsanitized user input to execute malicious SQL commands on the database."
    },
    {
        question: "What is overfitting in machine learning?",
        answer: "When a model learns the training data too well, including noise and outliers, resulting in poor performance on new, unseen data."
    },
    {
        question: "Which data structure uses LIFO (Last-In-First-Out) principle?",
        answer: "Stack - Elements are added and removed from the same end, following LIFO order."
    },
    {
        question: "What is polymorphism in Object-Oriented Programming?",
        answer: "The ability of objects of different classes to respond to the same method call in different ways, typically through method overriding."
    },
    {
        question: "What does Big O notation represent?",
        answer: "Algorithm complexity - It describes how the runtime or space requirements of an algorithm grow as the input size increases."
    },
    {
        question: "Which protocol ensures data confidentiality and security online?",
        answer: "HTTPS (HTTP Secure) - It uses SSL/TLS encryption to protect data transmitted between client and server."
    },
    {
        question: "What does ACID guarantee in databases?",
        answer: "Atomicity, Consistency, Isolation, Durability - These properties ensure reliable transaction processing in database systems."
    },
    {
        question: "What is a binary search tree?",
        answer: "A tree data structure where each node has at most two children, and for any node, all left descendants are smaller and all right descendants are larger."
    },
    {
        question: "What is the difference between TCP and UDP?",
        answer: "TCP is connection-oriented, reliable, and ensures ordered delivery. UDP is connectionless, unreliable, but faster with less overhead."
    },
    {
        question: "What is recursion in programming?",
        answer: "A technique where a function calls itself directly or indirectly to solve a problem by breaking it down into smaller subproblems."
    }
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
    "Write 'I ❤ homework' and hold it up for 10 seconds",
    "Tell truth: What’s the most embarrassing thing you’ve done in school?",
    "Tell truth: What is a secret you’ve never told anyone before?",
    "Tell truth: What’s one thing you’re too shy to admit?",
    "Tell truth: Who in the group is the most dramatic?",
    "Tell tuth: If you had to roast yourself, what would you say?",
];

// Quiz State
let currentQuestionIndex = -1;
let answerRevealed = false;

// Mystery State
let currentMysteryQuizIndex = -1;
let mysteryAnswerRevealed = false;
let currentMysteryType = ''; // 'quiz' or 'dare'

// QUIZ FUNCTIONALITY - COMPLETELY FIXED
function getRandomQuiz() {
    // Hide the filter button and show back button
    getQuizButton.style.display = 'none';
    backButtonQuiz.style.display = 'block';
    quizActions.style.display = 'flex';
    
    // Get a random question and store the index
    currentQuestionIndex = Math.floor(Math.random() * computerScienceQuiz.length);
    const questionData = computerScienceQuiz[currentQuestionIndex];
    
    // Display question and reset answer state
    quizQuestion.textContent = questionData.question;
    quizAnswer.style.display = 'none';
    quizAnswer.textContent = '';
    showAnswerButton.textContent = 'Show Answer';
    showAnswerButton.classList.remove('revealed');
    showAnswerButton.disabled = false;
    answerRevealed = false;
    
    console.log('Loaded question:', questionData.question); // Debug
}

function showAnswer() {
    console.log('Show Answer clicked. Current index:', currentQuestionIndex, 'Answer revealed:', answerRevealed); // Debug
    
    if (!answerRevealed && currentQuestionIndex !== -1) {
        const questionData = computerScienceQuiz[currentQuestionIndex];
        quizAnswer.textContent = questionData.answer;
        quizAnswer.style.display = 'block';
        showAnswerButton.textContent = 'Answer Revealed';
        showAnswerButton.classList.add('revealed');
        showAnswerButton.disabled = true;
        answerRevealed = true;
        
        console.log('Answer shown:', questionData.answer); // Debug
    } else {
        console.log('Cannot show answer'); // Debug
    }
}

function nextQuestion() {
    getRandomQuiz();
}

function goBackToQuizHome() {
    // Reset quiz state
    quizQuestion.textContent = 'Click "Get Random Quiz" to get a random computer science question!';
    quizAnswer.style.display = 'none';
    quizActions.style.display = 'none';
    
    // Show filter button and hide back button
    getQuizButton.style.display = 'block';
    backButtonQuiz.style.display = 'none';
    
    currentQuestionIndex = -1;
    answerRevealed = false;
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
    dareQuestion.textContent = 'Click "Get Random Dare" to get a random dare!';
    
    // Show filter button and hide back button
    getDareButton.style.display = 'block';
    backButtonDare.style.display = 'none';
}

// MYSTERY FUNCTIONALITY - FIXED
function getRandomMystery() {
    console.log("Mystery button clicked!");
    
    // Hide the filter button and show back button
    getMysteryButton.style.display = 'none';
    backButtonMystery.style.display = 'block';
    
    // Reset mystery state
    mysteryAnswer.style.display = 'none';
    mysteryAnswer.textContent = '';
    showMysteryAnswerButton.style.display = 'none';
    mysteryAnswerRevealed = false;
    
    // Randomly choose between quiz question or dare (50/50 chance)
    const isQuiz = Math.random() < 0.5;
    currentMysteryType = isQuiz ? 'quiz' : 'dare';
    
    if (isQuiz) {
         // Show a random quiz question
        currentMysteryQuizIndex = Math.floor(Math.random() * computerScienceQuiz.length);
        const questionData = computerScienceQuiz[currentMysteryQuizIndex];
        mysteryQuestion.textContent = `QUIZ: ${questionData.question}`;
        
        // Show the "Show Answer" button for quiz
        showMysteryAnswerButton.style.display = 'inline-block';
        showMysteryAnswerButton.textContent = 'Show Answer';
        showMysteryAnswerButton.classList.remove('revealed');
        showMysteryAnswerButton.disabled = false;
        mysteryAnswerRevealed = false;
    } else {
        // Show a random dare
        const randomDareIndex = Math.floor(Math.random() * daresList.length);
        const dare = daresList[randomDareIndex];
        mysteryQuestion.textContent = `DARE: ${dare}`;
        
        // Hide the "Show Answer" button for dares
        showMysteryAnswerButton.style.display = 'none';
        mysteryAnswer.style.display = 'none';
    }
}

function showMysteryAnswer() {
    if (!mysteryAnswerRevealed && currentMysteryType === 'quiz' && currentMysteryQuizIndex !== -1) {
        const questionData = computerScienceQuiz[currentMysteryQuizIndex];
        mysteryAnswer.textContent = questionData.answer;
        mysteryAnswer.style.display = 'block';
        showMysteryAnswerButton.textContent = 'Answer Revealed';
        showMysteryAnswerButton.classList.add('revealed');
        showMysteryAnswerButton.disabled = true;
        mysteryAnswerRevealed = true;
    }
}

function goBackToMysteryHome() {
    // Reset mystery state
    mysteryQuestion.textContent = 'Click "?" when you reach the mystery box to get a random quiz or dare!';
    mysteryAnswer.style.display = 'none';
    showMysteryAnswerButton.style.display = 'none';
    
    // Show filter button and hide back button
    getMysteryButton.style.display = 'block';
    backButtonMystery.style.display = 'none';
    
    currentMysteryQuizIndex = -1;
    mysteryAnswerRevealed = false;
    currentMysteryType = '';
}

// EVENT LISTENERS - ADDED NEXT QUESTION
rollDiceButton.addEventListener('click', rollDice);
diceElement.addEventListener('click', rollDice);

flipCoinButton.addEventListener('click', flipCoin);
coinElement.addEventListener('click', flipCoin);

getQuizButton.addEventListener('click', getRandomQuiz);
showAnswerButton.addEventListener('click', showAnswer);
if (nextQuestionButton) {
    nextQuestionButton.addEventListener('click', nextQuestion);
}
backButtonQuiz.addEventListener('click', goBackToQuizHome);

getDareButton.addEventListener('click', getRandomDare);
backButtonDare.addEventListener('click', goBackToDareHome);

getMysteryButton.addEventListener('click', getRandomMystery);
showMysteryAnswerButton.addEventListener('click', showMysteryAnswer);
backButtonMystery.addEventListener('click', goBackToMysteryHome);

console.log('🎲 Maze Monopoly App Loaded Successfully!');