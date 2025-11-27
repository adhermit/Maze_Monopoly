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
const backButtonMystery = document.getElementById('backButtonMystery');

// Reset Function
function resetGame() {
    console.log('Resetting game...');
    
    // Reset all tabs to default state
    resetQuizTab();
    resetDaresTab();
    resetMysteryTab();
    resetDiceTab();
    resetCoinTab();
    
    // Reset to first tab
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    document.querySelector('[data-tab="dice"]').classList.add('active');
    document.getElementById('dice').classList.add('active');
}

function resetQuizTab() {
    // Reset quiz state
    quizQuestion.textContent = `Click "Get Random Quiz" to get a random ${currentLevel} computer science question!`;
    quizAnswer.style.display = 'none';
    quizAnswer.textContent = '';
    quizActions.style.display = 'none';
    getQuizButton.style.display = 'block';
    backButtonQuiz.style.display = 'none';
    currentQuestionIndex = -1;
    answerRevealed = false;
    
    // Clear any quiz options
    const quizOptions = document.querySelector('.quiz-options');
    if (quizOptions) {
        quizOptions.remove();
    }
}

function resetDaresTab() {
    // Reset dares state
    dareQuestion.textContent = `Click "Get Random Dare" to get a random ${currentLevel} dare!`;
    getDareButton.style.display = 'block';
    backButtonDare.style.display = 'none';
}

function resetMysteryTab() {
    // Reset mystery state
    mysteryQuestion.textContent = 'Click "?" when you reach the mystery box to get a random quiz or dare!';
    mysteryAnswer.style.display = 'none';
    mysteryAnswer.textContent = '';
    showMysteryAnswerButton.style.display = 'none';
    getMysteryButton.style.display = 'block';
    backButtonMystery.style.display = 'none';
    currentMysteryQuizIndex = -1;
    mysteryAnswerRevealed = false;
    currentMysteryType = '';
}

function resetDiceTab() {
    // Reset dice state
    diceResult.textContent = '';
    diceElement.innerHTML = '<div class="face">⚀</div>';
    diceElement.classList.remove('rolling');
}

function resetCoinTab() {
    // Reset coin state
    coinResult.textContent = '';
    coinElement.style.transform = 'rotateY(0deg)';
    coinElement.classList.remove('flipping');
    
    // Remove any quiz/dare time buttons
    const quizDareButton = document.querySelector('.quiz-dare-time-btn');
    if (quizDareButton) {
        quizDareButton.remove();
    }
}

// LEVEL SELECTION FUNCTIONALITY
function selectLevel(level) {
    console.log('selectLevel called with:', level);
    currentLevel = level;
    
    // Update visual selection
    document.querySelectorAll('.level-card').forEach(card => {
        card.classList.remove('easy-selected', 'medium-selected', 'hard-selected');
    });
    
    const selectedCard = document.querySelector(`[data-level="${level}"]`);
    if (selectedCard) {
        selectedCard.classList.add(`${level}-selected`);
    }
    
    // Update level indicator
    const levelNames = {
        easy: 'Easy',
        medium: 'Medium', 
        hard: 'Hard'
    };
    if (currentLevelSpan) {
        currentLevelSpan.textContent = `Level: ${levelNames[level]}`;
    }
    
    // Reset the game when level changes
    resetGame();
}

function startGame() {
    console.log('startGame called');
    if (levelSelection && mainGame) {
        // Add fade-out animation
        levelSelection.classList.add('fade-out');
        
        setTimeout(() => {
            levelSelection.style.display = 'none';
            mainGame.style.display = 'block';
            
            // Initialize game with selected level
            initializeGameWithLevel();
        }, 500);
    }
}

function showLevelSelection() {
    console.log('showLevelSelection called');
    if (mainGame && levelSelection) {
        mainGame.style.display = 'none';
        levelSelection.style.display = 'flex';
        levelSelection.classList.remove('fade-out');
        
        // Reset game when going back to level selection
        resetGame();
    }
}

