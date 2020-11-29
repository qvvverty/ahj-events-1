import randomNumber from './utils';
import goblin from '../img/goblin.png';

export default class GoblinGame {
  constructor() {
    this.goblinImg = document.createElement('img');
    this.goblinImg.src = goblin;
    this.goblinImg.addEventListener('click', () => {
      this.fails = 0;
      this.score += 1;
      this.start();
    });

    this.userScore = 0;
    this.scoreElem = document.querySelector('.score-current');
    this.scoreElem.textContent += ' 0';

    this.cells = document.getElementsByClassName('cell');
    this.activeCell = randomNumber(this.cells.length - 1);

    this.gameOverModal = document.querySelector('.modal-overlay');
    this.gameOverModal.addEventListener('click', (click) => {
      if (click.target === this.gameOverModal || click.target.classList.contains('play-again')) {
        this.gameOverModal.classList.remove('active');
        this.start();
      }
    });

    this.fails = -1;
  }

  set score(point) {
    this.userScore = point;
    this.scoreElem.textContent = this.scoreElem.textContent.replace(/\d.*/, this.score);
  }

  get score() {
    return this.userScore;
  }

  start() {
    this.replaceGoblin();
    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.fails += 1;
      if (this.fails === 5) this.gameOver();

      this.replaceGoblin();
    }, 1000);
  }

  replaceGoblin() {
    this.nextCell = randomNumber(this.cells.length - 1);
    while (this.activeCell === this.nextCell) {
      this.nextCell = randomNumber(this.cells.length - 1);
    }
    this.cells[this.nextCell].append(this.goblinImg);
    this.activeCell = this.nextCell;
  }

  gameOver() {
    clearInterval(this.intervalId);
    this.gameOverModal.classList.add('active');
    document.querySelector('.score-final').textContent = `Your score: ${this.score}`;
    this.score = 0;
    this.fails = -1;
  }
}
