//Dom Elements
const startScreen = document.getElementById('startScreen');
const quizscreen = document.getElementById('quiz-screen');
const reslutScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const quetionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const progressBar = document.getElementById('progress');

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'London', correct: false },
      { text: 'Berlin', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Madrid', correct: false },
    ],
  },
  {
    question: 'which planet is known as the Red Planet',
    answers: [
      { text: 'Venus', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Saturn', correct: false },
    ],
  },
  {
    question: 'Who is the american singer',
    answers: [
      { text: 'Tarkan', correct: false },
      { text: 'Mcdonals', correct: false },
      { text: '50cent', correct: true },
      { text: 'Homay', correct: false },
    ],
  },
  {
    question: 'Who is the american singer',
    answers: [
      { text: 'Tarkan', correct: false },
      { text: 'Mcdonals', correct: false },
      { text: '50cent', correct: true },
      { text: 'Homay', correct: false },
    ],
  },
  {
    question: 'Who is the american singer',
    answers: [
      { text: 'Tarkan', correct: false },
      { text: 'Mcdonals', correct: false },
      { text: '50cent', correct: true },
      { text: 'Homay', correct: false },
    ],
  },
];

//Quiz State wars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  startScreen.classList.remove('active');
  quizscreen.classList.add('active');

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + '%';

  quetionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = '';

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    // what is the dataset?
    button.dataset.correct = answer.correct;

    button.addEventListener('click', selectAnsewr);

    answersContainer.appendChild(button);
  });
}

function selectAnsewr(event) {
  //optimization check
  if (answersDisabled) return;

  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  // todo: explain this a sec
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else if (button === selectedButton) {
      button.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more quiestions or if this quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizscreen.classList.remove('active');
  reslutScreen.classList.add('active');

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = 'Great job! You know your stuff!';
  } else if (percentage >= 60) {
    resultMessage.textContent = 'Good efford! Keep learning!';
  } else if (percentage >= 40) {
    resultMessage.textContent = 'Not bad! Try again to improve!';
  } else {
    resultMessage.textContent = "What's wrong whith you?!";
  }
}

function restartQuiz() {
  // reslutScreen.classList.remove('active');

  // startQuiz();
  window.location.reload();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + '%';
  //50%
  quetionText.textContent = currentQuestion.question;

  // explain this in a second
  answersContainer.innerHTML = '';

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');

    // what is dateset? it's a property of the button element that
    // allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener('click', selectAnsewr);
    answersContainer.appendChild(button);
  });
}

function selectAnsewr(event) {
  console.log('select answer');
  //optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  // todo: explain this in a sec
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    console.log(currentQuestionIndex, 'currentQuestionIndex');
    console.log(quizQuestions.length, 'quizQuestions');
    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

showQuestion();
