
var Plugin_defence = function (game, opt) {

    opt = opt || {};

    opt.sheetKey = opt.sheetKey || 'sheet-gameboard';
    opt.width = opt.width || 8;
    opt.height = opt.height || 6;
    opt.xOffset = opt.xOffset || 16;
    opt.yOffset = opt.yOffset || 16;

    var createTileRows = function (game) {}

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        var defence = game.data.defence = {
            playerHealth: 100
        };

        game.data.disp = game.add.text(10, game.world.height - 20, 'hello', {
                fill: 'white',
                font: '15px courier'
            });

    };

    // call once
    plug.update = function (opt) {

        var data = game.data.defence;

        game.data.disp.text = 'health: ' + data.playerHealth;

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
