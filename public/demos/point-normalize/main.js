var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var point = new Phaser.Point({
            x: 10,
            y: 1
        });

		//console.log(Phaser.Point.normalize);
		
       console.log(Phaser.Point.normalize(point));

    }

});

game.state.start('basic');
