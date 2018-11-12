
var Plugin_gameboard = function (game, opt) {

    opt = opt || {};

    opt.sheetKey = opt.sheetKey || 'sheet-gameboard';

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        // adds map property to game object
        var map = game.data.map = game.add.tilemap(null, 32, 32, 8, 6);
        map.addTilesetImage(opt.sheetKey);

        var layer = map.create('map-layer', 6, 6, 32, 32);

        // default all index values to 0
        map.forEach(function (tile) {
            tile.index = 0;
        }, this, 0, 0, 6, 6);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
