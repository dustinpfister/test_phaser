

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('game', {

    // create method
    create: function () {

        // add a graphics object to the world
        var cir = game.add.graphics(game.world.centerX, game.world.centerY);

        // make it a green circle
        cir.beginFill(0x00ff00);
        cir.drawCircle(0, 0, 100);
        cir.endFill();

    }

});

game.state.start('game');
