
var updateAcceleration = function (game) {

    var ball = game.data.ball,
    pointCenter = new Phaser.Point(game.world.centerX, game.world.centerY),
    angle = ball.position.angle(pointCenter) - Math.PI / 2,
    distance = ball.position.distance(pointCenter);

    ball.body.acceleration.set(Math.cos(angle) * distance + 1, Math.sin(angle) * distance + 1);

};

var createBall = function (game) {

    game.data = game.data || {};

    var ball = game.data.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);

    // enable physics
    game.physics.enable(ball);

    // set some values for gravity, bounce, and drag
    ball.body.gravity.set(0, 0);
    ball.body.bounce.set(1, 1);
    ball.body.drag.set(0, 0);
    ball.body.acceleration.set(0, 0);

    //ball.fixedToCamera = true;

    ball.body.collideWorldBounds = true;

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

        game.data = {
            tick: 0,
            tickMax: 100
        };

        //game.world.resize(640, 480);

        createBallSheet(game);

        createBall(game);

        //updateAcceleration(game);

    },

    update: function () {

        updateAcceleration(game);

    }

});

game.state.start('ball-bounce');
