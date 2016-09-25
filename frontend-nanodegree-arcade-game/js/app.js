// Global variable.
var poY = 10;
var enemySpeed = 300;
// Enemies constructor
var Enemy = function(x, y) {
    // Variables applied to each of our instances
    this.x = x;
    this.y = y;
    this.speed = Math.floor(200 + (Math.random() * enemySpeed));
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // Ensure enemy bugs move across screen.
    this.x = this.x + (this.speed * dt);
    if (this.x > 550) {
        this.x = -100;
        this.speed = Math.floor(200 + (Math.random() * enemySpeed));
        if (this.y > 226) {
            this.y = 60;
        }
    }
    // Check for collision.
    if (player.y >= this.y - poY && player.y <= this.y + poY) {
        if (player.x >= this.x - poY && player.x <= this.x + poY) {
            alert('YOU LOSE!, TRY AGAIN');
            player.resetGame();
        }
    }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor.
var Player = function() {
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';
};

// Arrow keys to move the player
Player.prototype.update = function() {
    if (this.keypress === 'left') {
        this.x -= 101;
        // keep player move inside the canvas
        if (this.x <= 0) {
            this.x = 0;
        }
    }
    if (this.keypress === 'up') {
        this.y -= 85;
    }
    if (this.keypress === 'right') {
        this.x += 101;
        // keep player move inside the canvas
        if (this.x >= 404) {
            this.x = 404;
        }
    }
    if (this.keypress === 'down') {
        this.y += 85;
        // keep player move inside the canvas
        if (this.y >= 404) {
            this.y = 404;
        }
    }
    this.keypress = null;
    if (this.y < 60) {
        alert('YOU WIN, CONGRATULATIONS!');
        this.resetGame();
    }
};

// Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set the keys for moving the player.
Player.prototype.handleInput = function(key) {
    this.keypress = key;
};

// Player resetGame position.
Player.prototype.resetGame = function() {
    this.x = 202;
    this.y = 404;
};

// Now instantiate Enemy objects.
var enemyOne = new Enemy(0, 60);
var enemyTwo = new Enemy(0, 143);
var enemyThree = new Enemy(0, 226);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyOne, enemyTwo, enemyThree];

// Place the player object in a variable called player
var player = new Player();

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