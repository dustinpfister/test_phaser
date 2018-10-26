
var Plugin_missiles = function (game, opt) {

    var createMissilePool = function (game) {

        var data = game.data,
        i = 0,
        missile
        len = 10;

        data.missiles = game.add.group();
        while (i < len) {

            missile = game.make.graphics(0, 0);

            missile.data = {}

            data.missiles.add(missile);

            i += 1;

        }

    };

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        createMissilePool(game);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
