class worldmap extends Phaser.Scene {
  constructor() {
    super({
      key: "worldmap",
    });

    // Put global variable here
  }

  init(data) {
    this.player = data.player
    this.inventory = data.inventory
}
  

  create() {
    console.log("*** worldmap scene");


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

   this.loveSnd = this.sound.add("collectlove").setVolume(3);
   this.keySnd = this.sound.add("collectkey").setVolume(3);
   this.hitSnd = this.sound.add("hit").setVolume(3);



    // Add time event / movement here
    // var endPoint = map.findObject("objectLayer",(obj) => obj.name === "end");
    // this.player = this.physics.add.sprite(endPoint.x, endPoint.y, 'pig');
    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");
    
  
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
    this.player = this.physics.add.sprite(this.player.x, this.player.y, 'pig').play("up");
    
    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);
    this.player.setCollideWorldBounds(true)
    this.physics.world.bounds.width=this.floorLayer.width
    this.physics.world.bounds.height=this.floorLayer.height
    
    // Add custom properties in Tiled called "mouintain" as bool
    this.wallLayer.setCollisionByExclusion(-1,true)
    this.decorationLayer.setCollisionByExclusion(-1,true)
    this.doorLayer.setCollisionByExclusion(-1,true)
    
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.decorationLayer, this.player);
    this.physics.add.collider(this.doorLayer, this.player);
    
    
    window.player = this.player;
    
  
    // Add time event / movement here

this.cursors = this.input.keyboard.createCursorKeys();
 // set bounds so the camera won't go outside the game world
 this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
 // make the camera follow the player
 this.cameras.main.startFollow(this.player);

 // set background color, so the sky is not black
 this.cameras.main.setBackgroundColor("#ccccff");

 this.physics.add.overlap(this.player, this.love1, this.collectlove, null, this);
 this.physics.add.overlap(this.player, this.love2, this.collectlove, null, this);
 this.physics.add.overlap(this.player, this.love3, this.collectlove, null, this);
 this.physics.add.overlap(this.player, this.love4, this.collectlove, null, this);

 this.time.addEvent({

  delay: 0,

  callback: this.moveDownUp1,

  callbackScope: this,

  loop: false,

});

this.enemy1 = this.physics.add.sprite(1248, 1041, "enemy")
this.enemy1.body.setSize(this.enemy1.width*1,this.enemy1.height*1)
this.physics.add.overlap(this.player, this.enemy1,this.hitenemy,null,this);

this.time.addEvent({

  delay: 0,

  callback: this.moveDownUp2,

  callbackScope: this,

  loop: false,

});

this.enemy2 = this.physics.add.sprite(2342, 583, "enemy")
this.enemy2.body.setSize(this.enemy2.width*1,this.enemy2.height*1)
this.physics.add.overlap(this.player, this.enemy2,this.hitenemy,null,this);

this.time.addEvent({

  delay: 0,

  callback: this.moveDownUp3,

  callbackScope: this,

  loop: false,

});

this.enemy3 = this.physics.add.sprite(672, 537, "enemy")
this.enemy3.body.setSize(this.enemy3.width*1,this.enemy3.height*1)
this.physics.add.overlap(this.player, this.enemy3,this.hitenemy,null,this);



this.time.addEvent({

  delay: 0,

  callback: this.moveDownUp4,

  callbackScope: this,

  loop: false,

});

this.enemy4 = this.physics.add.sprite(672, 1118, "enemy")
this.enemy4.body.setSize(this.enemy4.width*1,this.enemy4.height*1)
this.physics.add.overlap(this.player, this.enemy4,this.hitenemy,null,this);

this.time.addEvent({

  delay: 0,

  callback: this.moveDownUp5,

  callbackScope: this,

  loop: false,

});

this.enemy5 = this.physics.add.sprite(96,175, "enemy")
this.enemy5.body.setSize(this.enemy5.width*1,this.enemy5.height*1)
this.physics.add.overlap(this.player, this.enemy5,this.hitenemy,null,this);


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
      this.player.x > 1270 &&
      this.player.x < 1376 &&
      this.player.y > 1880
    ) {
      this.entrance();
    } 
    else if (
      this.player.x > 1580 &&
      this.player.x < 1650 &&
      this.player.y < 974 &&
      this.player.y > 864 &&
      window.key >=0
    ) {
      this.Trap1();
    } 
    else if (
      this.player.x > 1250 &&
      this.player.x < 1400 &&
      this.player.y < 480 &&
      this.player.y > 416
    ) {
      this.Trap2();
    }
    else if (
      this.player.x > 460 &&
      this.player.x < 501 &&
      this.player.y < 665 &&
      this.player.y > 608
    ) {
      this.Trap3();
    }
      else if (
        this.player.x < 236 &&
        this.player.x > 145 &&
        this.player.y < 165  &&
        this.player.y > 150
      ) {
        this.endScene();
    } else if (
      this.player.x < 236 &&
      this.player.x > 145 &&
      this.player.y < 165  &&
      this.player.y > 150 
    ) {
      this.endScene();
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

  moveDownUp1() {
    console.log("moveDownUp");
    this.tweens.timeline({
    targets: this.enemy1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1500,
    tweens: [
      {
        x: 1376,
      },
      {
        x: 1248
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
  duration: 1500,
  tweens: [
    {
      x: 2464,
    },
    {
      x: 2342
    },
  ],
});
}

moveDownUp3() {
  console.log("moveDownUp");
  this.tweens.timeline({
  targets: this.enemy3,
  ease: "Linear",
  loop: -1, // loop forever
  duration: 1500,
  tweens: [
    {
      x: 800,
    },
    {
      x: 672
    },
  ],
});
}

moveDownUp4() {
  console.log("moveDownUp");
  this.tweens.timeline({
  targets: this.enemy4,
  ease: "Linear",
  loop: -1, // loop forever
  duration: 1500,
  tweens: [
    {
      x: 800,
    },
    {
      x: 672
    },
  ],
});
}

moveDownUp5() {
  console.log("moveDownUp");
  this.tweens.timeline({
  targets: this.enemy5,
  ease: "Linear",
  loop: -1, // loop forever
  duration: 1500,
  tweens: [
    {
      x: 288,
    },
    {
      x: 96
    },
  ],
});
}

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

  endScene(player, tile) {
    console.log("trap3 function");
    this.scene.start("endScene");
  }
  
  collectlove(player,love){

    console.log("collectlove");
    this.loveSnd.play()
  // this.Collectlove_snd.play()
  
  window.heart++
  if (window.heart > 3){
    window.heart = 3;
  }
  
  love.disableBody(true,true);
  
  updateInventory.call(this)
  }
  

  hitenemy(player,enemy){

    console.log("enemy overlap player")
  
    // lose a life
  
    //shake the camera
  
    this.cameras.main.shake(100);
  
    window.heart--
    
    this.hitSnd.play()
  
    enemy.disableBody(true,true);
  
    updateInventory.call(this)
    
    if (window.heart == 0){
     
      this.scene.stop('worldmap');
      this.scene.stop('showInventory');
      this.scene.start("gameover")
     
    }
  }
  
 
}

window.key= 0
window.heart = 3

    
 //////////// end of class world ////////////////////////
