let objects = [];
let spacing = 40;
let timer = spacing;
let r = 1;
let score = 0;
const TOTAL = 500
let players = [];
let savedPlayers = [];


function setup() {
  createCanvas(800, 400);

  for (let i = 0; i < TOTAL; i++) {
    players[i] = new Player;
  }
  

}


function draw() {
  background(51);

  timer--;
  if (timer <= 0) {
    spacing = random(30, 50);
    timer = 0;
    r = random(1);
    if (score < 10) {
      if (r < 0.025) {
        objects.push(new Obstacle());
        timer = spacing;
      }
    } else if (score >= 10) {
      if (r < 0.15) {
        objects.push(new Obstacle());
        timer = spacing;
      }

    }
  }


  /*if (objects.length === 1 && objects[0].x < 2) {
    objects.push(new Obstacle());
  }*/

  for (i = 0; i < objects.length; i++) {
    objects[i].speedUpdate();
    objects[i].show();
    objects[i].move();

    for (let j = players.length - 1; j >= 0; j--) {

      if(collision(objects[i], players[j])) {
        savedPlayers.push(players.splice(j, 1)[0]);
      }

    }


    /* if (collision(objects[i], player)) {
       console.log('Game over');
       noLoop();
     } */
    
    
     if (objects[i].x < -30) {
      objects.splice(i, 1);
      score++
    };
  }

  for (let player of players) {
    player.show();
    player.move();
    player.think(objects);
  }

  if (players.length === 0) {
    nextGeneration();
    objects = [];
    score = 0;
  }

  drawScore();
}


function collision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.r &&
    rect1.x + rect1.r > rect2.x &&
    rect1.y < rect2.y + rect2.r + 15 &&
    rect1.y + rect1.r > rect2.y) {
    return true;
  }
  return false;
}

function drawScore() {

  text("Score: " + score, 8, 20);
  text("Generation: " + generation, 8, 40);

}