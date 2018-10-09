
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        Plugin_paddle(game, {});
        Plugin_ball(game, {});

    }

});

game.state.start('demo');
