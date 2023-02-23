//render Background
function renderBackground() {
    for (let i = 100; i >= 0; i--) {
        stars.push(new Star({
            position: {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
            },
            movement: {
                x: -0.3
            },
            radius: Math.random() * 4 + 1,
            opacity: Math.random() * 0.5
        }));
    }
}


// Collision
function isCollision( {obj, typeEnemy} ){
    switch(typeEnemy){
        case 'enemy':
            return (
                obj.position.x - obj.height <= player.shield.position.x + player.shield.width
                && obj.position.x - obj.height >= player.shield.position.x
                && obj.position.y + obj.height / 2 >= player.shield.position.y
                && obj.position.y + obj.height / 2 <= player.shield.position.y + player.shield.height
            );  
        case 'powerup':
            return (
                obj.position.x - obj.radius <= player.shield.position.x + player.shield.width
                && obj.position.x - obj.radius >= player.shield.position.x
                && obj.position.y >= player.shield.position.y
                && obj.position.y <= player.shield.position.y + player.shield.height
        ); 
    }
}

//start game
function init() {
    player = new Player({
        position: {
            x: 200,
            y: canvas.height/2
        }
    });

    enemies = [];
    powerUps = [];
    frames = 0;
    // score system re-initialisation
    frequency = maxFrequency;
    difficulty = 0;
    isEqualScore = -1;

    game.start = true;
    game.colorIndex = 0;
    score = 0;

    startWindow.style.display = 'none';
    scoreIndicator.innerHTML = 0;
    difficultyIndicator.innerHTML = 0;
}


//restart game
function restart() {
    init();
    run();
    restartWindow.style.display = 'none';
}


//game over
function gameOver() {
    cancelAnimationFrame(animationId);
    restartWindow.style.display = 'flex';
}

function showScore(){
    scoreIndicator.innerHTML = score;
}

function showEnemyFrequency(){
    
}




