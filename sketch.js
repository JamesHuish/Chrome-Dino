const objects = [];
const birds = [];
let spacing = 40;
let timer = spacing;
let r = 1;
let score = 0;


function setup() {
  createCanvas(600, 400);

  player = new Player;

}


function keyPressed() {
  if (keyCode === 38) {
    player.jump();
  }

  if (keyCode === 40) {
    player.duck()
  }
}



function draw() {
  background(51);
  
  timer--;
  if (timer <= 0) {
    if (score % 5 === 0) {
      spacing = random(30, 50);
      timer = 0;
      r = random(1);
      if (score < 10) {
        if (r < 0.025) {
          birds.push(new Bird());
          timer = spacing;
        }
      }
      if (score >= 10 && score < 30) {
        if (r < 0.15) {
          birds.push(new Bird());
          timer = spacing;
        }
      }
      if (score >= 30) {
        if (r < 0.2) {
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
      }
      if (score >= 10 && score < 30) {
        if (r < 0.15) {
          objects.push(new Obstacle());
          timer = spacing;
        }
      }
      if (score >= 30) {
        if (r < 0.2) {
          objects.push(new Obstacle());
          timer = spacing;
        }
      }
    }
  }


  for (i = 0; i < objects.length; i++) {
    objects[i].show();
    objects[i].move();
    if (collision(objects[i], player)) {
      console.log('Game over');
      noLoop();
    }
    if (objects[i].x < -30) {
      objects.splice(i, 1);
      score++
    };
  }

  for (i = 0; i < birds.length; i++) {
    birds[i].show();
    birds[i].move();
    if (collision(birds[i], player)) {
      console.log('Game over');
      noLoop();
    }
    if (birds[i].x < -30) {
      birds.splice(i, 1);
      score++
    };
  }



  player.show();
  player.move();
  drawScore();
}


//change .r to .w and .h

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

  text("Score: " + score, 8, 20);

}