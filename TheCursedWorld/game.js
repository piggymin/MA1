var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 40,
    height: 32 * 40,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#111111',
    pixelArt: true,
    scene: [preloadScene, endScene, worldmap, trap1, trap2, trap3, entrance, storyline, gameplay1, gameplay2, howtoplay, gameover, showInventory]
};

var game = new Phaser.Game(config);
window.key= 0
window.heart = 3
window.food=0