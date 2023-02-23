/**
 * get Browser Objects
 */ 
const canvas = document.querySelector('canvas');

const startWindow = document.querySelector('#startWindow');
const restartWindow = document.querySelector('#restartWindow');
const startButton = document.querySelector('#startButton');
const restartButton = document.querySelector('#restartButton');
const scoreIndicator = document.querySelector('#scoreIndicator');
const difficultyIndicator = document.querySelector('#difficultyIndicator');


/**
 * Declarations
 */
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

let animationId = null;
let player = null

const keys = {
    w: { pressed: false },
    s: { pressed: false },
}

let stars = [];
let enemies = [];
let powerUps = [];

let game = {
    colorIndex: 0,
    start: false
}

let frames = 0;

// score system
let score = 0;
let isEqualScore = -1;
const maxFrequency = 180;
const minFrequency = 90;
let frequency = maxFrequency; 
let difficulty = 0;

/**
 * Logic
 */
// render background => populating stars[] array
renderBackground();

// animation
function run() {
    animationId = requestAnimationFrame(run);

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);


    //draw background
    for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];

        if (stars[i].position.x + stars[i].radius <= 0) {
            stars[i].position.x = canvas.width + stars[i].radius;
            stars[i].position.y = Math.random() * canvas.height;
        }
        star.move();
    }


    if (game.start) {

        player.move();

        //player steuerung
        if (keys.w.pressed && player.position.y - player.radius > 0) {
            player.movement.y = -7;
        } else if (keys.s.pressed && player.shield.position.y + player.shield.height < canvas.height) {
            player.movement.y = 7;
        } else {
            player.movement.y = 0;
        }


        // generate enemies
        if (frames % frequency === 0) {

            //check frequency
            if(score > 0 && score%50 === 0 && score!==isEqualScore){
                isEqualScore = score;
                if( frequency !== minFrequency) {
                    frequency -= 30;
                    difficulty++;
                    difficultyIndicator.innerHTML = difficulty;
                } 
            } 
            console.log(score + " score"); 
            console.log(frequency + " frequency"); 
            console.log( difficulty + " difficulty");

            enemies.push(new Enemy({
                position: {
                    x: canvas.width,
                    y: Math.random() * (canvas.height - 200) + 50
                },
                movement: {
                    x: -(Math.random() * 10 + 2),
                    y: 0
                }
            }));
        }

        //enemies rendering
        for (let enemyIndex = enemies.length - 1; enemyIndex >= 0; enemyIndex--) {
            const enemy = enemies[enemyIndex];

            //garbage collection => delete enemy-objects when out of view range
            if (enemy.position.x + 50 <= 0) {
                enemies.splice(enemyIndex, 1);

                //lose condition
                game.colorIndex++;
                if (game.colorIndex > 2) gameOver();
                else player.shield.colorIndex = game.colorIndex;
                
            }
            else {
                enemy.move();
            }

            //collision
            if ( isCollision({obj: enemy, typeEnemy: 'enemy'}) ){
                enemy.movement.x = 10;
                enemy.movement.y = -10
                score += 10;
                showScore();
            }

        }

        //generate powerUps
        for (let powerupIndex = powerUps.length; powerupIndex >= 0; powerupIndex--) {
            const powerUp = powerUps[powerupIndex];
            
            if( frames % 500 === 0 && difficulty !== 0) powerUps.push( new Powerup() );
        }

        //rendering powerUps
        for (let powerupIndex = powerUps.length-1; powerupIndex >= 0; powerupIndex--) {
            const powerUp = powerUps[powerupIndex];
            

            //garbage collection
            if( powerUp.position.x + powerUp.radius < 0 ) powerUps.splice(powerupIndex, 1);
            else powerUp.move();

            //collision
            if ( isCollision({obj: powerUp, typeEnemy: 'powerup'}) ){

                if( frequency !== maxFrequency){
                    frequency += 30;
                    difficulty--;
                    difficultyIndicator.innerHTML = difficulty;
                }

                console.log( frequency + " collision");
                console.log( difficulty + " difficulty in PowerUp Conditional");

                powerUps.splice(powerupIndex, 1);
            }
        }
        
        frames++;
    }
}

run();




