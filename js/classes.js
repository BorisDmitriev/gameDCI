class Player {
    constructor( {position, color='DeepSkyBlue'} ){
        this.position = position;
        this.movement = 0;
        this.color = color; 
        this.radius = 45;

        this.rightLeg = {
            x: this.position.x-40,
            y: this.position.y+50,
            radius: 15
        }

        this.leftLeg = {
            x: this.position.x-70,
            y: this.position.y+30,
            radius: 12
        }

        this.eye = {
            x: this.position.x-75,
            y: this.position.y,
            radius: 9
        }
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
       
    }

    move() {
        this.position.y += this.movement.y;
    }

}


class Enemy {
    constructor( {position, movement, color='crimson'} ){
        this.position = position;
        this.position.y3 = (position.y2-position.y1)/2;

        this.movement = movement;
        this.color = color; 
    }

    draw() {
        c.beginPath();
        c.moveTo(this.position.x1, this.position.y1);
        c.lineTo(this.position.x2, this.position.y2);
        c.lineTo(this.position.x3, this.position.y3);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

}


class Shield {
    constructor( color='lime' ){
        this.position = {
            x: player.position.x+70,
            y: player.position.y-45,
        };

        this.width = 10;
        this.height = 60;
        this.color = color;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect( this.position.x, this.position.y, this.width, this.height );
    }

}


