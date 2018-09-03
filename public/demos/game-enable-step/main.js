

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.enableStep();

game.state.add('demo', {

    create: function () {

        this.game.input.onDown.add(function () {

            game.step();

        });

    },

    update: function () {

        console.log('tick');

    }

});

game.state.start('demo');
