class trap3 extends Phaser.Scene {

    constructor() {
        super({ key: 'trap3' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
        this.load.tilemapTiledJSON("trap3", "assets/Trap3.tmj");

        this.load.image("wallImg", "assets/wall64px.png");
        this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });
    }

    create() {
        console.log('*** trap1 scene');
        
        let map = this.make.tilemap({ key: "trap3" });

        let wallTiles = map.addTilesetImage("wall64px", "wallImg");
    

        let tilesArray = [
            wallTiles
          ];
          
          this.floorLayer = map.createLayer("floor",tilesArray,0,0)
          this.obstacleLayer = map.createLayer("obstacle",tilesArray,0,0);
          this.itemLayer = map.createLayer("item",tilesArray,0,0);
          
          this.loveSnd = this.sound.add("collectlove").setVolume(3);
          this.keySnd = this.sound.add("collectkey").setVolume(3);
          this.hitSnd = this.sound.add("hit").setVolume(3);

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
          var corn6 = map.findObject("objectLayer", (obj) => obj.name === "corn6");
          this.corn6 = this.physics.add.sprite(corn6.x, corn6.y, 'food');
          var corn7 = map.findObject("objectLayer", (obj) => obj.name === "corn7");
          this.corn7 = this.physics.add.sprite(corn7.x, corn7.y, 'food');

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

       this.cameras.main.setBackgroundColor("#ccccff");
       
       this.itemLayer.setCollisionByExclusion(-1, true);

        this.physics.add.collider(this.player, this.itemLayer);

        this.physics.add.overlap(this.player, this.love1, this.collectlove, null, this);
        this.physics.add.overlap(this.player, this.love2, this.collectlove, null, this);
        this.physics.add.overlap(this.player, this.love3, this.collectlove, null, this);
        
        this.physics.add.overlap(this.player, this.corn1, this.collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn2, this.collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn3, this.collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn4, this.collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn5, this.collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn6, this.collectfood, null, this);
        this.physics.add.overlap(this.player, this.corn7, this.collectfood, null, this);

        this.physics.add.overlap(this.player, this.key, this.collectkey, null, this);

        this.scene.launch("showInventory")
        this.time.addEvent({

            delay: 0,
      
            callback: this.moveDownUp1,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy1 = this.physics.add.sprite(353, 162, "enemy")
          this.enemy1.body.setSize(this.enemy1.width*1,this.enemy1.height*1)
          this.physics.add.overlap(this.player, this.enemy1,this.hitenemy,null,this);

          this.time.addEvent({

            delay: 0,
      
            callback: this.moveDownUp2,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy2 = this.physics.add.sprite(675, 1061, "enemy")
          this.enemy2.body.setSize(this.enemy2.width*1,this.enemy2.height*1)
          this.physics.add.overlap(this.player, this.enemy2,this.hitenemy,null,this);
          
  
          this.time.addEvent({
  
            delay: 0,
      
            callback: this.moveDownUp3,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy3 = this.physics.add.sprite(995, 162, "enemy")
          this.enemy3.body.setSize(this.enemy3.width*1,this.enemy3.height*1)
          this.physics.add.overlap(this.player, this.enemy3,this.hitenemy,null,this);

          this.time.addEvent({
  
            delay: 0,
      
            callback: this.moveDownUp4,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy4 = this.physics.add.sprite(1314, 1061, "enemy")
          this.enemy4.body.setSize(this.enemy4.width*1,this.enemy4.height*1)
          this.physics.add.overlap(this.player, this.enemy4,this.hitenemy,null,this);

          
          this.time.addEvent({
  
            delay: 0,
      
            callback: this.moveDownUp5,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy5 = this.physics.add.sprite(1632, 162, "enemy")
          this.enemy5.body.setSize(this.enemy5.width*1,this.enemy5.height*1)
          this.physics.add.overlap(this.player, this.enemy5,this.hitenemy,null,this);

          this.time.addEvent({
  
            delay: 0,
      
            callback: this.moveDownUp6,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy6 = this.physics.add.sprite(159, 416, "enemy")
          this.enemy6.body.setSize(this.enemy6.width*1,this.enemy6.height*1)
          this.physics.add.overlap(this.player, this.enemy6,this.hitenemy,null,this);

          this.time.addEvent({
  
            delay: 0,
      
            callback: this.moveDownUp7,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy7 = this.physics.add.sprite(802, 608, "enemy")
          this.enemy7.body.setSize(this.enemy7.width*1,this.enemy7.height*1)
          this.physics.add.overlap(this.player, this.enemy7,this.hitenemy,null,this);

          this.time.addEvent({
  
            delay: 0,
      
            callback: this.moveDownUp8,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy8 = this.physics.add.sprite(1435, 864, "enemy")
          this.enemy8.body.setSize(this.enemy8.width*1,this.enemy8.height*1)
          this.physics.add.overlap(this.player, this.enemy8,this.hitenemy,null,this);

          this.time.addEvent({
  
            delay: 0,
      
            callback: this.moveDownUp9,
      
            callbackScope: this,
      
            loop: false,
      
          });
      
          this.enemy9 = this.physics.add.sprite(2082,608, "enemy")
          this.enemy9.body.setSize(this.enemy9.width*1,this.enemy9.height*1)
          this.physics.add.overlap(this.player, this.enemy9,this.hitenemy,null,this);
  
  
          this.scene.launch("showInventory")

          this.time.addEvent({

            delay: 0,
          
            callback: updateInventory,
          
            callbackScope: this,
          
            loop: false,
          
          });
          
    }

    update() {
       if (
        this.player.x > 2271 &&
        this.player.x < 2338 &&
        this.player.y < 165 &&
        window.key >= 3 &&
        window.food >=12
      ) {
        this.worldmap();
      }else if (
        this.player.x > 2271 &&
        this.player.x < 2338 &&
        this.player.y < 165 &&
        window.key <= 3 &&
        window.food <=12
      ) {
        console.log("can't go to worldmap, not enough key/food")
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

    // Function to jump to trap3
    worldmap(player, tile) {
      console.log("worldmap function");
      let playerPos={}
      playerPos.x=288
      playerPos.y=672
      this.scene.start("worldmap" ,{player:playerPos});
    }

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
          duration: 2000,
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
        duration: 2000,
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
        duration: 2000,
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

      moveDownUp4() {
        console.log("moveDownUp");
        this.tweens.timeline({
        targets: this.enemy4,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 2000,
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

      moveDownUp5() {
        console.log("moveDownUp");
        this.tweens.timeline({
        targets: this.enemy5,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 2000,
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

      moveDownUp6() {
        console.log("moveDownUp");
        this.tweens.timeline({
        targets: this.enemy6,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1500,
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

      moveDownUp7() {
        console.log("moveDownUp");
        this.tweens.timeline({
        targets: this.enemy7 ,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1500,
        tweens: [
          {
            y: 480,
          },
          {
            y: 608
          },
        ],
      });
      }

      moveDownUp8() {
        console.log("moveDownUp");
        this.tweens.timeline({
        targets: this.enemy8 ,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1500,
        tweens: [
          {
            y: 746,
          },
          {
            y: 864
          },
        ],
      });
      }

      moveDownUp9() {
        console.log("moveDownUp");
        this.tweens.timeline({
        targets: this.enemy9 ,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1500,
        tweens: [
          {
            y: 480,
          },
          {
            y: 608
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
      
      collectfood(player,food){
        console.log("collectfood");
      
        this.keySnd.play()
      
      window.food++
      
      food.disableBody(true,true);
      
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
     
          this.scene.stop('trap3');
          this.scene.stop('showInventory');
          this.scene.start("gameover")
         
        }
      }

}


    window.key = 0
window.heart = 3
