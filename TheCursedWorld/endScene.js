class endScene extends Phaser.Scene {

    constructor ()
    {
        super('endScene');
    }

    create ()
    {
       this.add.image(640,640,"endsceneImg")

    
        var aDown = this.input.keyboard.addKey('A');
        var rDown = this.input.keyboard.addKey('R');
        
        rDown.on('down', function(){
        console.log("R pressed (reload game)");
            this.scene.start("preloadScene");
            this.scene.stop('showInventory');
        }, this );

    }
}
