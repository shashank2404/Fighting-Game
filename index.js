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

const background =  new Sprite({
    position : {
        x:0,
        y: 0,
    },
    imageSrc: './Assests/background/background.png'

});

const shop = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: './Assests/decorations/shop_anim.png',
  scale: 2.75,
  framesMax: 6
});

//create a player instance
const player = new Fighter({
    position: {
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
    },
    imageSrc: './samurai/Sprites/Idle.png',
    framesMax: 8,
});



//create enemy instance
const enemy = new Fighter({
    position: {
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
    },
    
    imageSrc: './samurai/Sprites/Idle.png',
    framesMax: 8,
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

decreaseTimer();

//animation loop
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'beige';
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();
    player.update();
    enemy.update();
    //console.log('animation loop running');

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    //move player
    if (key.a.pressed && lastKey === 'a') {
        player.velocity.x = -5;
    }
    else if (key.d.pressed && lastKey === 'd') {
        player.velocity.x = 5;
    }

    //enemy movement
    if (key.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }
    else if (key.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    }
    // detect attack box position
    if (rectangleCollision({
        rectangle1: {
            position: player.attackBox.position,
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
            position: enemy.attackBox.position,
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

    //end game based on health
    if(enemy.health <= 0 || player.health <=0){
        determinwinner({player, enemy,timerID});
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
                player.velocity.y = -15;
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
                enemy.velocity.y = -15;
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