
var Plugin_runner = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    // Guy SPRITE SHEET
    var createGuySheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 32;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 16, 32);
        game.cache.addSpriteSheet('sheet-guy', null, canvas, 16, 32, 1, 0, 0);
    };

    // create a platform sheet
    var createPlatformSheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 16;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(0, 0, 64, 16);
        game.cache.addSpriteSheet('sheet-platfrom', null, canvas, 64, 16, 1, 0, 0);
    };

    // GUY SPRITE
    var createGuySprite = function (game) {

        var runner = game.data.runner,
        x = game.world.width / 2,
        y = game.world.height - 32,
        guy = runner.guy = game.add.sprite(x, y, 'sheet-guy');
        guy.anchor.set(0.5, 0.5);

        // physics
        game.physics.enable(guy);
        guy.body.collideWorldBounds = true;
        guy.checkWorldBounds = true;
        guy.body.gravity.set(0, 150);

        // making jumps event driven
        runner.cursors.up.onDown.add(function () {

            if (guy.body.touching.down || guy.body.onFloor()) {
            guy.body.velocity.y = -150;
            }

        });

    };

    // Create a Pool Of Platfroms
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

            i += 1;
        }

        runner.lastPlatDist = 0;
        runner.platfrom_delta = 1;

        console.log(platPool);

    };

    var updatePlatfroms = function (game) {

        var runner = game.data.runner,
        platPool = runner.platPool,
        guy = runner.guy,
        plat;

        // revive
        if (platPool.countDead() > 0 && runner.lastPlatDist >= 64) {
            plat = platPool.getFirstDead();
            plat.revive();
            plat.x = game.world.width;
            plat.y = game.world.height - 32 - Math.floor(Math.random() * 100);
            runner.lastPlatDist = 0;
        };

        // For All Alive
        platPool.forEachAlive(function (plat) {
            // move
            plat.x -= runner.platfrom_delta;

            // kill if old
            if (plat.x + plat.width <= 0) {
                plat.kill();
            }

        });

        runner.lastPlatDist += runner.platfrom_delta;

    };

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};
        var runner = game.data.runner = {
            distance: 0
        };

        runner.cursors = game.input.keyboard.createCursorKeys();

        // start or reset Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        createGuySheet(game);
        createPlatformSheet(game);

        createGuySprite(game);
        createPlatfromPool(game);

        game.time.events.loop(33, function () {

            runner.distnace += 10;

            updatePlatfroms(game);

        });

    };

    //
    plug.update = function () {

        var runner = game.data.runner,
        guy = runner.guy,
        cursors = runner.cursors;

        game.physics.arcade.collide(runner.platPool, guy);

        /*
        guy.body.velocity.x = 0;
        //  polling for left and right movement
        if (cursors.left.isDown) {
        guy.body.velocity.x = -150;
        }

        if (cursors.right.isDown) {
        guy.body.velocity.x = 150;
        }
         */

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
