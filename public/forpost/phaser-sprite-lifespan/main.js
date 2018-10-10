
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

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {}

});

game.state.start('boot');
