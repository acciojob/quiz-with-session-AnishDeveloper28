// script.js

const correctAnswers = {
  q1: "a",
  q2: "b",
  q3: "b",
  q4: "a",
  q5: "b",
};

// Restore progress from session storage
document.addEventListener("DOMContentLoaded", () => {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  Object.keys(savedProgress).forEach((key) => {
    const input = document.querySelector(`input[name="${key}"][value="${savedProgress[key]}"]`);
    if (input) input.checked = true;
  });

  const savedScore = localStorage.getItem("score");
  if (savedScore) {
    document.getElementById("score-display").textContent = `Your previous score was: ${savedScore} out of 5.`;
  }
});

// Save progress to session storage
document.querySelectorAll("input[type='radio']").forEach((radio) => {
  radio.addEventListener("change", () => {
    const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    progress[radio.name] = radio.value;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });
});

// Calculate score and save it to local storage
document.getElementById("submit").addEventListener("click", () => {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  Object.keys(correctAnswers).forEach((question) => {
    if (progress[question] === correctAnswers[question]) {
      score++;
    }
  });

  localStorage.setItem("score", score);
  document.getElementById("score-display").textContent = `Your score is: ${score} out of 5.`;
});
