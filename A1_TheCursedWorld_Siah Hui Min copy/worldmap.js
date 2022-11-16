class worldmap extends Phaser.Scene {
  constructor() {
    super({
      key: "worldmap",
    });

    // Put global variable here
  }

  init(data) {
    this.player = data.player
}
  

  create() {
    console.log("*** worldmap scene");

    this.mainMusic=this.sound.add("mainMusic",{loop: true}).setVolume(0.2)
    this.mainMusic.stop()
    this.mainMusic.play()
    


    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "worldmap" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
  
    let wallTiles = map.addTilesetImage("wall64px", "wallImg");
    let decoTiles = map.addTilesetImage("trap", "trapImg");
    let mmTiles = map.addTilesetImage("mm", "mmImg");
    


    // Step 5  create an array of tiles
    let tilesArray = [
      // boxTiles, keyTiles, loveTiles, tileTiles, 
      wallTiles,decoTiles,mmTiles
      
      // loveTiles, keyTiles, trapTiles
    ];

    // Step 6  Load in layers by layers
    this.blankLayer = map.createLayer("blank",tilesArray,0,0);
    this.floorLayer = map.createLayer("floor",tilesArray,0,0)
    this.wallLayer = map.createLayer("wall",tilesArray,0,0);
   this.doorLayer = map.createLayer("door",tilesArray,0,0);
   this.decorationLayer = map.createLayer("decoration",tilesArray,0,0);


    // Add time event / movement here
    // var endPoint = map.findObject("objectLayer",(obj) => obj.name === "end");
    // this.player = this.physics.add.sprite(endPoint.x, endPoint.y, 'pig');
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");
    
    var key = map.findObject("objectLayer", (obj) => obj.name === "key");
    this.enemy1 = this.physics.add.sprite(key.x, key.y, 'key');
    var love1 = map.findObject("objectLayer", (obj) => obj.name === "love1");
    this.love1 = this.physics.add.sprite(love1.x, love1.y, 'love');
    var love2 = map.findObject("objectLayer", (obj) => obj.name === "love2");
    this.love2 = this.physics.add.sprite(love2.x, love2.y, 'love');
    var love3 = map.findObject("objectLayer", (obj) => obj.name === "love3");
    this.love3 = this.physics.add.sprite(love3.x, love3.y, 'love');
    var love4 = map.findObject("objectLayer", (obj) => obj.name === "love4");
    this.love4 = this.physics.add.sprite(love4.x, love4.y, 'love');
    
    var trap1 = map.findObject("objectLayer", (obj) => obj.name === "trap1");
    this.trap1 = this.physics.add.sprite(trap1.x, trap1.y, 'trapImg');
    var trap2 = map.findObject("objectLayer", (obj) => obj.name === "trap2");
    this.trap2 = this.physics.add.sprite(trap2.x, trap2.y, 'trapImg');
    var trap3 = map.findObject("objectLayer", (obj) => obj.name === "trap3");
    this.trap3 = this.physics.add.sprite(trap3.x, trap3.y, 'trapImg');
    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'pig');
    
    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);
    this.player.setCollideWorldBounds(true)
    // Add custom properties in Tiled called "mouintain" as bool
    this.wallLayer.setCollisionByExclusion(-1,true)
    this.physics.world.bounds.width=this.floorLayer.width
    this.physics.world.bounds.height=this.floorLayer.height
    this.physics.add.collider(this.wallLayer, this.player);
    
    window.player = this.player;
    
  
    // Add time event / movement here

this.cursors = this.input.keyboard.createCursorKeys();
 // set bounds so the camera won't go outside the game world
 this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
 // make the camera follow the player
 this.cameras.main.startFollow(this.player);

 // set background color, so the sky is not black
 this.cameras.main.setBackgroundColor("#ccccff");

    
  } /////////////////// end of create //////////////////////////////

  update() {
    if (
      this.player.x > 1270 &&
      this.player.x < 1376 &&
      this.player.y > 1880
    ) {
      this.entrance();
    } else if (
      this.player.x > 1834 &&
      this.player.x > 1840 &&
      this.player.y < 974 &&
      this.player.y > 910
    ) {
      this.Trap1();
    }
    else if (
      this.player.x > 1252 &&
      this.player.x < 1369 &&
      this.player.y < 543 &&
      this.player.y > 536
    ) {
      this.Trap2();
    }
    else if (
      this.player.x < 501 &&
      this.player.y < 672 &&
      this.player.y > 608
    ) {
      this.Trap3();
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

  // Function to jump to entrance
  entrance(player, tile) {
    console.log("entrance function");
    let playerPos={}
    playerPos.x=667
    playerPos.y=717
    this.scene.start("entrance" ,{player:playerPos});
  }

// Function to jump to trap1
  Trap1(player, tile) {
    console.log("trap1 function");
    this.scene.start("trap1");
  }

  Trap2(player, tile) {
    console.log("trap2 function");
    this.scene.start("trap2");
  }

  Trap3(player, tile) {
    console.log("trap3 function");
    this.scene.start("trap3");
  }
}
 //////////// end of class world ////////////////////////
