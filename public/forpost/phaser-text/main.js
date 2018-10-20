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

game.state.add('text-update', {

    // create method
    create: function () {
        var data = game.data = {
            foos: 0
        };
        data.disp = game.add.text(20, 20, '', {
                fill: '#ffffff',
                font: '15px courier'
            });
    },

    // the update method will be called on each tick
    update: function () {

        // a text objects text can be changed via the text property
        var data = game.data;
        data.disp.text = 'foos: ' + data.foos;
        data.foos += 1;

    }

});

game.state.start('text-update');
