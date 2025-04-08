'use strict';

const player0El = document.querySelector('.player--0');
const player0ScoreEl = document.querySelector('#score--0');
const player0CurrentEl = document.querySelector('#current--0');
const player1El = document.querySelector('.player--1');
const player1ScoreEl = document.querySelector('#score--1');
const player1CurrentEl = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const rollDiceBtn = document.querySelector('.btn--roll');

const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

const currentPlayerEl = player0El;
let currentScore = 0;

let activePlayer = 0;
let diceNmuber = 0;
let player0CrurrentScore = 0;
let player0Score = 0;
let player1CrurrentScore = 0;
let player1Score = 0;

const resetGame = function () {
  player0ScoreEl.textContent = 0;
  player1ScoreEl.textContent = 0;
  player0CurrentEl.textContent = 0;
  player1CurrentEl.textContent = 0;
  player0CrurrentScore = 0;
  player1CrurrentScore = 0;
  activePlayer = 0;
  diceNmuber = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
  currentPlayerEl = player0El;
};

resetGame();

const switchPlayer = function () {
  if (activePlayer === 0) { 
    activePlayer = 1;
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  }
    else {
    activePlayer = 0;
    player1El.classList.remove('player--active');   


const rollDice = function () {
  if (diceEl.classList.contains('hidden')) {
    diceEl.classList.remove('hidden');
  }
  diceNmuber = Math.trunc(Math.random() * 6) + 1;
  changeDiceFace(diceNmuber);
  if (activePlayer === 0) {
    player0CrurrentScore += diceNmuber;
    player0CurrentEl.textContent = player0CrurrentScore;
    if (diceNmuber === 1) {
      player0CrurrentScore = 0;
      player0CurrentEl.textContent = player0CrurrentScore;
      activePlayer = 1;
      player0El.classList.remove('player--active');
      player1El.classList.add('player--active');
    }
  } else {
    player1CrurrentScore += diceNmuber;
    player1CurrentEl.textContent = player1CrurrentScore;
    if (diceNmuber === 1) {
      player1CrurrentScore = 0;
      player1CurrentEl.textContent = player1CrurrentScore;
      activePlayer = 0;
      player1El.classList.remove('player--active');
      player0El.classList.add('player--active');
    }
  }
};

const hold = function () {
  if (activePlayer === 0) {
    player0Score += player0CrurrentScore;
    player0CrurrentScore = 0;
    player0CurrentEl.textContent = player0CrurrentScore;
    player0ScoreEl.textContent = player0Score;
    if (player0Score >= 20) {
      player0El.classList.add('player--winner');
      player0El.classList.remove('player--active');
      // disable the buttons
      rollDiceBtn.disabled = true;
      holdBtn.disabled = true;
    }
    activePlayer = 1;
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else {
    player1Score += player1CrurrentScore;
    player1CrurrentScore = 0;
    player1CurrentEl.textContent = player1CrurrentScore;
    player1ScoreEl.textContent = player1Score;
    if (player1Score >= 20) {
      player1El.classList.add('player--winner');
      player1El.classList.remove('player--active');
      // disable the buttons
      rollDiceBtn.disabled = true;
      holdBtn.disabled = true;
    }
    activePlayer = 0;
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
};

const changeDiceFace = function (diceNmuber) {
  diceEl.src = `dice-${diceNmuber}.png`;
};

rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', resetGame);
