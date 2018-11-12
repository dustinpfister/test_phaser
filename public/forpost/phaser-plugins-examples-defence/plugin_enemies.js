
var Plugin_enemies = function (game, opt) {

    opt = opt || {};

    opt.sheetKey = opt.sheetKey || 'sheet-enemies';
    opt.map = opt.map || game.data.map;

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins),
    spawnTiles = [],
    lastSpawn = 0,
    enemies,
    map,
    layer;

    var setSpawnTiles = function (map) {
        map.forEach(function (tile, i) {
            var props = tile.properties;
            if (props) {
                if (props.spawn) {
                    spawnTiles.push(tile);
                }
            }
        });
    };

    var createEnemiesGroup = function (game) {

        // create enemies group
        enemies = game.data.enemies = game.add.group();

        var i = 10,
        enemy;
        while (i--) {
            enemy = enemies.create(-32, 0, opt.sheetKey, 0);
            enemy.kill();
            enemies.add(enemy);
        }

    };

    var spawn = function (game) {

        var enemy = enemies.getFirstDead();

        if (enemy) {

            var tile = spawnTiles[Math.floor(Math.random() * spawnTiles.length)];

            enemy.revive(10);
            enemy.x = layer.x + tile.x * 32 - 32;
            enemy.y = layer.y + tile.y * 32;

        }
    };

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        map = opt.map;
        layer = game.world.getByName('layer-gameboard');

        setSpawnTiles(map);

        createEnemiesGroup(game);

    };

    plug.update = function (opt) {

        lastSpawn += game.time.elapsed;

        if (lastSpawn >= 5000) {

            lastSpawn = 0;
            spawn(game);

        }

        enemies.forEachAlive(function (enemy) {

            enemy.x += game.time.elapsed / 1000 * 32;

            if (layer.getTileX(enemy.x) >= map.width) {

                enemy.x = -32;
                enemy.kill();

            }

            //console.log(layer.getTileX(enemy.x), map.width);

        });

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
