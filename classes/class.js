class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.currentFrame = 0;
        this.frameElapsed = 0;
        this.frameHold = 5;

    }
    //create a draw method
    draw() {
        c.drawImage(
            this.image,
            this.currentFrame * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }
    ///update method
    update() {
        this.draw();
        this.frameElapsed++;
        if (this.frameElapsed % this.frameHold === 0) {
            if (this.currentFrame < this.framesMax - 1) {
                this.currentFrame++;
            }
            else {
                this.currentFrame = 0;
            }
        }
    }
}


class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        colour = 'black',
        offset,
        imageSrc,
        scale = 1,
        framesMax = 1
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax
        });

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        };

        this.colour = colour;
        this.health = 100;
        this.isattacking = false;
    }



//create a draw method

///update method
update() {
    this.draw();
    //horizontal movement
    this.position.x += this.velocity.x;
    //vertical movement
    this.position.y += this.velocity.y;
 //update attack box position
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    //floor collision
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
        this.velocity.y = 0;
    }
    else {
        this.velocity.y += gravity;
    }
}
attacking(){
    this.isattacking = true;
    setTimeout(() => {
        this.isattacking = false;
    }, 100)
}

}
