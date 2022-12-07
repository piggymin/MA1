class gameover extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameover' });
    }

preload() {
    // this.mapmade with Tiled in JSON format
    this.load.tilemapTiledJSON("entrance", "assets/entrance.tmj");
    this.load.tilemapTiledJSON('trap2', 'assets/Trap2.tmj');
    this.load.tilemapTiledJSON("trap1", "assets/Trap1.tmj");
    this.load.tilemapTiledJSON("worldmap", "assets/worldmap.tmj");

    
    this.load.image("love", "assets/love.png");
    this.load.image("food", "assets/food.png");
    this.load.image("mmImg", "assets/mm.png");
    this.load.image("trapImg", "assets/trap.png");
    this.load.image("wallImg", "assets/wall64px.png");
    this.load.image("box", "assets/box.png");
    this.load.image("enemy", "assets/enemy.png");
    this.load.image("main","assets/main.png")
    this.load.image("storylineImg","assets/storyline.png")
    this.load.image("gameplay1Img","assets/gameplay1.png")
    this.load.image("gameplay2Img","assets/gameplay2.png")
    this.load.image("howtoplayImg","assets/howtoplay.png")
    this.load.image("gameoverImg","assets/gameover.png")

    this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });

    // this.load.spritesheet('fire', 'assets/fire.png',{ frameWidth:40, frameHeight:70 });
}

create() {
console.log("gameover")
    this.add.image(650,650,"gameoverImg")
    window.gameMusic.stop()
    
    var spaceDown = this.input.keyboard.addKey('SPACE');
    window.key=0
    window.heart=3


        spaceDown.on(
            "down",
            function () {
            console.log("Jump to entrance");
            let playerPos = {};
            playerPos.x = 247;
            playerPos.y = 163;
            playerPos.facing ="down"
            console.log(playerPos)
            this.scene.start("entrance",{player: playerPos});
            window.gameMusic.stop()
        },
        this
        );


  var rDown = this.input.keyboard.addKey('R');
        
      rDown.on('down', function(){
      console.log("R pressed (restart game)");
          this.scene.start("preloadScene");
          window.gameMusic.stop()
          window.key=0
      }, this );

    
        this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("pig", { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1,
        });
    
        this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("pig", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1,
        });
    
        this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("pig", { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1,
        });

     this.anims.create({
       key: "left",
        frames: this.anims.generateFrameNumbers("pig", { start: 9, end: 11 }),
       frameRate: 10,
       repeat: -1,
       });

      
}

} // end of class
