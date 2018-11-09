var createBall = function (game) {

    game.data = game.data || {};

    var ball = game.data.ball = game.add.sprite(game.world.centerX, 0, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);

    // enable physics
    game.physics.enable(ball);

    // set some values for gravity, bounce, and drag
    ball.body.gravity.set(0, 100);
    ball.body.bounce.set(1, 1);
    ball.body.drag.set(10, 10);
    ball.body.collideWorldBounds = true;

    ball.body.onCollide = new Phaser.Signal();
    ball.body.onCollide.add(function () {

        console.log('foo');

    });

};

var createBlocks = function (game) {

    var block = game.data.block = game.add.sprite(game.world.centerX, game.world.height - 32, 'sheet-block', 0);
    block.anchor.set(0.5, 0.5);

    game.physics.enable(block);

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

var createBlockSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 16;
    ctx.fillStyle = '#8fef00';
    ctx.fillRect(0, 0, 64, 16);
    game.cache.addSpriteSheet('sheet-block', null, canvas, 64, 16, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('ball-bounce', {

    create: function () {

        createBallSheet(game);
        createBlockSheet(game);

        createBall(game);
        createBlocks(game);

    },

    update: function () {

        var data = game.data;

        game.physics.arcade.collide(data.ball, data.block);

    }

});

game.state.start('ball-bounce');
