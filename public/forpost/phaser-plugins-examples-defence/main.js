
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        Plugin_buildings(game, {});

    }

});

game.state.start('demo');
