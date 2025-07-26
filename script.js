let difficulty = "medium";

const quizData = [
  {
    question: "What is HTML?",
    options: ["Markup language", "Programming language", "Database"],
    answer: "Markup language",
    difficulty: "easy",
    image: "html.png"
  },
  {
    question: "Which one is a JavaScript framework?",
    options: ["React", "Laravel", "Django"],
    answer: "React",
    difficulty: "medium",
    image: "react.png"
  },
  {
    question: "What does REST stand for?",
    options: ["Representational State Transfer", "Ready Engine Syntax", "Random Event Style"],
    answer: "Representational State Transfer",
    difficulty: "hard",
    image: "rest.png"
  }
];

let questions = [];
let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const imageEl = document.getElementById("imageContainer");

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function setDifficulty() {
  difficulty = document.getElementById("difficulty").value;
  startQuiz();
}

function startQuiz() {
  questions = shuffle(quizData.filter(q => q.difficulty === difficulty));
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 10;
  startTimer();

  const data = questions[currentQuestion];
  questionEl.textContent = data.question;
  optionsEl.innerHTML = "";
  resultEl.textContent = "";
  imageEl.innerHTML = data.image ? `<img src="${data.image}" alt="image" />` : "";

  data.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, option);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(button, selectedOption) {
  clearInterval(timerInterval);
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selectedOption) {
      btn.classList.add("wrong");
    }
  });

  if (selectedOption === correct) {
    correctSound.play();
    score++;
    resultEl.textContent = "✔️ Correct!";
  } else {
    wrongSound.play();
    resultEl.textContent = "❌ Wrong!";
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  clearInterval(timerInterval);
  questionEl.textContent = "🎉 Quiz Completed!";
  optionsEl.innerHTML = "";
  resultEl.innerHTML = `Your score: <strong>${score} / ${questions.length}</strong>`;
  nextBtn.style.display = "none";
}

function startTimer() {
  timerEl.textContent = `⏱️ ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱️ ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      checkAnswer({}, "");
    }
  }, 1000);
}

startQuiz();
