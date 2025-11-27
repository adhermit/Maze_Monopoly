// Level Selection Elements
const levelSelection = document.getElementById('levelSelection');
const mainGame = document.getElementById('mainGame');
const levelSelectButtons = document.querySelectorAll('.level-select-btn');
const currentLevelSpan = document.getElementById('currentLevel');
const changeLevelButton = document.getElementById('changeLevel');

// Game State
let currentLevel = 'easy';

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
const nextQuestionButton = document.getElementById('nextQuestion');
const quizActions = document.querySelector('.quiz-actions');
const backButtonQuiz = document.getElementById('backButtonQuiz');

// Dares Elements
const getDareButton = document.getElementById('getDare');
const dareQuestion = document.getElementById('dareQuestion');
const backButtonDare = document.getElementById('backButtonDare');

// Mystery Elements
const getMysteryButton = document.getElementById('getMystery');
const mysteryQuestion = document.getElementById('mysteryQuestion');
const mysteryAnswer = document.getElementById('mysteryAnswer');
const showMysteryAnswerButton = document.getElementById('showMysteryAnswer');
const mysteryActions = document.querySelector('.mystery-actions'); 
const backButtonMystery = document.getElementById('backButtonMystery');

// LEVEL SELECTION FUNCTIONALITY
function selectLevel(level) {
    currentLevel = level;
    
    // Update visual selection
    document.querySelectorAll('.level-card').forEach(card => {
        card.classList.remove('easy-selected', 'medium-selected', 'hard-selected');
    });
    
    const selectedCard = document.querySelector(`[data-level="${level}"]`);
    selectedCard.classList.add(`${level}-selected`);
    
    // Update level indicator
    const levelNames = {
        easy: 'Easy',
        medium: 'Medium', 
        hard: 'Hard'
    };
    currentLevelSpan.textContent = `Level: ${levelNames[level]}`;
    
    console.log(`Level selected: ${level}`);
}

function startGame() {
    // Add fade-out animation
    levelSelection.classList.add('fade-out');
    
    setTimeout(() => {
        levelSelection.style.display = 'none';
        mainGame.style.display = 'block';
        
        // Initialize game with selected level
        initializeGameWithLevel();
    }, 500);
}

function showLevelSelection() {
    mainGame.style.display = 'none';
    levelSelection.style.display = 'flex';
    levelSelection.classList.remove('fade-out');
}

function initializeGameWithLevel() {
    console.log(`Initializing game with level: ${currentLevel}`);
    // Update content based on level
    updateContentForLevel();
}

function updateContentForLevel() {
    // You can modify game behavior based on level
    switch(currentLevel) {
        case 'easy':
            // Easier questions, simpler dares
            console.log('Easy mode activated');
            break;
        case 'medium':
            // Medium difficulty
            console.log('Medium mode activated');
            break;
        case 'hard':
            // Hard difficulty - maybe time limits or more complex questions
            console.log('Hard mode activated');
            break;
    }
}

// Level Selection Event Listeners
levelSelectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const level = e.target.getAttribute('data-level');
        selectLevel(level);
        
        // Auto-start game after selection
        setTimeout(startGame, 300);
    });
});

changeLevelButton.addEventListener('click', showLevelSelection);

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

