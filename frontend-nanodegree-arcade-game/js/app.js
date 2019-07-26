// Enemies constructor
var Enemy = function(x, y) {
  // Variables applied to each of our instances
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies
  this.sprite = 'images/enemy-bug.png';
  this.height = 65;
  this.width = 72;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
  // Ensure enemy bugs move across screen.
  if (this.x > ctx.canvas.width + this.width) {
    this.x = -200 * Math.floor(Math.random() * 4) + 1;
  } else {
    this.x += 400 * dt;
  }
  // Check for collision.
  if (
    player.x < this.x + this.width &&
    player.x + player.width > this.x &&
    player.y < this.y + this.height &&
    player.height + player.y > this.y
  ) {
    alert('YOU LOSE!, TRY AGAIN');
    player.resetGame();
  }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
  this.height = 75;
  this.width = 65;
};

// When player reach the water alert the player and reset the game.
Player.prototype.update = function() {
  if (player.y < 0) {
    alert('YOU WIN, CONGRATULATIONS!');
    this.resetGame();
  }
};

// Draw the player on the screen.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set the keys for moving the player.
Player.prototype.handleInput = function(keypress) {
  var columnSize = 101;
  var rowSize = 83;
  if (keypress === 'left' && this.x - columnSize >= 0) {
    this.x -= columnSize;
    // keep player move inside the canvas
  } else if (keypress === 'right' && this.x + columnSize < ctx.canvas.width) {
    this.x += columnSize;
    // keep player move inside the canvas
  } else if (
    keypress === 'down' &&
    this.y + rowSize < ctx.canvas.height - 200
  ) {
    this.y += rowSize;
    // keep player move inside the canvas
  } else if (keypress === 'up' && this.y - rowSize > 0 - player.height) {
    this.y -= rowSize;
  }
};

// Player reset position.
Player.prototype.resetGame = function() {
  this.x = 202;
  this.y = 400;
};

// Now instantiate Enemy objects.
var enemyOne = new Enemy(0, 60);
var enemyTwo = new Enemy(0, 143);
var enemyThree = new Enemy(0, 226);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyOne, enemyTwo, enemyThree];

// Place the player object in a variable called player
var player = new Player(202, 400);

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
