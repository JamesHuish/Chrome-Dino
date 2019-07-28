let objects = [];
let birds = [];
let spacing = 40;
let timer = spacing;
let r = 1;
let score = 0;
const TOTAL = 500
let players = [];
let savedPlayers = [];
let slider;
let highestScore = 0;


function setup() {
  createCanvas(800, 400);
  slider = createSlider(1, 100, 1);
  for (let i = 0; i < TOTAL; i++) {
    players[i] = new Player;
  }


}


function draw() {

  for (let n = 0; n < slider.value(); n++) {
    timer--;
    if (timer <= 0) {
      if (score % 5 === 0) {
        spacing = random(25, 50);
        timer = 0;
        r = random(1);
        if (score < 50) {
          if (r < 0.020) {
            birds.push(new Bird());
            timer = spacing;
          }
        }
        if (score >= 50 && score < 150) {
          if (r < 0.20) {
            birds.push(new Bird());
            timer = spacing;
          }
        }
        if (score >= 150) {
          if (r < 0.50) {
            birds.push(new Bird());
            timer = spacing;
          }
        }
        

      } else {
        spacing = random(30, 50);
        timer = 0;
        r = random(1);
        if (score < 10) {
          if (r < 0.025) {
            objects.push(new Obstacle());
            timer = spacing;
          }
        } else if (score >= 10) {
          if (r < 0.50) {
            objects.push(new Obstacle());
            timer = spacing;
          }

        }
      }
    }


    /*if (objects.length === 1 && objects[0].x < 2) {
      objects.push(new Obstacle());
    }*/

    for (i = 0; i < objects.length; i++) {
      objects[i].speedUpdate();
      objects[i].move();

      for (let j = players.length - 1; j >= 0; j--) {
        if (objects.length > 0) {
        if (collision(objects[i], players[j])) {
          savedPlayers.push(players.splice(j, 1)[0]);
        }

        if (objects[i].x < -30) {
          objects.splice(i, 1);
          score++
        }

      }
    }
  }

    for (i = 0; i < birds.length; i++) {
      birds[i].speedUpdate();
      birds[i].move();

      for (let j = players.length - 1; j >= 0; j--) {
        if (birds.length > 0) {
          if (collision(birds[i], players[j])) {
            savedPlayers.push(players.splice(j, 1)[0]);
          }


          if (birds[i].x < -30) {
            birds.splice(i, 1);
            score++
          }

        }

      }
    }

    for (let player of players) {
      player.move();
      player.think(objects);
    }

    if (players.length === 0) {
      nextGeneration();
      objects = [];
      birds = [];

      score = 0;
    }

  }

  //drawing
  background(51);

  for (let object of objects) {
    object.show();
  }

  for (let player of players) {
    player.show();
    
  }

  for (let bird of birds) {
    bird.show();
  }


  drawScore();
}


function collision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h + 15 &&
    rect1.y + rect1.h > rect2.y) {
    return true;
  }
  return false;
}

function drawScore() {

  if (score > highestScore) {
    highestScore = score;
  }

  fill(255, 0, 0, 100)

  text("Score: " + score, 8, 20);
  text("Highest Score: " + highestScore, 8, 35);
  text("Generation: " + generation, 8, 50);
  text("Active: " + players.length, 8, 65);

}