
class Player {
    constructor() {
        this.h = 50;
        this.w = 50;
        this.x = this.w;
        this.y = height - this.h;
        this.vy = 0;
        this.gravity = 1;
    }

    jump() {

        if (this.y == height - this.h) {
            this.vy = -16;
            this.h = 50;
            this.w = 50;

        }


    }

    // added ability to duck

   duck() {
        if (this.y == height - this.h) {
            this.h = 30;
            this.w = 60;
            
        } 
        
        
    } 

    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.h);
    }

    show() {
        fill(0, 255, 0, 100)
        rect(this.x, this.y, this.w, this.h);
    }

}