// Computer Science Quiz Questions - Level Based
const computerScienceQuiz = {
    easy: [
        {
            question: "Which data structure uses LIFO (Last-In-First-Out) principle?",
            answer: "Stack - Elements are added and removed from the same end, following LIFO order."
        },
        {
            question: "What is the main purpose of an 'if' statement in programming?",
            answer: "To make decisions and execute different code blocks based on conditions."
        },
        {
            question: "What does HTML stand for?",
            answer: "HyperText Markup Language - it's used to create web pages."
        },
        {
            question: "Which language is known as the 'language of the web'?",
            answer: "JavaScript - it runs in web browsers and makes pages interactive."
        },
        {
            question: "What is a variable in programming?",
            answer: "A container that stores data values that can be used and changed in the program."
        }
    ],
    medium: [
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
            question: "What is polymorphism in Object-Oriented Programming?",
            answer: "The ability of objects of different classes to respond to the same method call in different ways, typically through method overriding."
        },
        {
            question: "What does Big O notation represent?",
            answer: "Algorithm complexity - It describes how the runtime or space requirements of an algorithm grow as the input size increases."
        }
    ],
    hard: [
        {
            question: "Explain the difference between synchronous and asynchronous programming.",
            answer: "Synchronous: Code executes line by line, blocking until each operation completes. Asynchronous: Code can continue executing while waiting for operations to complete, using callbacks, promises, or async/await."
        },
        {
            question: "What is the CAP theorem in distributed systems?",
            answer: "CAP theorem states that a distributed system can only guarantee two of these three properties: Consistency, Availability, and Partition tolerance."
        },
        {
            question: "How does garbage collection work in JavaScript?",
            answer: "JavaScript uses automatic garbage collection with mark-and-sweep algorithm. It marks reachable objects and sweeps away unreachable ones to free memory."
        },
        {
            question: "What is the difference between microtask and macrotask in JavaScript event loop?",
            answer: "Microtasks (Promises, process.nextTick) execute immediately after the current operation, before rendering. Macrotasks (setTimeout, setInterval) execute in the next event loop iteration."
        },
        {
            question: "Explain the concept of 'time complexity' and 'space complexity' with examples.",
            answer: "Time complexity measures how runtime grows with input size (e.g., O(1), O(n), O(n²)). Space complexity measures how memory usage grows with input size. Both help analyze algorithm efficiency."
        }
    ]
};

// Dares List - Level Based (Fixed the typo)
const daresList = {
    easy: [
        "Stand up and do the chicken dance for 15 seconds",
        "Go to the front of class and take a dramatic bow",
        "Do 10 star jumps while whispering 'I'm a shining star'",
        "Walk to the trash can and back using only tiptoes",
        "Sing the ABC song backwards (or attempt to!)",
        "Ask to borrow a pen using only hand gestures",
        "Write 'I ❤ homework' and hold it up for 10 seconds"
    ],
    medium: [
        "Ask the teacher 'Is this going to be on the test?' seriously",
        "Do your best impression of the teacher's walking style",
        "Pretend to be a statue until someone laughs",
        "Tell truth: What's the most embarrassing thing you've done in school?",
        "Tell truth: Who in the group is the most dramatic?",
        "Do 15 pushups right now",
        "Speak in a British accent for the next 3 minutes"
    ],
    hard: [
        "Tell truth: What is a secret you've never told anyone before?",
        "Tell truth: What's one thing you're too shy to admit?",
        "Tell truth: If you had to roast yourself, what would you say?",
        "Call a friend and sing 'Happy Birthday' (even if it's not their birthday)",
        "Let the group choose any embarrassing photo to post on your social media",
        "Do your best impression of the principal for 2 minutes",
        "Exchange shirts with the person on your right for the next 10 minutes"
    ]
};

// Quiz State
let currentQuestionIndex = -1;
let answerRevealed = false;

// Mystery State
let currentMysteryQuizIndex = -1;
let mysteryAnswerRevealed = false;
let currentMysteryType = ''; // 'quiz' or 'dare'

// QUIZ FUNCTIONALITY
function getRandomQuiz() {
    // Hide the filter button and show back button
    getQuizButton.style.display = 'none';
    backButtonQuiz.style.display = 'block';
    quizActions.style.display = 'flex';
    
    // Get questions based on current level
    const currentLevelQuestions = computerScienceQuiz[currentLevel];
    
    // Get a random question and store the index
    currentQuestionIndex = Math.floor(Math.random() * currentLevelQuestions.length);
    const questionData = currentLevelQuestions[currentQuestionIndex];
    
    // Display question and reset answer state
    quizQuestion.textContent = questionData.question;
    quizAnswer.style.display = 'none';
    quizAnswer.textContent = '';
    showAnswerButton.textContent = 'Show Answer';
    showAnswerButton.classList.remove('revealed');
    showAnswerButton.disabled = false;
    answerRevealed = false;
    
    console.log(`Loaded ${currentLevel} question:`, questionData.question);
}

