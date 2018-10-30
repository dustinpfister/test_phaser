
var launchBall = function (game) {

    launch = game.data.launch,
    ball = game.data.ball,
    cannon = launch.cannon;

    ball.x = cannon.centerX;
    ball.y = cannon.centerY;
    ball.revive();

    var power = launch.distance / 200 * 50;

    ball.body.velocity.set(
        Math.cos(launch.angle) * power,
        Math.sin(launch.angle) * power);

};

var drawLines = function (game) {

    var launch = game.data.launch,
    cannon = launch.cannon;
    gfx = launch.gfx;

    gfx.clear();

    gfx.lineStyle(3, 0x00ff00, 1);
    //gfx.beginFill(0xff0000);
    //gfx.drawRect(0, 0, 200, 200);

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
    ball.body.collideWorldBounds = true;

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

        drawLines(game);

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
        drawLines(game);

    }

});

game.state.start('ball-bounce');
