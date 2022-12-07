class trap2 extends Phaser.Scene {
  constructor() {
    super({
      key: "trap2",
    });

    // Put global variable here
  }

  init(data) {
    this.player = data.player
    this.inventory = data.inventory
}

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("trap2", "assets/Trap2.tmj");

    // Step 2 : Preload any images here
  
    this.load.image("wallImg", "assets/wall64px.png");
    this.load.image("tileImg", "assets/tile64px.png");
    this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });
  }
  

  create() {
    console.log("*** trap2 scene");
    
    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "trap2" });
  
    let wallTiles = map.addTilesetImage("wall 64px", "wallImg");
    let tileTiles = map.addTilesetImage("tile64px", "tileImg");

    


    // Step 5  create an array of tiles
    let tilesArray = [
      wallTiles, tileTiles
    ];

    // Step 6  Load in layers by layers
    this.floorLayer = map.createLayer("floor",tilesArray,0,0)
    this.blankLayer = map.createLayer("blank",tilesArray,0,0);
    this.wallLayer = map.createLayer("wall",tilesArray,0,0);
    this.doorLayer = map.createLayer("door",tilesArray,0,0);
    // this.itemLayer = map.createLayer("item",tilesArray,0,0);
  
    this.loveSnd = this.sound.add("collectlove").setVolume(3);
    this.keySnd = this.sound.add("collectkey").setVolume(3);
    this.hitSnd = this.sound.add("hit").setVolume(3);

    // Add main player here with physics.add.sprite
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");
    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'pig');
    // this.player = this.physics.add.sprite(100,0, 'pig');
    var key = map.findObject("objectLayer", (obj) => obj.name === "key");
    this.key = this.physics.add.sprite(key.x, key.y, 'key');
    var love1 = map.findObject("objectLayer", (obj) => obj.name === "love1");
    this.love1 = this.physics.add.sprite(love1.x, love1.y, 'love');
    var love2 = map.findObject("objectLayer", (obj) => obj.name === "love2");
    this.love2 = this.physics.add.sprite(love2.x, love2.y, 'love');
    var love3 = map.findObject("objectLayer", (obj) => obj.name === "love3");
    this.love3 = this.physics.add.sprite(love3.x, love3.y, 'love');
    var box1 = map.findObject("objectLayer", (obj) => obj.name === "box1");
    this.box1 = this.physics.add.sprite(box1.x, box1.y, 'box');
    var box2 = map.findObject("objectLayer", (obj) => obj.name === "box2");
    this.box2 = this.physics.add.sprite(box2.x, box2.y, 'box');
    var box3 = map.findObject("objectLayer", (obj) => obj.name === "box3");
    this.box3 = this.physics.add.sprite(box3.x, box3.y, 'box');
    var box4 = map.findObject("objectLayer", (obj) => obj.name === "box4");
    this.box4 = this.physics.add.sprite(box4.x, box4.y, 'box');
    
    
    this.player.setCollideWorldBounds(true) 
    this.wallLayer.setCollisionByExclusion(-1,true)
    this.doorLayer.setCollisionByExclusion(-1, true);
    this.box1.setBounce(0.1);
    this.box1.setCollideWorldBounds(true);
    
    this.physics.world.bounds.width=this.floorLayer.width
    this.physics.world.bounds.height=this.floorLayer.height

    window.player = this.player;

    this.physics.add.overlap(this.player, this.love1, this.collectlove, null, this);
    this.physics.add.overlap(this.player, this.love2, this.collectlove, null, this);
    this.physics.add.overlap(this.player, this.love3, this.collectlove, null, this);

    this.physics.add.overlap(this.player, this.key, this.collectkey, null, this);