function initializeGameWithLevel() {
    console.log(`Game initialized with level: ${currentLevel}`);
    // Update content based on level
    updateContentForLevel();
}

function updateContentForLevel() {
    // Update all text content to reflect current level
    quizQuestion.textContent = `Click "Get Random Quiz" to get a random ${currentLevel} computer science question!`;
    dareQuestion.textContent = `Click "Get Random Dare" to get a random ${currentLevel} dare!`;
    
    // You can modify game behavior based on level
    switch(currentLevel) {
        case 'easy':
            console.log('Easy mode activated');
            break;
        case 'medium':
            console.log('Medium mode activated');
            break;
        case 'hard':
            console.log('Hard mode activated');
            break;
    }
}

// Level Selection Event Listeners
console.log('Setting up level selection listeners...');
levelSelectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log('Level button clicked!');
        const level = e.target.getAttribute('data-level');
        console.log('Selected level:', level);
        
        if (level) {
            selectLevel(level);
            // Auto-start game after selection
            setTimeout(startGame, 300);
        }
    });
});

if (changeLevelButton) {
    changeLevelButton.addEventListener('click', showLevelSelection);
}

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

// COIN FLIP FUNCTIONALITY WITH QUIZ/DARE TIME
function flipCoin() {
    // Add flipping animation
    coinElement.classList.add('flipping');
    coinResult.textContent = '';
    
    // Remove any existing quiz/dare time buttons
    const existingButton = document.querySelector('.quiz-dare-time-btn');
    if (existingButton) {
        existingButton.remove();
    }
    
    setTimeout(() => {
        const isHeads = Math.random() < 0.5;
        const result = isHeads ? 'Heads' : 'Tails';
        
        // Rotate coin to show correct side
        coinElement.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';
        coinElement.classList.remove('flipping');
        
        coinResult.textContent = `It's ${result}!`;
        
        // Show Quiz Time or Dare Time button based on result
        showQuizOrDareButton(isHeads);
    }, 600);
}

function showQuizOrDareButton(isHeads) {
    // Remove any existing button first
    const existingButton = document.querySelector('.quiz-dare-time-btn');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Create the button
    const button = document.createElement('button');
    button.className = 'quiz-dare-time-btn action-button';
    
    if (isHeads) {
        button.textContent = '🎯 Quiz Time!';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.addEventListener('click', showRandomQuizFromCoin);
    } else {
        button.textContent = '🎭 Dare Time!';
        button.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        button.addEventListener('click', showRandomDareFromCoin);
    }
    
    // Add the button after the coin result
    coinResult.parentNode.insertBefore(button, coinResult.nextSibling);
}

function showRandomQuizFromCoin() {
    // Switch to quiz tab
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="quiz"]').classList.add('active');
    
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById('quiz').classList.add('active');
    
    // Get and display a random quiz
    getRandomQuiz();
    
    // Remove the quiz/dare time button
    const quizDareButton = document.querySelector('.quiz-dare-time-btn');
    if (quizDareButton) {
        quizDareButton.remove();
    }
}

function showRandomDareFromCoin() {
    // Switch to dares tab
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="dares"]').classList.add('active');
    
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById('dares').classList.add('active');
    
    // Get and display a random dare
    getRandomDare();
    
    // Remove the quiz/dare time button
    const quizDareButton = document.querySelector('.quiz-dare-time-btn');
    if (quizDareButton) {
        quizDareButton.remove();
    }
}

