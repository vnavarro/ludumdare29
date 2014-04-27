var game = new Phaser.Game(
    800, 600, Phaser.AUTO, '',
    { preload: preload, create: create, update: update }
  );

var platforms;
var key_items;
var player;
var score = 0;
var scoreText;

function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('wall', 'assets/platform160.png');
  game.load.image('wall_up', 'assets/platform160_I.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

  cursors = game.input.keyboard.createCursorKeys();
}

function create() {
}

function update() {
}
