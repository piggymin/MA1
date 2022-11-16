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
    // this.load.image("loveImg", "assets/love.png");
    // this.load.image("keyImg", "assets/key.png");
    // this.load.image("boxImg", "assets/box.png");
    this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });
  }
  

  create() {
    console.log("*** trap2 scene");

    this.gameMusic=this.sound.add("gameMusic",{loop: true}).setVolume(0.2)
    this.gameMusic.stop()
    this.gameMusic.play()

    
    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "trap2" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
  
    let wallTiles = map.addTilesetImage("wall 64px", "wallImg");
    let tileTiles = map.addTilesetImage("tile64px", "tileImg");
    // let loveTiles = map.addTilesetImage("love", "loveImg");
    // let keyTiles = map.addTilesetImage("key", "keyImg");
    // let boxTiles = map.addTilesetImage("box", "boxImg");
    


    // Step 5  create an array of tiles
    let tilesArray = [
      wallTiles, tileTiles, 
      // loveTiles, keyTiles, boxTiles
    ];

    // Step 6  Load in layers by layers
    this.floorLayer = map.createLayer("floor",tilesArray,0,0)
    this.blankLayer = map.createLayer("blank",tilesArray,0,0);
    this.wallLayer = map.createLayer("wall",tilesArray,0,0);
    this.doorLayer = map.createLayer("door",tilesArray,0,0);
    // this.itemLayer = map.createLayer("item",tilesArray,0,0);
  

    // Add main player here with physics.add.sprite
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");
    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'pig');
    // this.player = this.physics.add.sprite(100,0, 'pig');
    var key = map.findObject("objectLayer", (obj) => obj.name === "key");
    this.enemy1 = this.physics.add.sprite(key.x, key.y, 'key');
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
    var box5 = map.findObject("objectLayer", (obj) => obj.name === "box5");
    this.box5 = this.physics.add.sprite(box5.x, box5.y, 'box');
    
    this.player.setCollideWorldBounds(true)
    // this.wall.setCollisionByProperty({ wall: true }) 
    this.wallLayer.setCollisionByExclusion(-1,true)
    this.doorLayer.setCollisionByExclusion(-1, true);
    
    this.physics.world.bounds.width=this.floorLayer.width
    this.physics.world.bounds.height=this.floorLayer.height


    window.player = this.player;
  
    // Add time event / movement here

this.cursors = this.input.keyboard.createCursorKeys();
 // set bounds so the camera won't go outside the game world
 this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
 // make the camera follow the player
 this.cameras.main.startFollow(this.player);

 // set background color, so the sky is not black
 this.cameras.main.setBackgroundColor("#ccccff");

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.doorLayer, this.player);
    // create the arrow keys
  


  } /////////////////// end of create //////////////////////////////

  update() {
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
  } /////////////////// end of update //////////////////////////////

}
 //////////// end of class world ////////////////////////
