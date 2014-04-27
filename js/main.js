var game = new Phaser.Game(
    800, 600, Phaser.AUTO, '',
    { preload: preload, create: create, update: update }
  );

var platforms;
var memories;
var player;
var score = 0;
var scoreText;
var finished_text;

function preload() {
  game.load.image('bg', 'assets/deep_bg.png');
  game.load.image('wall', 'assets/wall160x16.png');
  game.load.image('wall_up', 'assets/wall16x160.png');
  game.load.image('watch', 'assets/watch.png');
  game.load.image('doll', 'assets/doll.png');
  game.load.image('cupcake', 'assets/cupcake.png');
  game.load.spritesheet('girl', 'assets/girl.png', 41, 48);

  cursors = game.input.keyboard.createCursorKeys();
}

function create() {

  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A simple background for our game
  game.add.sprite(0, 0, 'bg');

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  memories = game.add.group();

  load_level(1);

  // The player and its settings
  player = game.add.sprite(416, game.world.height - 60, 'girl');

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 3;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  // player.animations.add('left', [0, 1, 2, 3], 10, true);
  // player.animations.add('right', [5, 6, 7, 8], 10, true);

  scoreText = game.add.text(
    16, 16, 'Memories: 0',
   { fontSize: '20px', fill: '#fff' }
  );

  finished_text = game.add.text(
    game.world.width/2, game.world.height/2, '',
    { fontSize: '32px', fill: '#fff' }
  );
}

function update() {
  //  Collide the player and the stars with the platforms
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, memories, collect_memories, null, this);

  //  Reset the players velocity (movement)
  if(player.body.velocity.x > -1 && player.body.velocity.x <= 0){
    player.body.velocity.x = 0;
    player.body.acceleration.x = 0;
  }
  else if(player.body.velocity.x < 1 && player.body.velocity.x >= 0){
    player.body.velocity.x = 0;
    player.body.acceleration.x = 0;
  }

  if (cursors.left.isDown)
  {
    //  Move to the left
    player.body.velocity.x = -25;
    player.body.acceleration.x = 3;

    // player.animations.play('left');
  }
  else if (cursors.right.isDown)
  {
    //  Move to the right
    player.body.velocity.x = 25;
    player.body.acceleration.x = -3;

    // player.animations.play('right');
  }


  if (cursors.up.isDown)
  {
    player.body.velocity.y = -25;
  }
  else if (cursors.down.isDown)
  {
    player.body.velocity.y = 25;
  }

  if(cursors.down.isUp && cursors.up.isUp &&
    cursors.left.isUp && cursors.right.isUp)
  {
    //  Stand still
    player.animations.stop();

    player.frame = 4;
  }
}

function collect_memories (player, item) {
  // Removes the star from the screen
  item.kill();

  //  Add and update the score
  score += 1;
  scoreText.text = 'Memories: ' + score;

  memories_collected();
}

function memories_collected(){
  if(memories.countLiving() == 0){
    finished_text.text = 'All memories retrieved...';
  }
}


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

    ledge = platforms.create(padding_x * 2, padding_y * 3, 'wall_up');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 4, padding_y * 3, 'wall_up');
    ledge.body.immovable = true;

    ledge = platforms.create(padding_x * 3, padding_y * 4, 'wall_up');
    ledge.body.immovable = true;


    // Place itens to wake up
    var item = memories.create(380, 420, 'cupcake');
    game.physics.arcade.enable(item);
    item.body.gravity.y = 0;

    item = memories.create(220, 180, 'doll');
    game.physics.arcade.enable(item);
    item.body.gravity.y = 0;

    item = memories.create(580, 180, 'watch');
    game.physics.arcade.enable(item);
    item.body.gravity.y = 0;

  }
}
