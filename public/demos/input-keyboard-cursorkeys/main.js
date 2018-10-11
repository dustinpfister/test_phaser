
var createBallSheet = function (game) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = 32;
    canvas.height = 32;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(16, 16, 12, 0, Math.PI * 2);
    ctx.fill();

    game.cache.addSpriteSheet('sheet-ball', null, canvas, 32, 32, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createBallSheet(game);

        var sprite = game.add.sprite(0, 0, 'sheet-ball');

    }

});

game.state.start('boot');
