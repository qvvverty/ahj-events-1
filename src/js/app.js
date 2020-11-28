import goblin from '../img/goblin.png';

function randomNumber(max, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const goblinImg = document.createElement('img');
goblinImg.src = goblin;
const cells = document.getElementsByClassName('cell');
let activeCell = randomNumber(3);
cells[activeCell].append(goblinImg);

setInterval(() => {
  let nextCell = randomNumber(3);
  while (activeCell === nextCell) {
    nextCell = randomNumber(3);
  }
  cells[nextCell].append(goblinImg);
  activeCell = nextCell;
}, 1000);
