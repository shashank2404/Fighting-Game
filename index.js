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
    constructor({ postion, velocity, colour = 'black', offset }) {
        this.postion = postion;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.attackBox = {
            postion: {
                x: this.postion.x,
                y: this.postion.y,
            },
            offset,
            width: 100,
            height: 50,
        };
        this.colour = colour;
        this.health = 100;
        this.isattacking;

    }
    //create a draw method
    draw() {
        c.fillStyle = this.colour;
        c.fillRect(this.postion.x, this.postion.y, 50, 150);

        //update attack box position
        this.attackBox.postion.x = this.postion.x - this.attackBox.offset.x;
        this.attackBox.postion.y = this.postion.y;
        //attackBox
        if (this.isattacking) {
            c.fillStyle = 'green';
            c.fillRect(
                this.attackBox.postion.x,
                this.attackBox.postion.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }
    }
    ///update method
    update() {
        this.draw();
        //horizontal movement
        this.postion.x += this.velocity.x;
        //vertical movement
        this.postion.y += this.velocity.y;

        //floor collision
        if (this.postion.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }
    }
    attacking() {
        this.isattacking = true;
        setTimeout(() => {
            this.isattacking = false;
        }, 100)
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
    },
    offset: {
        x: 0,
        y: 0,
    }
});

function rectangleCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.postion.x + rectangle1.width >= rectangle2.postion.x
        && rectangle1.postion.x <= rectangle2.postion.x + rectangle2.width
        && rectangle1.postion.y + rectangle1.height >= rectangle2.postion.y
        && rectangle1.postion.y <= rectangle2.postion.y + rectangle2.height
    )
}

let timer = 10;
function decreaseTimer(){
    if(timer>0){
        setTimeout(decreaseTimer,1000);
        timer--;
        document.querySelector('#timer').innerHTML=timer;
    }
    if(player.health === enemy.health){
        console.log('DRAW');
    }
}

//create enemy instance
const enemy = new sprite({
    postion: {
        x: 400,
        y: 150,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    colour: 'red',
    offset: {
        x: 50,
        y: 0,
    }
})

player.draw();
console.log('Sprite drawn player');
enemy.draw();
console.log('Sprite drawn enemy');
//key declaration
const key = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}
let lastKey;
//animation loop
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'beige';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();
    //console.log('animation loop running');

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    //move player
    if (key.a.pressed && lastKey === 'a') {
        player.velocity.x = -3;
    }
    else if (key.d.pressed && lastKey === 'd') {
        player.velocity.x = 3;
    }

    //enemy movement
    if (key.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3;
    }
    else if (key.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3;
    }
    // detect attack box position
    if (rectangleCollision({
        rectangle1: {
            postion: player.attackBox.postion,
            width: player.attackBox.width,
            height: player.attackBox.height
        },
        rectangle2: enemy
    }) && player.isattacking) {
        player.isattacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        // console.log('player hit enemy');
    }


    if (rectangleCollision({
        rectangle1: {
            postion: enemy.attackBox.postion,
            width: enemy.attackBox.width,
            height: enemy.attackBox.height
        },
        rectangle2: player
    }) && enemy.isattacking) {
        enemy.isattacking = false;
        player.health -= 20;
       document.querySelector('#playerHealth').style.width = player.health + '%';
        // console.log('enemy hit player');
    }

}

animate();


// Key controls
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = true;
            lastKey = 'd';
            break;
        case 'a':
            key.a.pressed = true;
            lastKey = 'a';
            break;
        case 'w':
            if (player.velocity.y === 0)
                player.velocity.y = -20;
            break;
        case ' ':
            player.attacking();
            break;

        case 'ArrowRight':
            key.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            if (enemy.velocity.y === 0)
                enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
            enemy.attacking();
            break;
    }
    console.log(event.key);
});


window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = false;
            break;
        case 'a':
            key.a.pressed = false;
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false;
            break;
    }
});
console.log('Key controls set up');  