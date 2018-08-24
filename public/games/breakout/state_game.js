game.state.add('game', {

    create: function () {

        // ball
        var ball = game.add.sprite(0, 0, 'ball', 0),
        fd = game.global.frameData['ball'];
        ball.name = 'ball';
        ball.animations.add('roll', fd, 60, true);
        ball.animations.play('roll');

        // paddle
        var paddle = game.add.sprite(0, 0, 'paddle', 0);
        paddle.name = 'paddle';
        paddle.x = game.world.centerX;
        paddle.y = game.world.height - 16;
        paddle.anchor.set(0.5, 1);

        ball.x = paddle.x;
        ball.y = paddle.y - 20;

        // Setup blocks
        Blocks.setup();

        // mk text objects
        mkTextObjects({
            game: game,
            count: 2
        });

        // physics
        game.physics.enable([ball, paddle]);

        // no downward collision
        game.physics.arcade.checkCollision.down = false;

        ball.body.collideWorldBounds = true;
        ball.body.bounce.set(1);
        ball.body.velocity.set(150, 150);

        ball.checkWorldBounds = true;
        ball.events.onOutOfBounds.add(function () {

            ball.x = paddle.x;
            ball.y = paddle.y - 20;

        }, this);

        paddle.body.immovable = true;
        paddle.body.collideWorldBounds = true;

        ball.body.onCollide = new Phaser.Signal();
        ball.body.onCollide.add(function () {})

    },

    update: function () {

        var ball = game.world.getByName('ball'),
        paddle = game.world.getByName('paddle'),
        text;

        // default paddle velocity to zero
        paddle.body.velocity.set(0, 0);

        // check keyboard
        var k = game.input.keyboard;

        // set velocity based on keyboard
        if (k.isDown(37)) {
            paddle.body.velocity.set(-150, 0);
        }
        if (k.isDown(39)) {
            paddle.body.velocity.set(150, 0);
        }

        // collide with paddle
        game.physics.arcade.collide(ball, paddle);

        // collide with blocks
        game.physics.arcade.collide(ball, Blocks.blocks);

        // text display
        game.world.getByName('text-0').text = 'ball-velocity: ' + ball.body.velocity.x + ',' + ball.body.velocity.y;
        game.world.getByName('text-1').text = 'ball-position: ' + Math.floor(ball.x) + ',' + Math.floor(ball.y);

    }

});
