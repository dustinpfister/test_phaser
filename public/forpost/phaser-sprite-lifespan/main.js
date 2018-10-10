
var createBallSpritePool = function (game) {

    game.data = game.data || {};

    var ballPool = game.data.ballPool = game.add.group();
    i = 0,
    len = 10;
    while (i < len) {

        // sprites start out dead, but will be revived
        var sprite = ballPool.create(0, 0, 'sheet-ball', 0);
        sprite.kill();

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

    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(24, 8, 6, 0, Math.PI * 2);
    ctx.fill();

    game.cache.addSpriteSheet('sheet-ball', null, canvas, 16, 16, 2, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createBallSheet(game);
        createBallSpritePool(game);

        var button = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet-ball', 1);
        button.width = 128;
        button.height = 128;
        button.anchor.set(0.5, 0.5);

    }

});

game.state.start('boot');
