
var Plugin_paddle = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    // What to do when something collides with the paddle
    var onPaddleCollide = function (paddle, ball) {

        var max = paddle.width / 2 + ball.width / 2,
        fromCenter = Math.abs(ball.x - paddle.x),
        dir = ball.x - paddle.x < 0 ? 1 : -1,
        per = fromCenter / max,
        x = 0,
        y = 0,
        a = 0;

        // clamp per
        per = Phaser.Math.clamp(per, 0, 1);

        // set angle
        a = -Math.PI / 2 - Math.PI / 180 * 45 * per * dir;

        // set velocity
        x = Math.floor(Math.cos(a) * 200);
        y = Math.floor(Math.sin(a) * 200);
        ball.body.velocity.set(x, y);

    };

    // create sheet helper
    var createPaddleSheet = function (game) {

        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 96;
        canvas.height = 16;
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, 96, 16);
        game.cache.addSpriteSheet('sheet-paddle', null, canvas, 96, 16, 1, 0, 0);

    };

    // create sprite helper
    var createPaddleSprite = function (game) {

        var x = game.world.width / 2,
        y = game.world.height - 32,
        paddle = game.data.paddle.sprite = game.add.sprite(x, y, 'sheet-paddle');
        paddle.anchor.set(0.5, 0.5);
        // physics
        game.physics.enable(paddle);
        paddle.body.immovable = true;
        paddle.body.collideWorldBounds = true;
        paddle.body.drag.set(180, 0);
        paddle.body.collideWorldBounds = true;
        // collision
        paddle.body.onCollide = new Phaser.Signal();
        paddle.body.onCollide.add(onPaddleCollide);

    };

    // called once to set things up
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};
        game.data.paddle = {};

        // start Arcade physics, should be the case by default but making sure
        // this will also reset, but not re create Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // PADDLE SPRITE SHEET
        createPaddleSheet(game);

        // PADDLE SPRITE
        createPaddleSprite(game);

    };

    // on each tick
    plug.update = function () {

        // check keyboard
        var kb = game.input.keyboard,
        paddle = game.data.paddle.sprite,
        ball = game.data.ball;

        // if there is a ball, check for collision
        if (ball) {
            game.physics.arcade.collide(ball.sprite, paddle);
        }

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
