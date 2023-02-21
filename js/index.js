/**
 * Declarations
 */
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const animationId = null;

const player = new Player( { 
    position: {
        x: 200,
        y: 45
    } 
} );

const enemy = new Enemy( { 
    position: {
        x1: canvas.width,
        y1: 0,
        x2: canvas.width,
        y2: 50,
        x3: canvas.width-50
    }
} );

const key = {
    a: { pressed: false },
    s: { pressed: false },
}



/**
 * Logic
 */
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

enemy.draw();

const shield = new Shield( );
shield.draw();

// animation
function animate() {
    animationId = requestAnimationFrame(animate);

    player.draw();
    
}



