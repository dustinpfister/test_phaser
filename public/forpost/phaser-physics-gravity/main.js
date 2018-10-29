var makeBall = function (game) {

    game.data = game.data || {};

    var ball = game.data.ball = game.make.sprite(game.world.centerX, 0, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);

    // enable physics
    game.physics.enable(ball);

    ball.body.collideWorldBounds = true;

    return ball;

};

var createBallGroup = function (game) {

    var group = game.data.group = game.add.group(),
    per,
    ball;

    var i = 0,
    len = 5;
    while (i < len) {

        per = i / len;
        ball = makeBall(game);

        ball.x = 50 + 250 * per;
        ball.y = 100;

        group.add(ball);

        i += 1;

    }

};

var createBallSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = '#8f0000';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    game.cache.addSpriteSheet('sheet-ball', null, canvas, 32, 32, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('ball-bounce', {

    create: function () {

        game.data = {};

        createBallSheet(game);

        createBallGroup(game);

    },

    update: function () {

        // clear gravity of all balls
        game.data.group.forEach(function (ball) {

            ball.body.gravity.set(0, 0);

        });

        // clear gravity of all balls
        game.data.group.forEach(function (ball1) {

            // clear gravity of all balls
            game.data.group.forEach(function (ball2) {

                var d = ball1.position.distance(ball2),
                a = ball1.position.angle(ball2);

                if (d <= 150) {

                    var per = d / 150;

                    ball1.body.gravity.x += Math.cos(a) * (10) * (1-per);
                    ball1.body.gravity.y += Math.sin(a) * (10) * (1-per);

                }

            });

        });

    }

});

game.state.start('ball-bounce');
