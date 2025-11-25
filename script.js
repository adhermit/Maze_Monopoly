// Quiz Elements
const getQuizButton = document.getElementById('getQuiz');
const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const quizAnswers = document.getElementById('quizAnswers');
const quizResult = document.getElementById('quizResult');
const backButton = document.getElementById('backButton');

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
    quizAnswers.innerHTML = '';
    quizResult.textContent = '';
    quizResult.className = 'quiz-result';
    
    quiz.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'quiz-answer';
        answerElement.textContent = answer;
        answerElement.addEventListener('click', () => checkAnswer(index, quiz.correct));
        quizAnswers.appendChild(answerElement);
    });
}

function checkAnswer(selectedIndex, correctIndex) {
    const answerElements = document.querySelectorAll('.quiz-answer');
    const isCorrect = selectedIndex === correctIndex;
    
    answerElements.forEach((element, index) => {
        element.style.pointerEvents = 'none';
        
        if (index === correctIndex) {
            element.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            element.classList.add('incorrect');
        }
    });
    
    quizResult.textContent = isCorrect ? '✅ Correct!' : '❌ Incorrect!';
    quizResult.className = `quiz-result ${isCorrect ? 'correct' : 'incorrect'}`;
}

function goBackToHome() {
    // Reset quiz state
    quizQuestion.textContent = 'Click "Filter Random Quiz" to get a random computer science question!';
    quizAnswers.innerHTML = '';
    quizResult.textContent = '';
    quizResult.className = 'quiz-result';
    
    // Show filter button and hide back button
    getQuizButton.style.display = 'block';
    backButton.style.display = 'none';
}

// Event Listeners
getQuizButton.addEventListener('click', getRandomQuiz);
backButton.addEventListener('click', goBackToHome);

// Initialize quiz screen
goBackToHome();