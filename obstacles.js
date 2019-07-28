
class Obstacle {
    constructor() {
        this.r = random(30, 60);
        this.x = width;
        this.y = height - this.r;
        this.speed = 7;

    }

    show() {
        fill(255, 0, 0, 100);
        rect(this.x, this.y, 30, this.r);
    }

    speedUpdate() {
        if (score > 7 && score < 50) {
            this.speed = score;
        } else if (score > 49) {
            this.speed = score * 0.8;
        }
    }

    move() {
        this.x -= this.speed


    }
}