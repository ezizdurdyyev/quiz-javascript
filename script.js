//Dom Elements
const startScreen = document.getElementById('startScreen');
const quizscreen = document.getElementById('quiz-screen');
const reslutScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const restartQuiz = document.getElementById('restart-btn');
const quetionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resulMessage = document.getElementById('result-message');
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
];

//Quiz State wars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent.length;
maxScoreSpan.textContent = quizQuestions.length;

// wvwnt listeners

startButton.addEventListener('click', startQuiz);
restartQuiz.addEventListener('click', restartQuiz);

function startQuiz() {
  //reset vars
  score.textContent = 0;

  startScreen.classList.remove('active');
  quizscreen.classList.add('active');
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

function showResults() {
  quizscreen.classList.remove('active');
  reslutScreen.classList.add('active');

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resulMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resulMessage.textContent = 'Great job! You know your stuff!';
  } else if (percentage >= 60) {
    resulMessage.textContent = 'Good efford! Keep learning!';
  } else if (percentage >= 40) {
    resulMessage.textContent = 'Not bad! Try again to improve!';
  } else {
    resulMessage.textContent = "Keep studying! You'll get better! ";
  }
}

function resetQuiz() {
  console.log('quiz started');
}
