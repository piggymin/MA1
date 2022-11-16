class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world", "assets/Trap2.tmj");

    // Step 2 : Preload any images here
  
    this.load.image("wallImg", "assets/wall64px.png");
    this.load.image("tileImg", "assets/tile64px.png");
    this.load.image("loveImg", "assets/love.png");
    this.load.image("keyImg", "assets/key.png");
    this.load.image("boxImg", "assets/box.png");
    this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });
  }
  

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
  
    let wallTiles = map.addTilesetImage("wall 64px", "wallImg");
    let tileTiles = map.addTilesetImage("tile64px", "tileImg");
    let loveTiles = map.addTilesetImage("love", "loveImg");
    let keyTiles = map.addTilesetImage("key", "keyImg");
    let boxTiles = map.addTilesetImage("box", "boxImg");


    // Step 5  create an array of tiles
    let tilesArray = [
      // boxTiles, keyTiles, loveTiles, tileTiles, 
      wallTiles, tileTiles, loveTiles, keyTiles, boxTiles
    ];

    // Step 6  Load in layers by layers
     this.floorLayer = map.createLayer("floor",tilesArray,0,0)
    this.blankLayer = map.createLayer("blank",tilesArray,0,0);
      this.wallLayer = map.createLayer("wall",tilesArray,0,0);
    this.doorLayer = map.createLayer("door",tilesArray,0,0);
    this.itemLayer = map.createLayer("item",tilesArray,0,0);
  

    // Add main player here with physics.add.sprite
    // this.load.spritesheet('pig', 'assets/pig.png',{ frameWidth:64, frameHeight:64 });

    // Add time event / movement here
    this.anims.create({
      key:'move left',
      frames:this.anims.generateFrameNumbers('pig',
      { start:0, end:2 }),
      frameRate:10,
      repeat:-1
  });

  this.anims.create({
      key:'move right',
      frames:this.anims.generateFrameNumbers('pig',
      { start:9, end:11 }),
      frameRate:10,
      repeat:-1
  });

  this.anims.create({
      key:'move straight',
      frames:this.anims.generateFrameNumbers('pig',
      { start:6, end:8 }),
      frameRate:10,
      repeat:-1
  });

  this.anims.create({
      key:'move back',
      frames:this.anims.generateFrameNumbers('pig',
      { start:3, end:5 }),
      frameRate:10,
      repeat:-1
  });

  this.add.sprite(500, 400, 'pig').play('move left')
  this.add.sprite(300, 500, 'pig').play('move right')
  this.add.sprite(300, 400, 'pig').play('move straight')
  this.add.sprite(200, 400, 'pig').play('move back')




    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);
  } /////////////////// end of create //////////////////////////////

  update() {} /////////////////// end of update //////////////////////////////

}
 //////////// end of class world ////////////////////////
