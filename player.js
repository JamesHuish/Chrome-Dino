
function mutate(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }

class Player {
    constructor(brain) {
        this.r = 50;
        this.x = this.r;
        this.y = height - this.r;
        this.vy = 0;
        this.gravity = 1;


        this.score = 0;
        this.fitness = 0;
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate)
        } else {
            this.brain = new NeuralNetwork(4, 4, 1);
        }


    }



    think(objects) {

        let inputs = []


        inputs[0] = this.y / height;
        if (objects.length > 0) {
            inputs[1] = objects[0].y / height;
            inputs[2] = objects[0].x / width;
            inputs[3] = objects[0].speed;
        } else {
            inputs[1] = 0;
            inputs[2] = 0;
            inputs[3] = 0;
        }
        let output = this.brain.predict(inputs);
        if (output[0] > 0.5) {
            this.jump();
        }
    }

    jump() {

        if (this.y == height - this.r) {
            this.vy = -16;
        };

    }

    move() {
        this.score++

        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.r);
    }

    show() {
        fill(0, 255, 0, 100)
        rect(this.x, this.y, this.r, this.r);
    }



}