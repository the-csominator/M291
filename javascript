const guy = document.getElementById('guy');
const rock = document.getElementById('rock');
const score = document.getElementById('score');

score.innerText = 0;

function jump() {
  guy.classList.add('jump-animation');
  setTimeout(() => guy.classList.remove('jump-animation'), 900);
}

document.addEventListener('keydown', (event) => {
  if (!guy.classList.contains('jump-animation')) {
    jump();
  }
});

setInterval(() => {
  const guyTop = parseInt(window.getComputedStyle(guy).getPropertyValue('top'));
  const rockLeft = parseInt(
    window.getComputedStyle(rock).getPropertyValue('left'),
  );
  score.innerText++;

  if (rockLeft < 0) {
    rock.style.display = 'none';
  } else {
    rock.style.display = '';
  }

  if (rockLeft < 50 && rockLeft > 0 && guyTop > 150) {
    alert(
      'game over, u suck. But u got a score of: ' +
        score.innerText +
        '\n\nPlay again?',
    );
    location.reload();
  }
}, 25);
