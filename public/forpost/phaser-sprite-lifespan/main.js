
var createBallSpritePool = function (game) {

    game.data = game.data || {};

    var ballPool = game.data.ballPool = game.add.group();
    i = 0,
    len = 10;
    while (i < len) {
        ballPool.create(0, 0, 'sheet-ball', 0);
        i += 1;
    }

};

var createBallSheet = function (game) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = 16;
    canvas.height = 16;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(8, 8, 6, 0, Math.PI * 2);
    ctx.fill();

    game.cache.addSpriteSheet('sheet-ball', null, canvas, 16, 16, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createBallSheet(game);
        createBallSpritePool(game);

    }

});

game.state.start('boot');
