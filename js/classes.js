class Player {
    constructor( {position, color='DeepSkyBlue'} ){
        this.position = position;
        this.movement = {
            y: 0
        };
        this.color = color; 
        this.radius = 45;

        this.leftLeg = {
            x: this.position.x-70,
            y: this.position.y+30,
            radius: 12
        }

        this.rightLeg = {
            x: this.position.x-40,
            y: this.position.y+80,
            radius: 15
        }

        this.eye = {
            x: this.position.x-75,
            y: this.position.y-7,
            radius: 9
        }

        this.shield = new Shield({ player: this});
    }

    draw() {
        //draw player body
        c.beginPath();
        c.arc( this.position.x, this.position.y, this.radius, 0, Math.PI*2 );
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

        //draw right leg
        c.beginPath();
        c.arc( this.rightLeg.x, this.rightLeg.y, this.rightLeg.radius, 0, Math.PI*2 );
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

        //draw left leg
        c.beginPath();
        c.arc( this.leftLeg.x, this.leftLeg.y, this.leftLeg.radius, 0, Math.PI*2 );
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

        //draw eye
        c.save();
        c.scale(1.75, 1);
        c.beginPath();
        c.arc( this.eye.x, this.eye.y, this.eye.radius, 0, Math.PI*2 );
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
        c.restore();


        player.shield.move();
       
    }

    move() {
        this.draw();
        this.position.y += this.movement.y;
        this.rightLeg.y += this.movement.y;
        this.leftLeg.y += this.movement.y;
        this.eye.y += this.movement.y; 
        this.shield.movement.y += this.movement.y;
    }

}

class Shield {
    constructor( { color=['lime','yellow','red'], colorIndex=0 ,player } ){
        this.position = {
            x: player.position.x+70,
            y: player.position.y-45,
        };

        this.movement = {
            y: 0
        }

        this.width = 10;
        this.height = 60;
        this.color = color;
        this.colorIndex = colorIndex;
    }

    draw() {
        c.fillStyle = this.color[this.colorIndex];
        c.fillRect( this.position.x, this.position.y, this.width, this.height );
    }

    move(){
        this.draw();
        this.position.y = player.position.y-45;
    }
}

class Star {
    constructor( {position, color='white', movement, radius, opacity} ){
        this.position = position;
        this.movement = movement;
        this.color = color;
        this.radius = radius;
        this.opacity = opacity;
    }

    draw() {
        c.save();
        c.globalAlpha = this.opacity;
        c.beginPath();
        c.arc( this.position.x, this.position.y, this.radius, 0, Math.PI*2 );
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    }

    move() {
      this.draw();
      this.position.x += this.movement.x
    }
}

class Enemy {
    constructor( {position, movement, color='crimson'} ){
        this.position = position;

        this.movement = movement;
        this.color = color; 

        this.height = 50;
    }

    draw() {
        c.beginPath();
        c.moveTo(this.position.x, this.position.y);
        c.lineTo(this.position.x, this.position.y+this.height);
        c.lineTo(this.position.x-this.height, this.position.y+this.height/2 );  
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    move(){
        this.draw();
        this.position.x += this.movement.x;
        this.position.y += this.movement.y;
    }

}


class Powerup {
    constructor(){
        this.color = 'yellow'; 
        this.radius = 10;

        this.position = {
            x: canvas.width + this.radius,
            y: Math.random() * (canvas.height-200) + 50
        };

        this.movement = {
            x: -15
        };
    }

    draw() {
        c.beginPath();
        c.arc( this.position.x, this.position.y, this.radius, 0, Math.PI*2 );
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    move() {
        this.draw();
        this.position.x += this.movement.x;
    }

}



