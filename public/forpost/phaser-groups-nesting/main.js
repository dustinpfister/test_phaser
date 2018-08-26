var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('game', {

    create: function () {

        // green block sheet
        sheetFromCanvas({
            name: 'badguys',
            game: this.game,
            frames: 3,
            frameWidth: 16,
            frameHeight: 16,
            forFrame: function (ctx) {
                var colors = ['green', 'red', 'blue'];
                ctx.fillStyle = colors[this.f];
                ctx.lineWidth = 3;
                ctx.fillRect(0, 0, 32, 32);
            }
        });

        var w = new Wave({
                game: this.game,
                sheetKey: 'badguys',
                name: 'wave-1'
            });

		console.log(w);
			
        //game.add.sprite(10,10,'badguys');

    }

});

game.state.start('game');
