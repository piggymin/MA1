class howtoplay extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'howtoplay' });
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
    this.load.image("storylineImg","assets/storyline.png")
    this.load.image("gameplay1Img","assets/gameplay1.png")
    this.load.image("gameplay2Img","assets/gameplay2.png")
    this.load.image("howtoplayImg","assets/howtoplay.png")

    this.load.audio("mainMusic", "assets/mainmusic.mp3");
    this.load.audio("gameMusic", "assets/gamemusic.mp3");

    this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });

}

create() {
console.log("howtoplay")
    this.add.image(650,650,"howtoplayImg")

    this.spaceSnd = this.sound.add("space").setVolume(3);
  
    var spaceDown = this.input.keyboard.addKey('SPACE');
        
    this.input.on('pointerdown', function (pointer) {
        this.scene.start("entrance");
        }, this);

    spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto entrance");
        this.spaceSnd.play()
    
    let playerPos={}
        playerPos.x=667
        playerPos.y=1200
    this.scene.start(
        "entrance",
        {player:playerPos}
      );
      
    },
    this);

    var zDown = this.input.keyboard.addKey('Z');
    zDown.on('down', function(){
    console.log("Z pressed (Undo)");
        this.scene.start("gameplay2");
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

window.key = 0
window.heart = 3