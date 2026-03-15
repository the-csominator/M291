const guy = document.getElementById('guy');
const rock = document.getElementById('rock');
const score = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

score.innerText = 0;

// Spiel läuft erst nach Klick auf Start
let gameRunning = false;
let gameInterval = null;

function jump() {
  guy.classList.add('jump-animation');
  // Verbesserung: Timeout passt zur tatsächlichen Animationsdauer (0.5s = 500ms)
  // Vorher war 900ms obwohl die Animation nur 0.5s dauert — das blockierte den nächsten Sprung zu lange
  setTimeout(() => guy.classList.remove('jump-animation'), 500);
}

document.addEventListener('keydown', (event) => {
  if (gameRunning && !guy.classList.contains('jump-animation')) {
    jump();
  }
});

function startGame() {
  console.log('Start Button wurde geklickt — Spiel startet!');
  gameRunning = true;

  // Start Button verstecken
  startBtn.style.display = 'none';

  // Rock-Animation starten
  rock.style.animationPlayState = 'running';

  // Score-Intervall starten
  gameInterval = setInterval(() => {
    const guyTop = parseInt(window.getComputedStyle(guy).getPropertyValue('top'));
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));

    score.innerText++;

    if (rockLeft < 0) {
      rock.style.display = 'none';
    } else {
      rock.style.display = '';
    }

    if (rockLeft < 50 && rockLeft > 0 && guyTop > 150) {
      // Kollisions-Animation abspielen
      guy.classList.add('collision-animation');

      // Kurz warten damit Animation sichtbar ist, dann Game Over
      clearInterval(gameInterval);
      gameRunning = false;

      setTimeout(() => {
        alert('Game over, u suck. But u got a score of: ' + score.innerText + '\n\nPlay again?');
        location.reload();
      }, 500);
    }
  }, 25);
}

// Click Event Handler für Start Button
startBtn.addEventListener('click', () => {
  startGame();
});
