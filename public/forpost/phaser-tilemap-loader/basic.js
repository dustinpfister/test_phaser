// load json and images
var loadWorldData = function (game) {
    game.load.tilemap('map-world1', '/forpost/phaser-tilemap-loader/world2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('image-blocks', '/img/sheet_blocks.png');
};

// load a give world number
var loadWorld = function (game, worldNum) {

    worldNum = worldNum || 1;

    game.data = game.data || {};

    var map = game.data.map = game.add.tilemap('map-world1');

    map.addTilesetImage('blocks', 'image-blocks');

    game.data.layer = map.createLayer('stage1');

};

// display the properties of a map
var displayMapProperties = function (game, textObj) {

    var props = game.data.map.properties;

    textObj.text = 'world: ' + props.world + '\/' + props.stages

};


game.state.add('basic', {

    preload: function () {

        loadWorldData(game);

    },

    create: function () {

        // load World one
        loadWorld(game, 1);

        // text display object
        game.data.disp = game.add.text(10, 10,'', {
                fill: 'white',
                font: '15px courier'
            });
        displayMapProperties(game, game.data.disp);

    }

});

