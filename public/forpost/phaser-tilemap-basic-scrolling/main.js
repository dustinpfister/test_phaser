
// create the map
var createMap = function (game, worldNum) {

    worldNum = worldNum || 1;

    game.data = game.data || {};

    var map = game.data.map = game.add.tilemap('map-world' + worldNum);

    map.addTilesetImage('blocks', 'image-blocks');

    return map;

};

// create the layer
createLayer = function (game, stageNum) {

    var map = game.data.map;

    var stage = game.data.stage = map.createLayer('stage' + stageNum);

    stage.resizeWorld();

    return stage;

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

    preload: function () {

        game.load.image('image-blocks', '/img/sheet_blocks.png');
        game.load.spritesheet('sheet-guy', '/img/sheet_guy_16_32.png', 16, 32, 1);
        game.load.tilemap('map-world1', '/json/littleguy-world3.json', null, Phaser.Tilemap.TILED_JSON);

    },

    create: function () {

        // load World one
        var map = createMap(game, 1);
        var stage = createLayer(game, 1);

        map.setCollisionByExclusion([0]);

        // will be using physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        createGuy(game);

        game.data.cursors = game.input.keyboard.createCursorKeys();

    },

    update: function () {

        var p = game.data.guy,
        layer = game.data.stage,
        cursors = game.data.cursors;

        game.physics.arcade.collide(p, layer);

        p.body.velocity.x = 0;

        if (cursors.up.isDown) {
            if (p.body.onFloor()) {
                p.body.velocity.y = -150;
            }
        }

        if (cursors.left.isDown) {
            p.body.velocity.x = -150;
        }

        if (cursors.right.isDown) {
            p.body.velocity.x = 150;
        }

    }

});

game.state.start('boot');
