class showInventory extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'showInventory',active:false });
    }

    init(data) {
        this.player = data.player
        this.inventory = data.inventory
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

    this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });

}

create() {
console.log("showInventory")
this.scene.bringToTop(showInventory)

      this.heartimg1 = this.add.image (1000,70,'love').setScrollFactor(0).setVisible(true).setScale(1.5);
      this.heartimg2 = this.add.image (1100,70,'love').setScrollFactor(0).setVisible(true).setScale(1.5);
      this.heartimg3 = this.add.image (1200,70,'love').setScrollFactor(0).setVisible(true).setScale(1.5);

      this.keyimg1 = this.add.image (100,70,'key').setScrollFactor(0).setVisible(false).setScale(1);
      this.keyimg2 = this.add.image (200,70,'key').setScrollFactor(0).setVisible(false).setScale(1);
      this.keyimg3 = this.add.image (300,70,'key').setScrollFactor(0).setVisible(false).setScale(1);

      this.events.on('inventory', this.updateScreen, this)
}

update(){
}

updateScreen(data) {
    console.log('Received event inventory', data)

    switch ( data.heart ) {

       case 3: 
           this.heartimg1.setVisible(true)
           this.heartimg2.setVisible(true)
           this.heartimg3.setVisible(true)
           break;

       case 2:
           this.heartimg1.setVisible(true)
           this.heartimg2.setVisible(true)
           this.heartimg3.setVisible(false)
           break;

       case 1:
           this.heartimg1.setVisible(true)
           this.heartimg2.setVisible(false)
           this.heartimg3.setVisible(false)
           break;
        
       case 0:
           this.heartimg1.setVisible(false)
           this.heartimg2.setVisible(false)
           this.heartimg3.setVisible(false)
           break;    

       default:
       break;
   }

   switch ( data.key ) {
   

       case 3:
           this.keyimg1.setVisible(true)
           this.keyimg2.setVisible(true)
           this.keyimg3.setVisible(true)
        
           break;    

       case 2:
           this.keyimg1.setVisible(true)
           this.keyimg2.setVisible(true)
           this.keyimg3.setVisible(false)
        //    this.keyimg4.setVisible(false)
           break;  
           
       case 1: 
           this.keyimg1.setVisible(true)
           this.keyimg2.setVisible(false)
           this.keyimg3.setVisible(false)
        //    this.keyimg4.setVisible(false)
           break; 

           case 0: 
           this.keyimg1.setVisible(false)
           this.keyimg2.setVisible(false)
           this.keyimg3.setVisible(false)
        //    this.keyimg4.setVisible(false)
           break; 

       default: 
           break;
   }
}

} // end of class

