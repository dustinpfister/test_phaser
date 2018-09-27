// load json and images
var loadWorldData = function (game) {
    game.load.tilemap('map-world1', '/forpost/phaser-tilemap-setcollisionbyexclusion/world.json', null, Phaser.Tilemap.TILED_JSON);
};

// load a give world number
var loadWorld = function (game, worldNum) {

    worldNum = worldNum || 1;

    game.data = game.data || {};

    var map = game.data.map = game.add.tilemap('map-world' + worldNum);

    map.addTilesetImage('blocks', 'image-blocks');

    return map;

};

// load a stage from the current map
loadStage = function (game, stageNum) {

    var map = game.data.map;

    var stage = game.data.stage = map.createLayer('stage' + stageNum);

    // set collision by excluding only indexes of zero or -1
    map.setCollisionByExclusion([0,-1]);

    return stage;

};

// display the properties of a map
var displayMapProperties = function (game, textObj) {

    var props = game.data.map.properties;

    textObj.text = 'world: ' + props.world + '\/' + props.stages

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    preload: function () {

        game.load.image('image-blocks', '/img/sheet_blocks.png');
        game.load.spritesheet('sheet-guy', '/img/sheet_guy_16_32.png', 16, 32, 1);

        loadWorldData(game);

    },

    create: function () {

        game.world.resize(640, 480);

        // load World one
        var map = loadWorld(game, 1);
        var stage = loadStage(game, 1);

        var guy = game.data.guy = game.add.sprite(0, 0, 'sheet-guy');

        // will be using physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

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
                p.body.velocity.y = -200;
            }
        }

        if (cursors.left.isDown) {
            p.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            p.body.velocity.x = 150;
        }

    }

});

game.state.start('boot');
