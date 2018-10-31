
var launchBall = function (game) {

    var launch = game.data.launch,
    ball = game.data.ball,
    gfx = launch.gfx,
    cannon = launch.cannon,
    power;

    if (!launch.active) {

        // set active
        launch.active = true;

        ball.x = cannon.centerX;
        ball.y = cannon.centerY;
        ball.revive();

        // have camera follow the ball
        game.camera.follow(ball);

        power = launch.distance / 200 * launch.maxPower;

        // velocity
        ball.body.velocity.set(
            Math.cos(launch.angle) * power,
            Math.sin(launch.angle) * power);

        // gravity
        ball.body.gravity.set(0, 100);

        // bounce
        ball.body.bounce.set(.4, .4);

        // drag
        ball.body.drag.set(40, 20);

    }

};

var drawGridLines = function () {

    var launch = game.data.launch,
    ball = game.data.ball,
    gfx = launch.gfx;

    var sx = -ball.x % 32,
    sy = Math.abs(ball.y - game.height) % 32;

    gfx.clear();
    gfx.lineStyle(3, 0x00ff00, .4);

    var cy = 0;
    while (cy < 8) {
        gfx.moveTo(0, sy + 32 * cy);
        gfx.lineTo(320, sy + 32 * cy);
        cy += 1;
    }

    var cx = 0;
    while (cx < 11) {
        gfx.moveTo(sx + 32 * cx, 0);
        gfx.lineTo(sx + 32 * cx, 240);
        cx += 1;
    }

};

var drawLaunchLines = function (game) {

    var launch = game.data.launch,
    cannon = launch.cannon,
    gfx = launch.gfx;

    gfx.clear();

    gfx.lineStyle(3, 0x00ff00, 1);

    // angle line
    gfx.moveTo(cannon.centerX, cannon.centerY);
    gfx.lineTo(cannon.centerX + Math.cos(launch.angle) * 200, cannon.centerY + Math.sin(launch.angle) * 200);

    // distance line
    var x = cannon.centerX + Math.cos(launch.angle) * launch.distance,
    y = cannon.centerY + Math.sin(launch.angle) * launch.distance;
    gfx.moveTo(x, y);
    gfx.lineTo(x + Math.cos(launch.angle - Math.PI / 2) * 32, y + Math.sin(launch.angle - Math.PI / 2) * 32);

};

var createLaunchLines = function (game, cannon) {

    var launch = game.data.launch = {};

    launch.pad = game.add.graphics();
    launch.angle = 0;
    launch.distance = 0;
    launch.active = false;
    launch.maxPower = 500;

    // no bounds for camera
    game.camera.bounds = null;

    var cannon = game.add.sprite(10, game.world.height - 32 - 10, 'sheet-cannon', 0);
    cannon.inputEnabled = true;
    cannon.events.onInputDown.add(function () {
        launchBall(game);
    });
    launch.cannon = cannon;

    var gfx = game.add.graphics();
    gfx.fixedToCamera = true;
    launch.gfx = gfx;

    var ball = game.data.ball = game.add.sprite(0, 0, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);
    ball.kill();
    // enable physics
    game.physics.enable(ball);

    // ball collides with only down bounds
    ball.body.collideWorldBounds = true;
    game.physics.arcade.checkCollision.down = true;
    game.physics.arcade.checkCollision.up = false;
    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;

    launch.pad.clear();
    launch.pad.beginFill(0xff0000);
    launch.pad.drawRect(0, 0, 240, 240);

    launch.pad.inputEnabled = true;
    launch.pad.events.onInputDown.add(function (gfx, pt) {
        //game.input.onDown.add(function (pt) {
        var angle = launch.cannon.position.angle(pt.position),
        distance = launch.cannon.position.distance(pt.position);

        launch.angle = angle;

        distance = Phaser.Math.clamp(distance, 0, 200);

        launch.distance = distance;

        drawLaunchLines(game);

        console.log(launch.angle);

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
        createLaunchLines(game);
        drawLaunchLines(game);

    },

    update: function () {

        var launch = game.data.launch;

        if (launch.active) {

            drawGridLines(game);

        }

    }

});

game.state.start('ball-bounce');
