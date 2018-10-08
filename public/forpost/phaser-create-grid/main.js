
var createGrid = function (game, done) {

    game.create.grid('', 320, 240, 32, 24, 'red', true, done);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createGrid(game, function (texture) {

            game.add.sprite(0, 0, texture);

        });

    }

});

game.state.start('boot');
