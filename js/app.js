// This objects represents the tile where the player is on. The tile at the top left is 0,0 under is 0,1 etc.
class activeTile {
    update(horiz,vertic) {
        this.positionX = horiz;
        this.positionY = vertic;
    }
}


// Enemies our player must avoid
class Enemy {

    constructor() {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        this.reset(1);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += 1 * this.speed;

        // this if function resets the random properties and the start position once it runs out of the gamecanvas
        if (this.x >= 500) {
            this.reset();
        }

        if(this.checkIfBugTouchesPlayer()){
            this.eatPlayer()
        }
    }

    reset() {
        this.speed = 1 + Math.floor(Math.random() * 10);
        //an array with the three possible values of y for the enemies.
        const yValueEnemyRows = [60, 145, 230];
        //generates a number between 0 and the length of the yValueEnemyRows array -1.
        const randomYPicker = Math.floor(Math.random() * yValueEnemyRows.length);
        //will set y to one of the rows in the canvas where the bug runs on.
        this.y = yValueEnemyRows[randomYPicker];
        // x is just out of the canvas, so when i is increased the bug will run in the canvas
        this.x = -100;
    }

   checkIfBugTouchesPlayer() {

        }
   }

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

// In this function we do everything that has to be done when the player is overran by a bug
    eatPlayer() {
        player= new Player();
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(){
        this.sprite =  'images/char-boy.png';

        //start position
        this.x = 200;
        this.y = 400;

        activeTile(5,2);
    }

    update(changeOnX = 0,changeOnY = 0) {
        this.x += changeOnX;
        this.y += changeOnY;
        this.render();
    }


    //function called when a bug eats the player or when the game is launched
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(touchedKey) {
        if (touchedKey ==='left'){
            //prevent player from running out of the screen on the left side
            if (this.x === 0) {
                return;
            }
            this.update(-100,0);
        }

        if (touchedKey ==='right'){
            //prevent player from running out of the screen on the right side
            if (this.x === 400) {
                return;
            }
            this.update(100,0);
        }

        if (touchedKey ==='up') {
            if (this.y === 60) {
                player = new Player;
            }
            this.update(0,-85);
        }

        if (touchedKey ==='down') {
            if (this.y === 400) {
                return;
            }
            this.update(0,85);
        }
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = new Set();
for (let i = 0; i < 6; i++) {
    const enemy = new Enemy();
    allEnemies.add(enemy);
}
// Place the player object in a variable called player
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
