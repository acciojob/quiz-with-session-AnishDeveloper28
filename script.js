const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: 2 },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 1 },
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit');
const scoreDisplay = document.getElementById('score');

function loadProgress() {
  const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
  questions.forEach((q, idx) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<p>${q.question}</p>`;

    q.options.forEach((option, optIdx) => {
      const optionId = `q${idx}_o${optIdx}`;
      const checked = progress[idx] === optIdx ? 'checked' : '';
      questionDiv.innerHTML += `
        <div class="options">
          <label>
            <input type="radio" name="question${idx}" value="${optIdx}" id="${optionId}" ${checked}>
            ${option}
          </label>
        </div>
      `;
    });

    quizContainer.appendChild(questionDiv);
  });
}

function saveProgress() {
  const progress = {};
  questions.forEach((q, idx) => {
    const selectedOption = document.querySelector(`input[name="question${idx}"]:checked`);
    if (selectedOption) {
      progress[idx] = parseInt(selectedOption.value, 10);
    }
  });
  sessionStorage.setItem('progress', JSON.stringify(progress));
}

function calculateScore() {
  const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
  let score = 0;
  questions.forEach((q, idx) => {
    if (progress[idx] === q.answer) {
      score++;
    }
  });
  return score;
}

function submitQuiz() {
  const score = calculateScore();
  scoreDisplay.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score);
}

loadProgress();

quizContainer.addEventListener('change', saveProgress);
submitButton.addEventListener('click', submitQuiz);