function showAnswer() {
    const currentLevelQuestions = computerScienceQuiz[currentLevel];
    
    if (!answerRevealed && currentQuestionIndex !== -1) {
        const questionData = currentLevelQuestions[currentQuestionIndex];
        quizAnswer.textContent = questionData.answer;
        quizAnswer.style.display = 'block';
        showAnswerButton.textContent = 'Answer Revealed';
        showAnswerButton.classList.add('revealed');
        showAnswerButton.disabled = true;
        answerRevealed = true;
        
        console.log('Answer shown:', questionData.answer);
    } else {
        console.log('Cannot show answer');
    }
}

function nextQuestion() {
    getRandomQuiz();
}

function goBackToQuizHome() {
    // Reset quiz state
    quizQuestion.textContent = `Click "Get Random Quiz" to get a random ${currentLevel} computer science question!`;
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
    
    // Get dares based on current level
    const currentLevelDares = daresList[currentLevel];
    
    // Get a random dare
    const randomIndex = Math.floor(Math.random() * currentLevelDares.length);
    const dare = currentLevelDares[randomIndex];
    
    dareQuestion.textContent = dare;
    console.log(`Loaded ${currentLevel} dare:`, dare);
}

function goBackToDareHome() {
    // Reset dare state
    dareQuestion.textContent = `Click "Get Random Dare" to get a random ${currentLevel} dare!`;
    
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
    
    // Reset mystery state
    mysteryAnswer.style.display = 'none';
    mysteryAnswer.textContent = '';
    showMysteryAnswerButton.style.display = 'none';
    mysteryAnswerRevealed = false;
    
    // Randomly choose between quiz question or dare (50/50 chance)
    const isQuiz = Math.random() < 0.5;
    currentMysteryType = isQuiz ? 'quiz' : 'dare';
    
    if (isQuiz) {
        // Get questions based on current level
        const currentLevelQuestions = computerScienceQuiz[currentLevel];
        
        // Show a random quiz question
        currentMysteryQuizIndex = Math.floor(Math.random() * currentLevelQuestions.length);
        const questionData = currentLevelQuestions[currentMysteryQuizIndex];
        mysteryQuestion.textContent = `QUIZ: ${questionData.question}`;
        
        // Show the "Show Answer" button for quiz
        showMysteryAnswerButton.style.display = 'inline-block';
        showMysteryAnswerButton.textContent = 'Show Answer';
        showMysteryAnswerButton.classList.remove('revealed');
        showMysteryAnswerButton.disabled = false;
        mysteryAnswerRevealed = false;
        
        console.log(`Loaded ${currentLevel} mystery quiz:`, questionData.question);
    } else {
        // Get dares based on current level
        const currentLevelDares = daresList[currentLevel];
        
        // Show a random dare
        const randomDareIndex = Math.floor(Math.random() * currentLevelDares.length);
        const dare = currentLevelDares[randomDareIndex];
        mysteryQuestion.textContent = `DARE: ${dare}`;
        
        // Hide the "Show Answer" button for dares
        showMysteryAnswerButton.style.display = 'none';
        mysteryAnswer.style.display = 'none';
        
        console.log(`Loaded ${currentLevel} mystery dare:`, dare);
    }
}

function showMysteryAnswer() {
    const currentLevelQuestions = computerScienceQuiz[currentLevel];
    
    if (!mysteryAnswerRevealed && currentMysteryType === 'quiz' && currentMysteryQuizIndex !== -1) {
        const questionData = currentLevelQuestions[currentMysteryQuizIndex];
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

// EVENT LISTENERS
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