
var Plugin_enemies = function (game, opt) {

    opt = opt || {};

    opt.sheetKey = opt.sheetKey || 'sheet-enemies';
    opt.map = opt.map || game.data.map;

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins),
    spawnTiles = [],
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
        var enemies = game.data.enemies = game.add.group();
        var i = 10,
        enemy;
        while (i--) {
            enemy = enemies.create(-32, 0, opt.sheetKey, 0);
            enemy.kill();
            enemies.add(enemy);
        }

    }

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        map = opt.map;
        layer = map.layers[map.getLayer('layer-gameboard')];

        setSpawnTiles(map);

        createEnemiesGroup(game);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
