// quiz.js

let quizData = []; // This will store the data fetched from JSON
let currentQuestionIndex = 0;
const userAnswers = new Map();

const questionArea = document.getElementById('question-area');
const loadingMessage = document.getElementById('loading-message');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const qNumberSpan = document.getElementById('q-number');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-container');
const scoreText = document.getElementById('score-text');

// --- Data Loading Function ---

async function loadQuizData() {
    try {
        const response = await fetch('quiz_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        quizData = await response.json();
        
        // Hide loading message, show quiz area, and start the quiz
        loadingMessage.style.display = 'none';
        questionArea.style.display = 'block';
        loadQuestion();

    } catch (error) {
        console.error("Could not load quiz data:", error);
        loadingMessage.textContent = "Error loading quiz data. Please check the 'quiz_data.json' file and ensure a local server is running if needed.";
    }
}

// --- Core Quiz Functions ---

function loadQuestion() {
    if (quizData.length === 0 || currentQuestionIndex >= quizData.length) {
        return;
    }

    const totalQuestions = quizData.length;
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Update question number text
    qNumberSpan.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

    // Update question text
    questionTextElement.innerHTML = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    // Create option buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.dataset.option = option;
        
        // Highlight selection if the question was already answered
        if (userAnswers.get(currentQuestionIndex) === option) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => selectOption(option, button));
        optionsContainer.appendChild(button);
    });

    // Update control button visibility
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === totalQuestions - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function selectOption(selectedOption, button) {
    // 1. Save the user's choice
    userAnswers.set(currentQuestionIndex, selectedOption);
    
    // 2. Visually update the selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
}

function calculateScore() {
    let score = 0;
    quizData.forEach((item, index) => {
        const selectedAnswer = userAnswers.get(index);
        if (selectedAnswer === item.answer) {
            score++;
        }
    });
    return score;
}

function showResults() {
    const finalScore = calculateScore();
    const totalQuestions = quizData.length;
    
    questionArea.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreText.textContent = `You scored ${finalScore} out of ${totalQuestions} (${((finalScore / totalQuestions) * 100).toFixed(1)}%).`;
}

// --- Event Listeners ---

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    // Check if all questions are answered before submitting
    if (userAnswers.size < quizData.length) {
        if (!confirm(`You have only answered ${userAnswers.size} of ${quizData.length} questions. Are you sure you want to submit?`)) {
            return;
        }
    }
    showResults();
});

// Start the process by loading the data
loadQuizData();
