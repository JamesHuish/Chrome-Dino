
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
        this.h = 50;
        this.w = 50;
        this.x = this.w;
        this.y = height - this.h;
        this.vy = 0;
        this.gravity = 1;


        this.score = 0;
        this.fitness = 0;
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate)
        } else {
            this.brain = new NeuralNetwork(9, 6, 2);
        }


    }



    think(objects) {

        let inputs = []


        inputs[0] = this.y / height;
        if (objects.length > 0) {
            inputs[1] = objects[0].y / height;
            inputs[2] = objects[0].x / width;
            inputs[3] = objects[0].speed / 10;
            inputs[4] = objects[0].w / 10;
            inputs[5] = objects[0].w / 10;

        } else {
            inputs[1] = 0;
            inputs[2] = 0;
            inputs[3] = 0;
            inputs[4] = 0;
            inputs[5] = 0;


        }

        if (birds.length > 0) {

            inputs[6] = birds[0].y / height;
            inputs[7] = birds[0].x / width;
            inputs[8] = birds[0].speed / 10;


        } else {
            inputs[6] = 0;
            inputs[7] = 0;
            inputs[8] = 0;

        }
        let output = this.brain.predict(inputs);
        if (output[0] > 0.5) {
            this.jump();
        }
        if (output[1] > 0.7) {
            this.duck();
        }
    }

    jump() {

        if (this.y == height - this.h) {
            this.vy = -16;
        }

        if (this.h === 30 && this.w === 60) {
            this.h = 50;
            this.w = 50;
        }
    }

    duck() {
        if (this.y == height - this.h) {
            this.h = 30;
            this.w = 60;
        }
    }

    move() {
        this.score++

        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.h);
    }

    show() {
        fill(0, 255, 0, 100)
        rect(this.x, this.y, this.w, this.h);
    }



}