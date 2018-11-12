
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

        console.log(spawnTiles);

    };

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        map = opt.map;
        layer = map.layers[map.getLayer('layer-gameboard')];

        setSpawnTiles(map);

        //var enemy = game.add.sprite(32, 0, 'sheet-enemies', 0);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
