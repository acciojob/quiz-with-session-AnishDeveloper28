const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "Which is a programming language?", options: ["HTML", "CSS", "JavaScript", "Bootstrap"], answer: "JavaScript" },
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], answer: "Cascading Style Sheets" },
 ];

const questionsContainer = document.getElementById("questions-container");
const quizForm = document.getElementById("quiz-form");
const submitBtn = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score-display");

// Load Questions and Preserve Progress
function loadQuestions() {
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.options.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = option;

      if (sessionStorage.getItem(`question-${index}`) === option) {
        input.checked = true;
      }

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
    });

    questionsContainer.appendChild(questionDiv);
  });
}

quizForm.addEventListener("change", (e) => {
  const { name, value } = e.target;
  sessionStorage.setItem(name, value);
});

submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    const selectedOption = sessionStorage.getItem(`question-${index}`);
    if (selectedOption === q.answer) {
      score++;
    }
  });

  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  scoreContainer.classList.remove("hidden");

  localStorage.setItem("score", score);
});

loadQuestions();
