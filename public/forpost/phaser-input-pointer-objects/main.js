var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        game.input.onDown.add(function (pt) {

            console.log(pt.x, pt.y);

        });

    }

});

game.state.start('basic');
