
var createBallSpritePool = function (game) {

    game.data = game.data || {};

    var ballPool = game.data.ballPool = game.add.group();
    i = 0,
    len = 10;
    while (i < len) {

        // sprites start out dead, but will be revived
        var sprite = ballPool.create(0, 0, 'sheet-ball', 0);
        sprite.anchor.set(0.5, 0.5);
        sprite.kill();

        game.physics.enable(sprite);
        sprite.body.gravity.set(0, 200);

        i += 1;
    }

};

var createBallSheet = function (game) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = 32;
    canvas.height = 16;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(8, 8, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8f0000';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(24, 8, 6, 0, Math.PI * 2);
    ctx.fill();

    game.cache.addSpriteSheet('sheet-ball', null, canvas, 16, 16, 2, 0, 0);
};

var lanuchBalls = function () {

    var ballPool = game.data.ballPool,
    button = game.data.button;

    ballPool.forEachDead(function (ball) {

        // revive and set some values
        ball.revive();
        ball.x = button.x;
        ball.y = button.y;
        ball.body.velocity.set(-100 + Math.floor(200 * Math.random()), Math.floor(-50 - 150 * Math.random()));
        ball.alpha = 1;

        // setting lifespan to 500 - 3000ms
        ball.lifespan = 500 + Math.floor(2500 * Math.random());

    });

};

var alphaEffect = function (game) {

    var ballPool = game.data.ballPool;

    ballPool.forEachAlive(function (ball) {

        ball.alpha = ball.lifespan / 3000;

    })

};

var createButton = function (game) {

    var button = game.data.button = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet-ball', 1);
    button.width = 128;
    button.height = 128;
    button.anchor.set(0.5, 0.5);
    button.inputEnabled = true;
    button.events.onInputDown.add(lanuchBalls);
    game.world.moveDown(button);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createBallSheet(game);
        createBallSpritePool(game);
        createButton(game);

    },

    update: function () {

        alphaEffect(game);

    }

});

game.state.start('boot');
