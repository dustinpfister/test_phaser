
var Plugin_platforms = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    // create a platform sheet
    var createPlatformSheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 96;
        canvas.height = 16;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(0, 0, 96, 16);
        game.cache.addSpriteSheet('sheet-platfrom', null, canvas, 96, 16, 1, 0, 0);
    };

    // Create a Pool Of Platforms
    var createPlatfromPool = function (game) {
        var i = 0,
        len = 5,
        plat,
        platforms = game.data.platforms,
        pool = platforms.pool = game.add.group();

        while (i < len) {

            plat = pool.create(0, 0, 'sheet-platfrom');

            plat.kill();

            game.physics.enable(plat);
            plat.body.immovable = true;

            plat.body.checkCollision.left = false;
            plat.body.checkCollision.right = false;
            plat.body.checkCollision.down = false;

            i += 1;
        }

    };

    var updatePlatfroms = function (game) {

        var platforms = game.data.platforms,
        platPool = platforms.pool,
        plat;

        // revive
        if (platPool.countDead() > 0 && platforms.lastPlatDist >= 96) {
            plat = platPool.getFirstDead();
            plat.revive();
            plat.x = game.world.width;
            plat.y = game.world.height - 32 - Math.floor(Math.random() * 100);
            platforms.lastPlatDist = 0;
        };

        // For All Alive
        platPool.forEachAlive(function (plat) {

            // move
            plat.x -= platforms.delta;

            // kill if old
            if (plat.x + plat.width <= 0) {
                plat.kill();
            }

        });

        platforms.lastPlatDist += platforms.delta;

    };

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        //var runner = game.data.runner;
        var platforms = game.data.platforms = {};
        platforms.lastPlatDist = 0;
        platforms.delta = 5;

        createPlatformSheet(game);
        createPlatfromPool(game);

        game.time.events.loop(33, function () {

            //runner.distnace += runner.delta;

            updatePlatfroms(game);

        });

    };

    // what to do for each tick
    plug.update = function () {

        var runner = game.data.runner,
        platforms = game.data.platforms;

        if (runner) {

        game.physics.arcade.collide(platforms.pool, runner.guy);

        }

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
