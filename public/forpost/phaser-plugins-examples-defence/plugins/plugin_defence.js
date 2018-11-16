
var Plugin_defence = function (game, opt) {

    opt = opt || {};

    opt.sheetKeys = opt.sheetKeys || {
        gameBoard: 'sheet-gameboard',
        enemies: 'sheet-enemies'
    };
    opt.cols = opt.cols || 8;
    opt.rows = opt.rows || 6;
    opt.xOffset = opt.xOffset || 16;
    opt.yOffset = opt.yOffset || 16;

    // create a tile
    var createTile = function (c, r, row, rows) {

        var grid = game.data.grid;

        var tile = game.make.sprite(c * 32, 0, opt.sheetKeys.gameBoard, 0);
        tile.inputEnabled = true;
        tile.data = {
            c: c,
            r: r,
            row: row,
            rows: rows
        };
        tile.events.onInputDown.add(function (tile) {

            var data = tile.data;

            grid.onTileClick.dispatch(tile, data.c, data.r, data.row, data.rows);

        });

        return tile;

    };

    // create a tile group
    var createTileGroup = function (game) {
        var grid = game.data.grid,
        r = 0,
        c,
        row,
        tile,
        rows = grid.rows = game.add.group();
        grid.onTileClick = new Phaser.Signal();
        while (r < opt.rows) {
            row = game.make.group();
            row.y = r * 32;
            c = 0;
            while (c < opt.cols) {
                row.add(createTile(c, r, row, rows));
                c += 1;
            }
            rows.add(row);
            r += 1;
        }
        rows.x = opt.xOffset;
        rows.y = opt.yOffset;

    };

    var createEnemiesGroup = function (game) {

        // create enemies group
        enemies = game.data.enemies = game.add.group();

        var i = 10,
        enemy;
        while (i--) {
            enemy = enemies.create(-32, 0, opt.sheetKeys.enemies, 0);
            enemy.kill();
            enemies.add(enemy);
        }

    };

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        var player = game.data.player = {
            playerHealth: 100
        };
		game.data.grid = {};

        game.data.disp = game.add.text(10, game.world.height - 20, 'hello', {
                fill: 'white',
                font: '15px courier'
            });

        createTileGroup(game);

        createEnemiesGroup(game);

    };

    // call once
    plug.update = function (opt) {

        var player = game.data.player;

        game.data.disp.text = 'health: ' + player.playerHealth;

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
