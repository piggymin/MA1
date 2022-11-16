class entrance extends Phaser.Scene {
  constructor() {
    super({
      key: "entrance",
    });

    // Put global variable here
  }


   init(data) {
        this.player = data.player
    }
    

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("entrance", "assets/entrance.tmj");

    // Step 2 : Preload any images here
  
    this.load.image("buildingImg", "assets/building.png");
    this.load.image("fireImg", "assets/fire.png");
    this.load.image("wallImg", "assets/wall64px.png");
    this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });
  }
  

  create() {
    console.log("*** entrance scene");    

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "entrance" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
  
    let wallTiles = map.addTilesetImage("wall64px", "wallImg");
    let buildingTiles = map.addTilesetImage("building", "buildingImg");
    let fireTiles = map.addTilesetImage("fire", "fireImg");



    // Step 5  create an array of tiles
    let tilesArray = [
      wallTiles, buildingTiles, fireTiles
    ];

    // Step 6  Load in layers by layers
     this.floorLayer = map.createLayer("floor",tilesArray,0,0)
      this.wallLayer = map.createLayer("wall",tilesArray,0,0);
    this.buildingLayer = map.createLayer("building",tilesArray,0,0);
    this.itemLayer = map.createLayer("item",tilesArray,0,0);
  
   
  
    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(this.player.x,this.player.y, 'pig');
    
    window.player = this.player;

    this.player.setCollideWorldBounds(true)
    this.wallLayer.setCollisionByExclusion(-1,true)
    this.physics.world.bounds.width=this.floorLayer.width
    this.physics.world.bounds.height=this.floorLayer.height

    // this.player.setCollideWorldBounds(true);

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    this.physics.add.collider(this.wallLayer, this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    // set bounds so the camera won't go outside the game world
 this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
 // make the camera follow the player
 this.cameras.main.startFollow(this.player);

 // set background color, so the sky is not black
 this.cameras.main.setBackgroundColor("#ccccff");

//  this.decorLayer.setCollisionByExclusion(-1, true);
 this.buildingLayer.setCollisionByExclusion(-1, true);

//  this.physics.add.collider(this.player, this.decorLayer);
 this.physics.add.collider(this.player, this.buildingLayer);
  

  } /////////////////// end of create //////////////////////////////

  update() { 
    if (
      this.player.x > 635 &&
      this.player.x < 670 &&
      this.player.y < 674
    ) {
      this.worldmap();
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
   
  } /////////////////// end of update //////////////////////////////

// Function to jump to worldmap
worldmap(player, tile) {
  console.log("worldmap function");
  this.scene.start("worldmap");
}
}//////////// end of class world ////////////////////////
