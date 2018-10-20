var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('text-basic', {

    create: function () {

        var text = 'hello world',
        x = 10,
        y = 10,
        font = {
            fill: 'white',
            font: '20px courier'
        };

        game.add.text(0, 0, 'Hello World', font);

    }

});

game.state.start('text-basic');
