
var Plugin_paddle = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};
        game.data.paddle = {};

        // start Arcade physics, should be the case by default but making sure
        // this will also reset, but not re create Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // PADDLE SPRITE SHEET
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 96;
        canvas.height = 16;
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, 96, 16);
        game.cache.addSpriteSheet('sheet-paddle', null, canvas, 96, 16, 1, 0, 0);

        // PADDLE SPRITE
        var x = game.world.width / 2,
        y = game.world.height - 32,
        paddle = game.data.paddle.sprite = game.add.sprite(x, y, 'sheet-paddle');
        paddle.anchor.set(0.5, 0.5);
        // physics
        game.physics.enable(paddle);
        paddle.body.immovable = true;
        paddle.body.collideWorldBounds = true;
        paddle.body.drag.set(180, 0);

    };

    // on each tick
    plug.update = function () {

        // check keyboard
        var kb = game.input.keyboard,
        paddle = game.data.paddle.sprite;

        // set velocity based on keyboard
        if (kb.isDown(37)) {
            paddle.body.velocity.set(-200, 0);
        }
        if (kb.isDown(39)) {
            paddle.body.velocity.set(200, 0);
        }

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
