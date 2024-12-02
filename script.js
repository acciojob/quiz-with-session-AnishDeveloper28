const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correct: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars",
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "J.K. Rowling"],
        correct: "William Shakespeare",
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: "Pacific",
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4",
    },
];

const questionsContainer = document.getElementById("questions-container");
const quizForm = document.getElementById("quiz-form");
const scoreDisplay = document.getElementById("score-display");

const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
    questionsContainer.innerHTML = "";
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionTitle = document.createElement("h2");
        questionTitle.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionTitle);

        q.options.forEach((option) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = option;
            if (progress[`question-${index}`] === option) {
                input.checked = true;
            }

            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
        });

        questionsContainer.appendChild(questionDiv);
    });
}

function saveProgress() {
    const formData = new FormData(quizForm);
    const progress = {};
    for (let [key, value] of formData.entries()) {
        progress[key] = value;
    }
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

function calculateScore() {
    const formData = new FormData(quizForm);
    let score = 0;

    questions.forEach((q, index) => {
        const userAnswer = formData.get(`question-${index}`);
        if (userAnswer === q.correct) {
            score++;
        }
    });

    return score;
}

quizForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveProgress();
    const score = calculateScore();

    scoreDisplay.style.display = "block";
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;

    localStorage.setItem("score", score);
});

renderQuestions();

quizForm.addEventListener("change", saveProgress);
