var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 40,
    height: 32 * 40,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#111111',
    pixelArt: true,
    scene: [preloadScene, endScene, world, worldmap, trap1, trap2, trap3, entrance]
};





var game = new Phaser.Game(config);