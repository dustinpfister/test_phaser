
var Plugin_defence = function (game, opt) {

    opt = opt || {};

    opt.sheetKeys = opt.sheetKeys || {
        gameBoard: 'sheet-gameboard'
    };
    opt.cols = opt.cols || 8;
    opt.rows = opt.rows || 6;
    opt.xOffset = opt.xOffset || 16;
    opt.yOffset = opt.yOffset || 16;

    var createTileGroup = function (game) {

        var defence = game.data.defence,
        r,
        c,
        row,
        tile,
        rows = defence.rows = game.add.group();

        r = 0;
        while (r < opt.rows) {

            row = game.make.group();
            row.y = r * 32;
            c = 0;
            while (c < opt.cols) {

                tile = game.make.sprite(c * 32, 0, opt.sheetKeys.gameBoard, 0);

                row.add(tile);

                c += 1;
            }

            rows.add(row);

            r += 1;
        }

        rows.x = opt.xOffset;
        rows.y = opt.yOffset;

    };

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

        createTileGroup(game);

    };

    // call once
    plug.update = function (opt) {

        var data = game.data.defence;

        game.data.disp.text = 'health: ' + data.playerHealth;

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
