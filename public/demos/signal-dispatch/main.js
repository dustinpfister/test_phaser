var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        var signal = new Phaser.Signal();

        signal.add(function () {

            console.log('foo');

        });

        signal.dispatch('foo');

    }

});

game.state.start('boot');
