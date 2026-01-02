function rectangleCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}
function determinwinner({player, enemy,timerID}) {
    clearTimeout(timerID);
     document.querySelector('#displayText').style.display='flex';
    if(player.health === enemy.health){
       document.querySelector('#displayText').innerHTML='Tie';
    }
    else if(player.health > enemy.health){
        document.querySelector('#displayText').innerHTML='Player 1 Wins';
    }
    else if(enemy.health > player.health){
        document.querySelector('#displayText').innerHTML='Player 2 Wins';
    }
}

let timer = 10;
let timerID;
function decreaseTimer(){
    if(timer>0){
        timerID = setTimeout(decreaseTimer,1000);
        timer--;
        document.querySelector('#timer').innerHTML=timer;
    }
   if(timer=== 0) {
        determinwinner({player, enemy,timerID});
}
}
