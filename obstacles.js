class Obstacle {
    constructor() {
        this.w = 30;
        this.h = 30;
        this.x = width;
        this.y = height - this.h;

    }

    show() {
        fill(255, 0, 0, 100);
        rect(this.x, this.y, this.w, this.h);
    }

    move() {
        this.x -= 7;

    }
}

//added bird

class Bird {
    constructor() {
        this.w = 70;
        this.h = 35;
        this.x = width;
        this.y = height - 70;
        this.speed = 7;
    }

    show() {
        fill(255, 165, 0, 100);
        rect(this.x, this.y, this.w, this.h);
    }

    speedUpdate() {
        if (score > 7 && score < 50) {
            this.speed = score;
        } else if (score > 49 && score < 100) {
            this.speed = score * 0.8;
        } else if (score > 99 && score < 200) {
            this.speed = score * 0.6;
        } else if (score > 199) {
            this.speed = score * 0.4;
        }

    } 
    
    move() {
        this.x -= this.speed
    }

}
