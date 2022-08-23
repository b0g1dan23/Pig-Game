'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const current0El = document.querySelector('#current--0');
const score1El = document.getElementById('score--1');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Inicijalizacija
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;

function switchPlayers() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.querySelector(
    `#current--${activePlayer === 0 ? 1 : 0}`
  ).textContent = currentScore;
  document
    .querySelector(`.player--${activePlayer === 0 ? 0 : 1}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
    .classList.remove('player--active');
}

// Rolling dice
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1: if true, switch to next player
  if (dice != 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayers();
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score
  scores[activePlayer === 0 ? 0 : 1] += Number(
    document.querySelector(`#current--${activePlayer === 0 ? 0 : 1}`)
      .textContent
  );
  console.log(scores[activePlayer === 0 ? 0 : 1]);
  document.querySelector(`#score--${activePlayer === 0 ? 0 : 1}`).textContent =
    scores[activePlayer === 0 ? 0 : 1];

  // 2. Check if score >=100
  if (scores[activePlayer === 0 ? 0 : 1] >= 100) {
    document
      .querySelector(`.player--${activePlayer === 0 ? 0 : 1}`)
      .classList.add('player--winner');
    document.querySelector('.btn--roll').disabled = true; // disable roll
    document.querySelector('.btn--hold').disabled = true; // disable holding
  } else {
    switchPlayers();
  }
});

btnNew.addEventListener('click', function () {
  // 1. Reset scores
  scores[0] = 0;
  scores[1] = 0;
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;
  // 2. Reset background
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  // 3. Enable buttons
  document.querySelector('.btn--roll').disabled = false;
  document.querySelector('.btn--hold').disabled = false;
});