// Computer Science Quiz Questions - Level Based
const computerScienceQuiz = {
    easy: [
        {
            question: "Which data structure uses LIFO (Last-In-First-Out) principle?",
            options: [
                "A) Queue",
                "B) Stack", 
                "C) Array",
                "D) Linked List"
            ],
            answer: "B) Stack",
            explanation: "Stack - Elements are added and removed from the same end, following LIFO order."
        },
        {
            question: "What is the main purpose of an 'if' statement in programming?",
            options: [
                "A) To repeat code multiple times",
                "B) To store data values",
                "C) To make decisions based on conditions",
                "D) To define functions"
            ],
            answer: "C) To make decisions based on conditions",
            explanation: "To make decisions and execute different code blocks based on conditions."
        },
        {
            question: "What does HTML stand for?",
            options: [
                "A) Hyper Transfer Markup Language",
                "B) High Tech Modern Language",
                "C) HyperText Markup Language",
                "D) Home Tool Markup Language"
            ],
            answer: "C) HyperText Markup Language",
            explanation: "HyperText Markup Language - it's used to create web pages."
        },
        {
            question: "Which language is known as the 'language of the web'?",
            options: [
                "A) Python",
                "B) Java",
                "C) C++",
                "D) JavaScript"
            ],
            answer: "D) JavaScript",
            explanation: "JavaScript - it runs in web browsers and makes pages interactive."
        },
        {
            question: "What is a variable in programming?",
            options: [
                "A) A mathematical equation",
                "B) A container that stores data values",
                "C) A type of function",
                "D) A programming language"
            ],
            answer: "B) A container that stores data values",
            explanation: "A container that stores data values that can be used and changed in the program."
        },
        {
            question: "What does CSS stand for?",
            options: [
                "A) Computer Style Sheets",
                "B) Creative Style System",
                "C) Cascading Style Sheets",
                "D) Colorful Style Sheets"
            ],
            answer: "C) Cascading Style Sheets",
            explanation: "CSS is used to style and layout web pages."
        },
        {
            question: "Which of these is a programming loop?",
            options: [
                "A) if-else",
                "B) switch-case",
                "C) for",
                "D) try-catch"
            ],
            answer: "C) for",
            explanation: "A for loop repeats a block of code multiple times."
        }
    ],
    medium: [
        {
            question: "What is the worst-case time complexity of QuickSort?",
            options: [
                "A) O(n log n)",
                "B) O(n)",
                "C) O(n²)",
                "D) O(log n)"
            ],
            answer: "C) O(n²)",
            explanation: "O(n²) - This occurs when the pivot is always the smallest or largest element, creating highly unbalanced partitions."
        },
        {
            question: "Which algorithm finds shortest paths from a single source in a weighted graph?",
            options: [
                "A) Breadth-First Search",
                "B) Depth-First Search",
                "C) Dijkstra's Algorithm",
                "D) Binary Search"
            ],
            answer: "C) Dijkstra's Algorithm",
            explanation: "Dijkstra's Algorithm - It finds the shortest path from a single source to all other vertices in a graph with non-negative weights."
        },
        {
            question: "What does SQL injection attack target?",
            options: [
                "A) User interface",
                "B) Database vulnerabilities",
                "C) Network connections",
                "D) File systems"
            ],
            answer: "B) Database vulnerabilities",
            explanation: "Database vulnerabilities - SQL injection exploits unsanitized user input to execute malicious SQL commands on the database."
        },
        {
            question: "What is polymorphism in Object-Oriented Programming?",
            options: [
                "A) Hiding implementation details",
                "B) Creating multiple instances",
                "C) Objects of different classes responding to same method differently",
                "D) Inheriting properties from parent class"
            ],
            answer: "C) Objects of different classes responding to same method differently",
            explanation: "The ability of objects of different classes to respond to the same method call in different ways, typically through method overriding."
        },
        {
            question: "What does Big O notation represent?",
            options: [
                "A) Code readability",
                "B) Algorithm complexity",
                "C) Memory size",
                "D) Program speed"
            ],
            answer: "B) Algorithm complexity",
            explanation: "Algorithm complexity - It describes how the runtime or space requirements of an algorithm grow as the input size increases."
        },
        {
            question: "Which data structure uses FIFO (First-In-First-Out) principle?",
            options: [
                "A) Stack",
                "B) Queue",
                "C) Tree",
                "D) Graph"
            ],
            answer: "B) Queue",
            explanation: "Queue follows FIFO principle where the first element added is the first one to be removed."
        },
        {
            question: "What is the time complexity of binary search?",
            options: [
                "A) O(n)",
                "B) O(n²)",
                "C) O(log n)",
                "D) O(1)"
            ],
            answer: "C) O(log n)",
            explanation: "Binary search has O(log n) time complexity as it divides the search space in half each time."
        }
    ],
    hard: [
        {
            question: "What is the main difference between synchronous and asynchronous programming?",
            options: [
                "A) Synchronous is faster than asynchronous",
                "B) Asynchronous blocks execution, synchronous doesn't",
                "C) Synchronous executes line by line, asynchronous doesn't block",
                "D) Asynchronous only works with JavaScript"
            ],
            answer: "C) Synchronous executes line by line, asynchronous doesn't block",
            explanation: "Synchronous: Code executes line by line, blocking until each operation completes. Asynchronous: Code can continue executing while waiting for operations to complete, using callbacks, promises, or async/await."
        },
        {
            question: "What is the CAP theorem in distributed systems?",
            options: [
                "A) A system can have all three: Consistency, Availability, Partition tolerance",
                "B) A system can only guarantee two of: Consistency, Availability, Partition tolerance",
                "C) A system must choose between Consistency and Availability only",
                "D) A system always maintains Partition tolerance"
            ],
            answer: "B) A system can only guarantee two of: Consistency, Availability, Partition tolerance",
            explanation: "CAP theorem states that a distributed system can only guarantee two of these three properties: Consistency, Availability, and Partition tolerance."
        },
        {
            question: "How does garbage collection work in JavaScript?",
            options: [
                "A) Manual memory management by programmer",
                "B) Automatic using reference counting only",
                "C) Automatic using mark-and-sweep algorithm",
                "D) No garbage collection in JavaScript"
            ],
            answer: "C) Automatic using mark-and-sweep algorithm",
            explanation: "JavaScript uses automatic garbage collection with mark-and-sweep algorithm. It marks reachable objects and sweeps away unreachable ones to free memory."
        },
        {
            question: "What is the difference between microtask and macrotask in JavaScript event loop?",
            options: [
                "A) Microtasks execute after macrotasks",
                "B) Macrotasks execute immediately, microtasks wait",
                "C) Microtasks execute before rendering, macrotasks after",
                "D) There is no difference"
            ],
            answer: "C) Microtasks execute before rendering, macrotasks after",
            explanation: "Microtasks (Promises, process.nextTick) execute immediately after the current operation, before rendering. Macrotasks (setTimeout, setInterval) execute in the next event loop iteration."
        },
        {
            question: "What do 'time complexity' and 'space complexity' measure?",
            options: [
                "A) Code quality and readability",
                "B) Runtime growth and memory usage growth with input size",
                "C) Program size and execution speed",
                "D) Algorithm popularity and usage"
            ],
            answer: "B) Runtime growth and memory usage growth with input size",
            explanation: "Time complexity measures how runtime grows with input size (e.g., O(1), O(n), O(n²)). Space complexity measures how memory usage grows with input size. Both help analyze algorithm efficiency."
        },
        {
            question: "Which sorting algorithm has the best worst-case time complexity?",
            options: [
                "A) Bubble Sort - O(n²)",
                "B) Quick Sort - O(n²)",
                "C) Merge Sort - O(n log n)",
                "D) Insertion Sort - O(n²)"
            ],
            answer: "C) Merge Sort - O(n log n)",
            explanation: "Merge Sort maintains O(n log n) time complexity in all cases (best, average, and worst)."
        },
        {
            question: "What is the purpose of a B-tree data structure?",
            options: [
                "A) Fast searching in memory",
                "B) Efficient storage and retrieval on disks",
                "C) Simple key-value storage",
                "D) Graphical data representation"
            ],
            answer: "B) Efficient storage and retrieval on disks",
            explanation: "B-trees are optimized for systems that read and write large blocks of data, commonly used in databases and file systems."
        }
    ]
};

