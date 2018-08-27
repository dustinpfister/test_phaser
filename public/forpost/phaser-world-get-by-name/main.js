

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('example-1', {

    create: function () {

        var font = {
            fill: 'red',
            font: '15px courier'
        },
        mess = game.add.text(5, 5, '', font);

        // setting a name for the text object
        mess.name = 'mess';

        mess.data.tick = 0;

    },

    update: function () {

        var mess = game.world.getByName('mess');

        mess.text = 'tick: ' + mess.data.tick;

        mess.data.tick += 1;

    }

});

game.state.start('example-1');
