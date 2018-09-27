
// load a stage from the current map
createStage = function (game, stageNum) {

    var map = game.data.map;

    var stage = game.data.stage = map.createLayer('stage' + stageNum);

    // set collision by excluding only indexes of zero or -1
    map.setCollisionByExclusion([0, -1]);

    stage.cameraOffset.set(0, 0);

    return stage;

};

// create the tilemap
var createMap = function (game, worldNum) {

    worldNum = worldNum || 1;

    game.data = game.data || {};

    var map = game.data.map = game.add.tilemap('map-world' + worldNum);

    map.addTilesetImage('blocks', 'image-blocks');

    return map;

};

// create the guy sprite
var createGuy = function (game) {

    var map = game.data.map;

    // create guy Sprite
    var guy = game.data.guy = game.add.sprite(0, 0, 'sheet-guy');

    // enable physics for the guy
    game.physics.enable([guy]);

    // guy physics settings
    guy.body.gravity.set(0, 100);
    guy.body.bounce.set(0.25);
    guy.body.linearDamping = 1;

    // guy start location
    var startAt = map.layer.properties.startat;
    guy.x = startAt.x * 32;
    guy.y = startAt.y * 32;

    // have camera follow the guy
    game.camera.follow(guy);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    // load assets
    preload: function () {

        // load images
        game.load.image('image-blocks', '/img/sheet_blocks.png');
        game.load.spritesheet('sheet-guy', '/img/sheet_guy_16_32.png', 16, 32, 1);

        // load json
        game.load.tilemap('map-world1', '/json/littleguy-world2.json', null, Phaser.Tilemap.TILED_JSON);

    },

    // create the world
    create: function () {

        game.world.resize(640, 480);

        // create map, and map layer
        var map = createMap(game, 1);
        var stage = createStage(game, 1);

        // I will be using physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        createGuy(game);

        game.data.cursors = game.input.keyboard.createCursorKeys();

    },

    // update
    update: function () {

        var guy = game.data.guy,
        layer = game.data.stage,
        cursors = game.data.cursors;

        // check for collision
        game.physics.arcade.collide(guy, layer);

        guy.body.velocity.x = 0;

        if (cursors.up.isDown) {
            if (guy.body.onFloor()) {
                guy.body.velocity.y = -125;
            }
        }

        if (cursors.left.isDown) {
            guy.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            guy.body.velocity.x = 150;
        }

    }

});

game.state.start('boot');
