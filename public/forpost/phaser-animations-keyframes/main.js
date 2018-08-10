// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// some global stuff
game.global = {};

game.state.add('single-loop', {

    create: function () {

        sheetFromCanvas({

            game: game,
            name: 'sheet-basic',
            frameWidth: 32,
            frameHeight: 64,
            frames: 20,
            forFrame: function (ctx) {

                var sa = -Math.PI,
                a = sa - Math.PI * this.bias,
                bounce = 4,
                cx = this.frameWidth / 2,
                cy = this.frameHeight / 2 - bounce * this.bias,
                r = this.frameWidth / 4;

                ctx.strokeStyle = '#ff0000';

                // draw body
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(Math.cos(a) * 8 + cx, Math.sin(a) * 8 + cy);
                ctx.closePath();
                ctx.stroke();

            }
        });

        var sprite = game.add.sprite(0, 0, 'sheet-basic', 0);
        sprite.animations.add('loop', null, 12,true);

        //sprite.animations.play('loop');

    },

    update: function () {}

});

game.state.start('single-loop');
