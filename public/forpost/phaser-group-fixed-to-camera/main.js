var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('example', {

    create: function () {

        var font = {
            fill: 'white'
        };

        var text = game.add.text(5, 5, 'fixed to camera', font);

        game.world.fixedToCamera = true;
		
		console.log(game.world.cameraOffset)

        console.log();

    }

});

game.state.start('example');