// Dares List - Level Based
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

// QUIZ FUNCTIONALITY FOR MCQs
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
    
    // Display question and options
    let questionHTML = `
        <div class="quiz-question">${questionData.question}</div>
        <div class="quiz-options">
    `;
    
    questionData.options.forEach(option => {
        questionHTML += `<div class="quiz-option">${option}</div>`;
    });
    
    questionHTML += `</div>`;
    
    quizQuestion.innerHTML = questionHTML;
    quizAnswer.style.display = 'none';
    quizAnswer.textContent = '';
    showAnswerButton.textContent = 'Show Answer';
    showAnswerButton.classList.remove('revealed');
    showAnswerButton.disabled = false;
    answerRevealed = false;
    
    // Add click listeners to options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selections
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });
            
            // Mark this option as selected
            this.classList.add('selected');
        });
    });
}

function showAnswer() {
    const currentLevelQuestions = computerScienceQuiz[currentLevel];
    
    if (!answerRevealed && currentQuestionIndex !== -1) {
        const questionData = currentLevelQuestions[currentQuestionIndex];
        
        // Mark correct and incorrect answers
        document.querySelectorAll('.quiz-option').forEach(option => {
            if (option.textContent === questionData.answer) {
                option.classList.add('correct');
            } else if (option.classList.contains('selected')) {
                option.classList.add('incorrect');
            }
        });
        
        // Show explanation
        quizAnswer.innerHTML = `
            <strong>Correct Answer:</strong> ${questionData.answer}<br><br>
            <strong>Explanation:</strong> ${questionData.explanation}
        `;
        quizAnswer.style.display = 'block';
        showAnswerButton.textContent = 'Answer Revealed';
        showAnswerButton.classList.add('revealed');
        showAnswerButton.disabled = true;
        answerRevealed = true;
    }
}

