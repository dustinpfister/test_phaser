
var Plugin_ball = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    var createBallSheet = function (game) {

        // Ball SPRITE SHEET
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 16, 16);
        game.cache.addSpriteSheet('sheet-ball', null, canvas, 16, 16, 1, 0, 0);

    };

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};
        game.data.ball = {};

        // start or reset Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        createBallSheet(game);

        // BALL SPRITE
        var x = game.world.width / 2,
        y = 32,
        ball = game.data.ball.sprite = game.add.sprite(x, y, 'sheet-ball');
        ball.anchor.set(0.5, 0.5);
        // physics
        game.physics.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.checkWorldBounds = true;
        ball.body.velocity.set(100, 50);
        ball.body.bounce.set(1);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
