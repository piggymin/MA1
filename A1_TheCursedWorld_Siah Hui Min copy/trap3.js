class trap3 extends Phaser.Scene {

    constructor() {
        super({ key: 'trap3' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        // this.inventory = data.inventory
    }

    preload() {
        this.load.tilemapTiledJSON("trap3", "assets/Trap3.tmj");

        this.load.image("wallImg", "assets/wall64px.png");
        // this.load.image("foodImg", "assets/food.png");
        // this.load.image("loveImg", "assets/love.png");
        // this.load.image("keyImg", "assets/key.png");
        // this.load.image("mmImg", "assets/mm.png");
        this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });
    }

    create() {
        console.log('*** trap1 scene');

        this.gameMusic=this.sound.add("gameMusic",{loop: true}).setVolume(0.2)
        this.gameMusic.stop()
        this.gameMusic.play()
        
        let map = this.make.tilemap({ key: "trap3" });

        let wallTiles = map.addTilesetImage("wall64px", "wallImg");
        // let foodTiles = map.addTilesetImage("food", "foodImg");
        // let loveTiles = map.addTilesetImage("love", "loveImg");
        // let keyTiles = map.addTilesetImage("key", "keyImg");
        // let mmTiles = map.addTilesetImage("mm", "mmImg");
    

        let tilesArray = [
            // boxTiles, keyTiles, loveTiles, tileTiles, 
            wallTiles, 
            // foodTiles, loveTiles, keyTiles, mmTiles
          ];
          
          this.floorLayer = map.createLayer("floor",tilesArray,0,0)
          this.obstacleLayer = map.createLayer("obstacle",tilesArray,0,0);
          this.itemLayer = map.createLayer("item",tilesArray,0,0);
          
          
          var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");
          this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'pig');
          
          var key = map.findObject("objectLayer", (obj) => obj.name === "key");
          // this.enemy1 = this.physics.add.sprite(key.x, key.y, 'key');
          var love1 = map.findObject("objectLayer", (obj) => obj.name === "love1");
          this.love1 = this.physics.add.sprite(love1.x, love1.y, 'love');
          var love2 = map.findObject("objectLayer", (obj) => obj.name === "love2");
          this.love2 = this.physics.add.sprite(love2.x, love2.y, 'love');
          var love3 = map.findObject("objectLayer", (obj) => obj.name === "love3");
          this.love3 = this.physics.add.sprite(love3.x, love3.y, 'love');
          
          // var corn1 = map.findObject("objectLayer", (obj) => obj.name === "corn1");
          // this.corn1 = this.physics.add.sprite(corn1.x, corn1.y, 'food');
          // var corn2 = map.findObject("objectLayer", (obj) => obj.name === "corn2");
          // this.corn2 = this.physics.add.sprite(corn2.x, corn2.y, 'food');
          // var corn3 = map.findObject("objectLayer", (obj) => obj.name === "corn3");
          // this.corn3 = this.physics.add.sprite(corn3.x, corn3.y, 'food');
          // var corn4 = map.findObject("objectLayer", (obj) => obj.name === "corn4");
          // this.corn4 = this.physics.add.sprite(corn4.x, corn4.y, 'food');
          // var corn5 = map.findObject("objectLayer", (obj) => obj.name === "corn5");
          // this.corn5 = this.physics.add.sprite(corn5.x, corn5.y, 'food');
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

    // Function to jump to trap1
worldmap(player, tile) {
  console.log("worldmap function");
  let playerPos1={}
  playerPos1.x=1860
  playerPos1.y=940
  this.scene.start("worldmap" ,{player:playerPos1});
}



}
