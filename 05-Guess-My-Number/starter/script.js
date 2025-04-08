'use strict';

// document.querySelector('.message').textContent = 'Correct Number! 🎉';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 113;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value); // 2

// Handling click events

let randomNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;
let messageElement = document.querySelector('.message');
let numberElement = document.querySelector('.number');
//numberElement.textContent = randomNumber;
console.log(randomNumber);

let scoreElement = document.querySelector('.score');
scoreElement.textContent = score;
let highscoreElement = document.querySelector('.highscore');
let guessElement = document.querySelector('.guess');
let checkElement = document.querySelector('.check');
let againElement = document.querySelector('.again');
let bodyElement = document.querySelector('body');

function displayMessage(message) {
  messageElement.textContent = message;
}

const onCheckBtnClick = function () {
  let guessValue = Number(document.querySelector('.guess').value);
  if (score <= 0) {
    displayMessage('💥 You lost the game!');
    return;
  }
  if (!guessValue) {
    displayMessage('⛔ No number!');
  } else if (guessValue > 20 || guessValue < 1) {
    displayMessage('⛔ Number out of range!');
  } else if (guessValue === randomNumber) {
    displayMessage('🎉 Correct Number!');
    gameWin();
    updateHighScore();

    highscore = Math.max(score, highscore);
  } else if (guessValue != randomNumber) {
    if (guessValue > randomNumber) {
      displayMessage('📉 Too high!');
    } else if (guessValue < randomNumber) {
      displayMessage('📈 Too low!');
    }
    score -= 1;
    scoreElement.textContent = score;
  }

  function gameWin() {
    bodyElement.style.backgroundColor = '#60b347';
    numberElement.style.width = '30rem';
    numberElement.textContent = randomNumber;
    checkElement.style.display = 'none';
    // score += 10;
    scoreElement.textContent = score;
  }
};
function updateHighScore() {
  if (score > highscore) {
    highscore = score;
    highscoreElement.textContent = highscore;
  }
}

function resetGame() {
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  scoreElement.textContent = score;
  guessElement.value = '';
  displayMessage('Start guessing...');
  numberElement.textContent = '?';
  bodyElement.style.backgroundColor = '#222';
  numberElement.style.width = '15rem';
  checkElement.style.display = 'block';
}

const onAgainElementClick = function () {
  resetGame();
};

checkElement.addEventListener('click', onCheckBtnClick);
againElement.addEventListener('click', onAgainElementClick);
