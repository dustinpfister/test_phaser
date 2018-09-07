var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        game.state.start('demo');

    }

});

game.state.add('demo', {

    create: function () {

        game.paused = true;

    },

    paused: function () {

        console.log('yeah');

    },

    update: function () {

        console.log('tick');

    }

});

game.state.start('boot');
