
var Plugin_runner = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    // Guy SPRITE SHEET
    var createGuySheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 32;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 32, 64);
        game.cache.addSpriteSheet('sheet-guy', null, canvas, 32, 64, 1, 0, 0);
    };

    // create a platform sheet
    var createPlatformSheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 16;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 64, 16);
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
            if (guy.body.onFloor()) {
                guy.body.velocity.y = -100;
            }
        });

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

    };

    //
    plug.update = function () {

        var runner = game.data.runner,
        guy = runner.guy,
        cursors = runner.cursors;

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
