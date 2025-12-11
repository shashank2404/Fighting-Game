// world setup For Game

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1027;
canvas.height = 576;
//gravity
const gravity = 0.7;

//fill background
c.fillStyle = 'beige';
c.fillRect(0, 0, canvas.width, canvas.height);

console.log('World setup complete');

class sprite {
    constructor({postion, velocity}) {
        this.postion = postion;
        this.velocity = velocity;
        this.height = 150;

    }
    //create a draw method
    draw() {
        c.fillStyle = 'black';
        c.fillRect(this.postion.x, this.postion.y, 50, 150);
    }
    ///update method
    update(){
        this.draw();
        this.postion.y += this.velocity.y;

        //floor collision
        if(this.postion.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }
        else{
            this.velocity.y+= gravity;
        }
    }
}
//create a player instance
const player = new sprite({
    postion: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

//create enemy instance
const enemy = new sprite({
    postion: {
        x: 400,
        y: 150,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

player.draw();
console.log('Sprite drawn player');
enemy.draw();
console.log('Sprite drawn enemy');

//animation loop
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'beige';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    console.log('animation loop running');
}
animate();


// Key controls
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            player.velocity.x = 5; // move right
            break;
        case 'a':
            player.velocity.x = -5; // move left
            break;
        case 'w':
            if (player.velocity.y === 0) {
                player.velocity.y = -20; // jump
            }
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
        case 'a':
            player.velocity.x = 0; // stop movement
            break;
    }
});
