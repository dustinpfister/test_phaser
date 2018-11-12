
var Plugin_gameboard = function (game, opt) {

    opt = opt || {};

    opt.sheetKey = opt.sheetKey || 'sheet-gameboard';
    opt.width = opt.width || 8;
    opt.height = opt.height || 6;
    opt.xOffset = opt.xOffset || 16;
    opt.yOffset = opt.yOffset || 16;

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        // adds map property to game object
        var map = game.data.map = game.add.tilemap(null, 32, 32, opt.width, opt.height);
        map.addTilesetImage(opt.sheetKey);

        var layer = map.create('layer-gameboard', opt.width, opt.height, 32, 32);

        layer.fixedToCamera = false;
        layer.x = opt.xOffset;
        layer.y = opt.yOffset;

		console.log(game.world.getByName('layer-gameboard'));
        //console.log(map.layers[map.getLayer('layer-gameboard')]);

        // default all index values to 0
        map.forEach(function (tile) {
            if (tile.properties) {
                tile.index = 0;
            }
        }, this, 0, 0, opt.width, opt.height);

        // spawn tiles
        map.forEach(function (tile) {
            if (tile.properties) {
                tile.index = 1;
                tile.properties.spawn = true;
            }
        }, this, 0, 0, 1, opt.height);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