this.cursors = this.input.keyboard.createCursorKeys();
 // set bounds so the camera won't go outside the game world
 this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
 // make the camera follow the player
 this.cameras.main.startFollow(this.player);

 this.cameras.main.setBackgroundColor("#ccccff");

    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.wallLayer, this.box1);
    this.physics.add.collider(this.wallLayer, this.box2);
    this.physics.add.collider(this.wallLayer, this.box3);
    this.physics.add.collider(this.wallLayer, this.box4);
    this.physics.add.collider(this.wallLayer, this.box5);
    this.physics.add.collider(this.doorLayer, this.player);
    this.physics.add.collider(this.player,this.box1);
    this.physics.add.collider(this.player,this.box2);
    this.physics.add.collider(this.player,this.box3);
    this.physics.add.collider(this.player,this.box4);
    
    
    this.scene.launch("showInventory")
    this.time.addEvent({

      delay: 0,

      callback: this.moveDownUp1,

      callbackScope: this,

      loop: false,

    });

    this.enemy1 = this.physics.add.sprite(454, 608, "enemy")
    this.enemy1.body.setSize(this.enemy1.width*1,this.enemy1.height*1)
    this.physics.add.overlap(this.player, this.enemy1,this.hitenemy,null,this);

    this.time.addEvent({

      delay: 0,

      callback: this.moveDownUp2,

      callbackScope: this,

      loop: false,

    });

    this.enemy2 = this.physics.add.sprite(672, 416, "enemy")
    this.enemy2.body.setSize(this.enemy2.width*1,this.enemy2.height*1)
    this.physics.add.overlap(this.player, this.enemy2,this.hitenemy,null,this);

    this.scene.launch("showInventory")

    this.time.addEvent({

      delay: 0,
    
      callback: updateInventory,
    
      callbackScope: this,
    
      loop: false,
    
    });
    
  } /////////////////// end of create //////////////////////////////

  update() {
    if (
      this.player.x > 416 &&
      this.player.x < 479 &&
      this.player.y < 300 &&
      window.key >= 2
    ) {
      this.worldmap();
    }else if (
      this.player.x > 416 &&
      this.player.x < 479 &&
      this.player.y < 300 &&
      window.key <= 2
    ) {
      console.log("can't go to worldmap, not enough key")
    }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); // walk left
      this.player.flipX = false; // flip the sprite to the left
      //console.log('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("left", true);
      this.player.flipX = true; // use the original sprite looking to the right
      //console.log('right');
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up", true);
      //console.log('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
      //console.log('idle');
    }
  }
  // Function to jump to worldmap
  worldmap(player, tile) {
  console.log("worldmap function");
  let playerPos={}
  playerPos.x=1300
  playerPos.y=380
  this.scene.start("worldmap" ,{player:playerPos});
}
  /////////////////// end of update //////////////////////////////
  overlap(){

    console.log("enemy overlap player")
  
    this.cameras.main.shake(20);
  }
  moveDownUp1() {
      console.log("moveDownUp");
      this.tweens.timeline({
      targets: this.enemy1,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1400,
      tweens: [
        {
          y: 736,
        },
        {
          y: 608
        },
      ],
    });
  }

  moveDownUp2() {
    console.log("moveDownUp");
    this.tweens.timeline({
    targets: this.enemy2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1400,
    tweens: [
      {
        y: 288,
      },
      {
        y: 416
      },
    ],
  });
}

collectlove(player,love){

  console.log("collectlove");

  this.loveSnd.play()

window.heart++
if (window.heart > 3){
  window.heart = 3;
}

love.disableBody(true,true);

updateInventory.call(this)
}


collectkey(player,key){
  console.log("collectkey");

  this.keySnd.play()

window.key++

key.disableBody(true,true);

updateInventory.call(this)
}

hitenemy(player,enemy){

  console.log("enemy overlap player")

  this.cameras.main.shake(100);

  window.heart--

  this.hitSnd.play()

  enemy.disableBody(true,true);

  updateInventory.call(this)

  if (window.heart == 0){
     
    this.scene.stop('trap2');
    this.scene.stop('showInventory');
    this.scene.start("gameover")
  }
}
}


    window.key = 0
    window.heart = 3
    

 

 //////////// end of class world ////////////////////////
