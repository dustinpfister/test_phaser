
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        Plugin_paddle(game, {
            foo: 'bar'
        });

    }

});

game.state.start('demo');
