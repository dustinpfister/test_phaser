
var Plugin_ball = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};
        game.data.ball = {};

        // start Arcade physics, should be the case by default but making sure
        // this will also reset, but not re create Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Ball SPRITE SHEET
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 16, 16);
        game.cache.addSpriteSheet('sheet-ball', null, canvas, 16, 16, 1, 0, 0);

        // BALL SPRITE
        var x = game.world.width / 2,
        y = 32,
        ball = game.data.ball.sprite = game.add.sprite(x, y, 'sheet-ball');
        ball.anchor.set(0.5, 0.5);
        // physics
        game.physics.enable(paddle);
        //ball.body.immovable = true;
        ball.body.collideWorldBounds = true;
        //ball.body.drag.set(0, 0);

    };

    // on each tick
    plug.update = function () {

        var ball = game.data.ball.sprite;


    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
