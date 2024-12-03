const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ''; // Clear previous questions
  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", question-${i});
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    });
    
    questionsElement.appendChild(questionElement);
  });
}

function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  return score;
}

function displayScore(score) {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = Your score is ${score} out of 5.;
  localStorage.setItem("score", score); // Store the score in localStorage
}

document.getElementById("submit").addEventListener("click", () => {
  const score = calculateScore();
  displayScore(score);
});

renderQuestions();