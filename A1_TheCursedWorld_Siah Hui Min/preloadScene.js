class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

preload() {
    // this.mapmade with Tiled in JSON format
    this.load.tilemapTiledJSON("entrance", "assets/entrance.tmj");
    this.load.tilemapTiledJSON('trap2', 'assets/Trap2.tmj');
    this.load.tilemapTiledJSON("trap1", "assets/Trap1.tmj");
    this.load.tilemapTiledJSON("worldmap", "assets/worldmap.tmj");

    
    this.load.image("key", "assets/key.png");
    this.load.image("love", "assets/love.png");
    this.load.image("food", "assets/food.png");
    this.load.image("mmImg", "assets/mm.png");
    this.load.image("trapImg", "assets/trap.png");
    this.load.image("wallImg", "assets/wall64px.png");
    this.load.image("box", "assets/box.png");
    this.load.image("enemy", "assets/enemy.png");
    this.load.image("main","assets/main.png")


    this.load.audio("mainMusic", "assets/main-music.mp3");
    this.load.audio("gameMusic", "assets/game-music.mp3");


    // this.playeranimations
    //this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    // this.load.atlas('girl', 'assets/girl.png', 'assets/girl.json');

    //  is 64x64 9 frames per animation
    this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });

    // this.load.spritesheet('fire', 'assets/fire.png',{ frameWidth:40, frameHeight:70 });
}

create() {
console.log("preloadScene")
    this.add.image(650,650,"main")
  
    var spaceDown = this.input.keyboard.addKey('SPACE');

    var key1 = this.input.keyboard.addKey(49);
    var key2 = this.input.keyboard.addKey(50);
    var key3 = this.input.keyboard.addKey(51);
  

    key1.on('down', function(){
        this.scene.start("trap1");
        }, this );

        key2.on('down', function(){
            this.scene.start("trap2");
            }, this );
            key3.on('down', function(){
                this.scene.start("trap3");
                }, this );
        
    this.input.on('pointerdown', function (pointer) {
        this.scene.start("entrance");
        }, this);

    spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto entrance");

    
    let playerPos={}
        playerPos.x=667
        playerPos.y=1200
    this.scene.start(
        "entrance",
        {player:playerPos}
      );

//       let playerPos1={}
//   playerPos1.x=1860
//   playerPos1.y=940
//   this.scene.start("worldmap" ,{player:playerPos1});
      
    },
    this);

    // this.anims.create({
    //     key: "fireAnim",
    //     frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1,
    //     });
    
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

window.key = 0
window.heart = 3