function goBackToQuizHome() {
    // Reset quiz state
    quizQuestion.textContent = `Click "Get Random Quiz" to get a random ${currentLevel} computer science question!`;
    quizAnswer.style.display = 'none';
    quizAnswer.textContent = '';
    quizActions.style.display = 'none';
    
    // Show filter button and hide back button
    getQuizButton.style.display = 'block';
    backButtonQuiz.style.display = 'none';
    
    currentQuestionIndex = -1;
    answerRevealed = false;
    
    // Clear any quiz options
    const quizOptions = document.querySelector('.quiz-options');
    if (quizOptions) {
        quizOptions.remove();
    }
}

// DARES FUNCTIONALITY
function getRandomDare() {
    // Hide the filter button and show back button
    getDareButton.style.display = 'none';
    backButtonDare.style.display = 'block';
    
    // Get dares based on current level
    const currentLevelDares = daresList[currentLevel];
    
    // Get a random dare
    const randomIndex = Math.floor(Math.random() * currentLevelDares.length);
    const dare = currentLevelDares[randomIndex];
    
    dareQuestion.textContent = dare;
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
    }
}

function showMysteryAnswer() {
    const currentLevelQuestions = computerScienceQuiz[currentLevel];
    
    if (!mysteryAnswerRevealed && currentMysteryType === 'quiz' && currentMysteryQuizIndex !== -1) {
        const questionData = currentLevelQuestions[currentMysteryQuizIndex];
        mysteryAnswer.innerHTML = `
            <strong>Correct Answer:</strong> ${questionData.answer}<br><br>
            <strong>Explanation:</strong> ${questionData.explanation}
        `;
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
backButtonQuiz.addEventListener('click', goBackToQuizHome);

getDareButton.addEventListener('click', getRandomDare);
backButtonDare.addEventListener('click', goBackToDareHome);

getMysteryButton.addEventListener('click', getRandomMystery);
showMysteryAnswerButton.addEventListener('click', showMysteryAnswer);
backButtonMystery.addEventListener('click', goBackToMysteryHome);

console.log('🎲 Maze Monopoly App Loaded Successfully!');