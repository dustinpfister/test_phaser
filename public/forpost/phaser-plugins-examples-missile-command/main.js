
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        Plugin_missiles(game, {});

        var missile = game.data.missiles.children[0];

        missile.data.set('p', 160, 240, 100, 50);
        missile.data.launch();

    }

});

game.state.start('demo');
