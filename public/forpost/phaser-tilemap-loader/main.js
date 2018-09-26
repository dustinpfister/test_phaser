// load json and images
var loadWorldData = function (game) {
    game.load.tilemap('map-world1', '/forpost/phaser-tilemap-loader/world2.json', null, Phaser.Tilemap.TILED_JSON);
};

// load a give world number
var loadWorld = function (game, worldNum) {

    worldNum = worldNum || 1;

    game.data = game.data || {};

    var map = game.data.map = game.add.tilemap('map-world' + worldNum);

    map.addTilesetImage('blocks', 'image-blocks');

};

loadStage = function (game, stageNum) {

    var map = game.data.map;

    var layer = game.data.layer = map.createLayer('stage' + stageNum);
    layer.fixedToCamera = false;
    layer.x = 10;
    layer.y = game.world.height - (layer.layer.heightInPixels)-10;

};

// display the properties of a map
var displayMapProperties = function (game, textObj) {

    var props = game.data.map.properties;

    textObj.text = 'world: ' + props.world + '\/' + props.stages

};

game.state.add('boot', {

    preload: function () {

        game.load.image('image-blocks', '/img/sheet_blocks.png');
        game.load.image('image-guy', '/img/sheet_guy.png');

        loadWorldData(game);

    },

    create: function () {

        // load World one
        loadWorld(game, 1);
        loadStage(game, 1);

        // text display object
        game.data.disp = game.add.text(10, 10, '', {
                fill: 'white',
                font: '15px courier'
            });
        displayMapProperties(game, game.data.disp);

    }

});

game.state.start('boot');
