
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
    opt.spawnRate = opt.spawnRate || 3000;

    // create a tile
    var createTile = function (c, r, row, rows) {
        var grid = game.data.grid,

        // create the tile sprite
        tile = game.make.sprite(c * 32, 0, opt.sheetKeys.gameBoard, 0);

        // input enable the tile
        tile.inputEnabled = true;
        tile.data = {
            c: c,
            r: r,
            row: row,
            rows: rows
        };

        // fire onTileClick event when clicked
        tile.events.onInputDown.add(function (tile) {
            var data = tile.data;
            grid.onTileClick.dispatch(tile, data.c, data.r, data.row, data.rows);
        });

        // return the tile
        return tile;

    };

    // create a tile group
    var createTileGroup = function (game) {

        var grid = game.data.grid,
        r = 0,
        c,
        row,
        tile,

        // make rows a new group
        rows = grid.rows = game.add.group();

        // add an onTileClick event that will be called each time
        // a tile is clicked
        grid.onTileClick = new Phaser.Signal();

        // while r is less than opt.rows
        while (r < opt.rows) {

            // make a new row
            row = game.make.group();
            row.y = r * 32;
            c = 0;

            // create tiles for the row
            while (c < opt.cols) {
                row.add(createTile(c, r, row, rows));
                c += 1;
            }

            //add row to rows group
            rows.add(row);
            r += 1;
        }
        rows.x = opt.xOffset;
        rows.y = opt.yOffset;
    };

    // what to do for enemies on each tick
    var updateEnemies = function (game) {

        var enemies = game.data.grid.enemies,
        player = game.data.player;

        // for all current active enemies in the grid
        game.data.grid.activeEnemies.forEach(function (enemy) {

            // move enemy
            enemy.x += game.time.elapsed / 1000 * enemy.data.pps;

            // if the enemy reaches end of row
            if (enemy.x >= opt.cols * 32) {
                // the player looses health
                // and returns to the enemy pool
                player.health -= 10;
                enemy.kill();
                enemies.add(enemy);
                updateActiveEnemies(game);
            }
        });

    };

    // create the enemies group
    var createEnemiesGroup = function (game) {
        var enemies = game.data.grid.enemies = game.add.group(),
        i = 3,
        enemy;
        while (i--) {

            // create an enemy
            enemy = enemies.create(-32, 0, opt.sheetKeys.enemies, 0);

            // type id used to help with filtering
            enemy.data.type = 'enemy';

            // 8 - 24 pixels per second
            enemy.data.pps = 8 + Math.floor(Math.random() * 16);

            // enemy is input enabled so the player can click on it
            enemy.inputEnabled = true;
            enemy.events.onInputDown.add(function (enemy) {

                enemy.kill();
                enemy.x = -16;

                // add the enemy back to the pool
                enemies.add(enemy);
                updateActiveEnemies(game);

            });

            // enemies are dead when they are in the enemy pool
            enemy.kill();
            enemies.add(enemy);
        }
    };

    // update the list of active enemies in the grid
    var updateActiveEnemies = function (game) {
        var rows = game.data.grid.rows;
        game.data.grid.activeEnemies = rows.filter(function (child) {
                if (child.data) {
                    return child.data.type === 'enemy';
                }
            }).list;
    };

    // spawn an enemy
    var spawnEnemy = function (game) {

        var enemies = game.data.grid.enemies,
        rows = game.data.grid.rows,

        // get first dead from enemy pool
        enemy = enemies.getFirstDead();

        // if enemies.getFirstDead returns an enemy
        if (enemy) {

            // revive the enemy
            enemy.revive(10);

            //and add it to the rows group
            row = rows.children[Math.floor(Math.random() * opt.rows)];
            enemy.x = 0;
            enemy.y = row.y;
            rows.add(enemy);

            // update active enemies array
            updateActiveEnemies(game);

        }
    };

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // called once
    plug.init = function () {

        // create or append game.data
        game.data = game.data || {};

        // set up player and grid objects
        game.data.player = {
            health: 100
        };
        game.data.grid = {
            lastSpawn: 0,
            activeEnemies: []
        };

        // create tiles, and enemies
        createTileGroup(game);
        createEnemiesGroup(game);

    };

    // called on each frame tick
    plug.update = function () {

        var grid = game.data.grid,
        enemies = grid.enemies;

        // update enemies
        updateEnemies(game);

        // spawn enemies
        grid.lastSpawn += game.time.elapsed;
        if (grid.lastSpawn >= opt.spawnRate) {
            grid.lastSpawn = 0;
            spawnEnemy(game);
        }

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
