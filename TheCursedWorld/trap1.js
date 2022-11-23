class trap1 extends Phaser.Scene {

    constructor() {
        super({ key: 'trap1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    

    preload() {
        this.load.tilemapTiledJSON("trap1", "assets/Trap1.tmj");

        this.load.image("wallImg", "assets/wall64px.png");
        this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });
    }

    create() {
        console.log('*** trap1 scene');

        this.gameMusic=this.sound.add("gameMusic",{loop: true}).setVolume(0.2)
        this.gameMusic.stop()
        this.gameMusic.play()

    
        
        let map = this.make.tilemap({ key: "trap1" });

        let wallTiles = map.addTilesetImage("wall64px", "wallImg");
    

        let tilesArray = [
            wallTiles
          ];
          
          this.floorLayer = map.createLayer("floor",tilesArray,0,0)
          this.obstacleLayer = map.createLayer("obstacle",tilesArray,0,0);
          this.itemLayer = map.createLayer("item",tilesArray,0,0);
          
          
          var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");
          this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'pig').play("down");
          
          var key = map.findObject("objectLayer", (obj) => obj.name === "key");
          this.key = this.physics.add.sprite(key.x, key.y, 'key');
          var love1 = map.findObject("objectLayer", (obj) => obj.name === "love1");
          this.love1 = this.physics.add.sprite(love1.x, love1.y, 'love');
          var love2 = map.findObject("objectLayer", (obj) => obj.name === "love2");
          this.love2 = this.physics.add.sprite(love2.x, love2.y, 'love');
          var love3 = map.findObject("objectLayer", (obj) => obj.name === "love3");
          this.love3 = this.physics.add.sprite(love3.x, love3.y, 'love');
          
          var corn1 = map.findObject("objectLayer", (obj) => obj.name === "corn1");
          this.corn1 = this.physics.add.sprite(corn1.x, corn1.y, 'food');
          var corn2 = map.findObject("objectLayer", (obj) => obj.name === "corn2");
          this.corn2 = this.physics.add.sprite(corn2.x, corn2.y, 'food');
          var corn3 = map.findObject("objectLayer", (obj) => obj.name === "corn3");
          this.corn3 = this.physics.add.sprite(corn3.x, corn3.y, 'food');
          var corn4 = map.findObject("objectLayer", (obj) => obj.name === "corn4");
          this.corn4 = this.physics.add.sprite(corn4.x, corn4.y, 'food');
          var corn5 = map.findObject("objectLayer", (obj) => obj.name === "corn5");
          this.corn5 = this.physics.add.sprite(corn5.x, corn5.y, 'food');
          window.player = this.player;
  
          this.player.setCollideWorldBounds(true)
          // this.wall.setCollisionByProperty({ wall: true }) 
          this.obstacleLayer.setCollisionByExclusion(-1,true)
          this.physics.world.bounds.width=this.floorLayer.width
          this.physics.world.bounds.height=this.floorLayer.height
          this.physics.add.collider(this.obstacleLayer, this.player);
  
      this.cursors = this.input.keyboard.createCursorKeys();
       // set bounds so the camera won't go outside the game world
       this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
       // make the camera follow the player
       this.cameras.main.startFollow(this.player);
      
       // set background color, so the sky is not black
       this.cameras.main.setBackgroundColor("#ccccff");
       
       this.itemLayer.setCollisionByExclusion(-1, true);

       //  this.physics.add.collider(this.player, this.decorLayer);
        this.physics.add.collider(this.player, this.itemLayer);

        this.physics.add.overlap(this.player, this.love1, collectlove, null, this);
        this.physics.add.overlap(this.player, this.love2, collectlove, null, this);
        this.physics.add.overlap(this.player, this.love3, collectlove, null, this);
        
        this.physics.add.overlap(this.player, this.corn1, collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn2, collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn3, collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn4, collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn5, collectfood, null, this);
        
        this.physics.add.overlap(this.player, this.key, collectkey, null, this);
 
        var cursors;
        var score = 0;
        var scoreText;
        var game = new Phaser.Game(config);
        scoreText = this.add.text(30, 30, 'score: 0', { fontSize: '40px', fill: '#ccccff' });

        this.time.addEvent({

          delay: 0,
    
          callback: this.moveDownUp1,
    
          callbackScope: this,
    
          loop: false,
    
        });
    
        this.enemy1 = this.physics.add.sprite(353, 162, "enemy")
        this.enemy1.body.setSize(this.enemy1.width*1,this.enemy1.height*1)
        this.physics.add.overlap(this.player, this.enemy1,this.overlap,null,this);

        this.time.addEvent({

          delay: 0,
    
          callback: this.moveDownUp2,
    
          callbackScope: this,
    
          loop: false,
    
        });
    
        this.enemy2 = this.physics.add.sprite(675, 1061, "enemy")
        this.enemy2.body.setSize(this.enemy2.width*1,this.enemy2.height*1)
        this.physics.add.overlap(this.player, this.enemy2,this.overlap,null,this);
        

        this.time.addEvent({

          delay: 0,
    
          callback: this.moveDownUp3,
    
          callbackScope: this,
    
          loop: false,
    
        });
    
        this.enemy3 = this.physics.add.sprite(995, 162, "enemy")
        this.enemy3.body.setSize(this.enemy3.width*1,this.enemy3.height*1)
        this.physics.add.overlap(this.player, this.enemy3,this.overlap,null,this);
    }

    update() {
       if (
        this.player.x > 1571 &&
        this.player.x < 1634 &&
        this.player.y < 165
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
    }


    // Function to jump to worldmap
worldmap(player, tile) {
  console.log("worldmap function");
  let playerPos={}
  playerPos.x=1850
  playerPos.y=928
  this.scene.start("worldmap" ,{player:playerPos});
}

overlap(){

  console.log("enemy overlap player")

  // lose a life

  //shake the camera

  this.cameras.main.shake(20);

  //play a sound

}
moveDownUp1() {
    console.log("moveDownUp");
    this.tweens.timeline({
    targets: this.enemy1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 2500,
    tweens: [
      {
        y: 1052,
      },
      {
        y: 162
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
  duration: 2500,
  tweens: [
    {
      y: 100,
    },
    {
      y: 1061
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
  duration: 2500,
  tweens: [
    {
      y: 1052,
    },
    {
      y: 162
    },
  ],
});
}

}

   function collectlove (pig, love1)
    {
        love1.disableBody(true, true);
    }
    function collectlove (pig, love2)
    {
        love2.disableBody(true, true);
    }
    function collectlove (pig, love3)
    {
        love3.disableBody(true, true);
    }

    function collectfood (pig, corn1)
    {
        corn1.disableBody(true, true);

        score += 100;
        scoreText.setText('Score:'+ score);
    }
    function collectfood (pig, corn2)
    {
        corn2.disableBody(true, true);
    }
    function collectfood (pig, corn3)
    {
        corn3.disableBody(true, true);
    }
    function collectfood (pig, corn4)
    {
        corn4.disableBody(true, true);
    }
    function collectfood (pig, corn5)
    {
        corn5.disableBody(true, true);
    }
    function collectkey (pig, key)
    {
        key.disableBody(true, true);
    }

    
    // function collectfood (pig, corn1)
    // {
    //     corn1.disableBody(true, true);
    //     this.cameras.main.shake(200)
    // }
