// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// some global stuff
game.global = {};

game.state.add('single-loop', {

    create: function () {

        sheetFromCanvas({

            game: game,
            name: 'sheet-basic',
            frames: 5,
            forFrame: function (ctx) {

                //ctx.fillStyle = '#ff0000';
                //ctx.fillRect(0, 0, this.frameWidth / 2 * this.per + this.frameWidth / 2, this.frameHeight);

                ctx.strokeStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(this.frameWidth / 2, this.frameHeight / 2, this.frameWidth / 4, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();

            }
        });

        var sprite = game.add.sprite(0, 0, 'sheet-basic', 3);
        sprite.animations.add('loop', [0, 1, 2, 3], 30, true);

        //sprite.animations.play('loop');

    },

    update: function () {}

});

game.state.start('single-loop');
