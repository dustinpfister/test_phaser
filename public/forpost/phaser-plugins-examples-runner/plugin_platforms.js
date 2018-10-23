
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
        runner = game.data.runner,
        platPool = runner.platPool = game.add.group();
        while (i < len) {

            plat = platPool.create(0, 0, 'sheet-platfrom');

            plat.kill();

            game.physics.enable(plat);
            plat.body.immovable = true;

            plat.body.checkCollision.left = false;
            plat.body.checkCollision.right = false;
            plat.body.checkCollision.down = false;

            i += 1;
        }

        runner.platform_lastPlatDist = 0;
        runner.delta = 5;

        console.log(platPool);

    };

    var updatePlatfroms = function (game) {

        var runner = game.data.runner,
        platPool = runner.platPool,
        guy = runner.guy,
        plat;

        // revive
        if (platPool.countDead() > 0 && runner.platform_lastPlatDist >= 96) {
            plat = platPool.getFirstDead();
            plat.revive();
            plat.x = game.world.width;
            plat.y = game.world.height - 32 - Math.floor(Math.random() * 100);
            runner.platform_lastPlatDist = 0;
        };

        // For All Alive
        platPool.forEachAlive(function (plat) {

            // move
            plat.x -= runner.delta;

            // kill if old
            if (plat.x + plat.width <= 0) {
                plat.kill();
            }

        });

        runner.platform_lastPlatDist += runner.delta;

    };

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};
        var runner = game.data.runner;

        createPlatformSheet(game);
        createPlatfromPool(game);

        game.time.events.loop(33, function () {

            runner.distnace += runner.delta;

            updatePlatfroms(game);

        });

    };

    //
    plug.update = function () {

        var runner = game.data.runner,
        guy = runner.guy,
        cursors = runner.cursors;

        //game.physics.arcade.collide(runner.platPool, guy);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
