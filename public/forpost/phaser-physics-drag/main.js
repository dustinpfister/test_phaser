
var createLaunchLines = function (game, launcher) {

    var gfx = game.add.graphics();
    gfx.fixedToCamera = true;

    var launch = game.data.launch = {};

    launch.launcher = launcher;
    launch.angle = 0;

    game.input.onDown.add(function (pt) {

        var angle = launch.launcher.position.angle(pt.position);

        if (angle < 0) {
            angle = 0;
        }

        launch.angle = angle;

        drawLines();

    });

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

var createCannonSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#8f0000';
    ctx.fillRect(0, 0, 32, 32);
    game.cache.addSpriteSheet('sheet-cannon', null, canvas, 32, 32, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('ball-bounce', {

    create: function () {

        game.data = {};

        createBallSheet(game);
        createCannonSheet(game);

        var ball = game.data.ball = game.add.sprite(0, 0, 'sheet-ball', 0);
        ball.anchor.set(0.5, 0.5);
        ball.kill();
        // enable physics
        game.physics.enable(ball);
        ball.body.collideWorldBounds = true;

        var cannon = game.add.sprite(10, game.world.height - 32 - 10, 'sheet-cannon', 0);

        createLaunchLines(game, cannon);

    }

});

game.state.start('ball-bounce');
