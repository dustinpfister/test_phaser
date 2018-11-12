
var Plugin_gameboard = function (game, opt) {

    opt = opt || {};

    opt.sheetKey = opt.sheetKey || 'sheet-gameboard';

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
