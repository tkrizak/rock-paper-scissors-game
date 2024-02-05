let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

/* if (!score) {
  score = {
    wins: 0,
    loses: 0,
    ties: 0,
  };
} */

updateScoreElement();

// computer picks a move

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

// autoplay

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

// play on button click

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

// play on keydown

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  }
});

// player picks move and compares it to computers move

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  // save result in an object

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.loses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  // save score in local storage and convert to JSON string

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector(
    '.js-moves'
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon" /><img
  src="images/${computerMove}-emoji.png"
  class="move-icon"
/>Computer`;
}

// update score

function resetScore() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  resetMessage.innerHTML = '';
}

const resetScoreButton = document.querySelector('.js-score-reset-button');

resetScoreButton.addEventListener('click', () => {
  showResetConfirmation();
});

const resetMessage = document.querySelector('.js-reset-message');

function showResetConfirmation() {
  resetMessage.innerHTML = `<p class="reset-message">Are you sure you want to reset the score?</p>
  <button class="yes-button js-yes-button">Yes</button
  ><button class="no-button js-no-button">No</button>`;

  const yesButton = document.querySelector('.js-yes-button');
  const noButton = document.querySelector('.js-no-button');

  yesButton.addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

  noButton.addEventListener('click', () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation() {
  resetMessage.innerHTML = '';
}

function updateScoreElement() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}
