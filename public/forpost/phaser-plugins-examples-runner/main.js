
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        Plugin_runner(game, {});
        Plugin_platforms(game, {});

    }

});

game.state.start('demo');
