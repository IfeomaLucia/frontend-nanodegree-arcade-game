/*Arcade game by Nwosu Ifeoma Lucia
at Genesys tech hub, Enugu
June 2nd, 2018*/

// A class which declares all enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

/*An object of the Enemy class is created which updates the enemy's position and requires a
parameter: dt, a time delta between ticks*/
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if(this.x > 505){
        this.x = -100;
        this.speed = 200 + (Math.random() * 1000);//randomising the speeds of the sprites
    }

//To check for collisions between the player and the sprite
    if(player.x < this.x + 50 && player.x + 50 > this.x &&
       player.y < this.y + 40 && player.y + 40 > this.y){
      player.x = 200;
      player.y = 400;
    }
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is the player class which describes all the necessary parameters
var Player = function(x, y){
    this.x = x;
    this.y = y;
    this.player = 'images/char-boy.png'
}

Player.prototype.update = function(dt){

}
//Draws the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};
//This is an object of the Player class which checks for any of the key pressed by the user
Player.prototype.handleInput = function(keyPress){
  if(keyPress == 'right' && this.x < 400){
    this.x += 100;
  }
  if(keyPress == 'left' && this.x > 0){
    this.x -= 100;
  }
  if(keyPress == 'up' && this.y > 0){
    this.y -= 90;
  }
  if(keyPress == 'down' && this.y < 400){
    this.y += 90;
  }

//This condition resets the game when a player reaches any water tile
  if(this.y < 0){
    setTimeout(function() {
      player.x = 200;
      player.y = 400;
    }, 200);
  }
}

var allEnemies = [];
var enemyLocation = [60, 140, 220];//Declares the positions of our sprites

enemyLocation.forEach(function(locationY){
    enemy = new Enemy(0, locationY, 300);
    allEnemies.push(enemy);
});

var player = new Player(200, 400);//declares the starting position of the player avatar

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
