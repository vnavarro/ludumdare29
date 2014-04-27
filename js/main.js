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

  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A simple background for our game
  game.add.sprite(0, 0, 'sky');

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;


  load_level(1);


  // The player and its settings
  player = game.add.sprite(32, game.world.height - 150, 'dude');

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 5;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  scoreText = game.add.text(
    16, 16, 'score: 0',
   { fontSize: '32px', fill: '#000' }
  );
}

function update() {
  game.physics.arcade.collide(player, platforms);
function load_level(index){
  var padding_x=160;
  var padding_y=120;
  if(index == 1){
    var ledge = platforms.create(padding_x, padding_y, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 3, padding_y, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(0, padding_y * 2, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x, padding_y * 2, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 2, padding_y * 2, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 3, padding_y * 2, 'wall');
    ledge.body.immovable = true;


    ledge = platforms.create(padding_x, padding_y * 3, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 2, padding_y * 3, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 3, padding_y * 3, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x, padding_y * 4, 'wall');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 2, padding_y * 4, 'wall');
    ledge.body.immovable = true;


    ledge = platforms.create(padding_x * 2, padding_y, 'wall_up');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 4, padding_y, 'wall_up');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x, padding_y * 3, 'wall_up');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 4, padding_y * 3, 'wall_up');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 3, padding_y * 4, 'wall_up');
    ledge.body.immovable = true;
  }
}
