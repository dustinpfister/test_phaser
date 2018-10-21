var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        var guy = game.add.sprite(0, 0, 'sheet-guy');

        game.physics.enable(guy);

        guy.body.gravity.set(0, 100);
        guy.body.collideWorldBounds = true;

    },

    update: function () {};

});

game.state.start('demo')
