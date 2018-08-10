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

                ctx.strokeStyle = '#ffffff';

                // draw main circle
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();

                // draw smaller circle along the line of the main circle
                ctx.fillStyle = 'rgba('+Math.floor((255 * this.bias))+',0,0,1)';
                ctx.beginPath();
                ctx.arc(Math.cos(a) * 8 + cx, Math.sin(a) * 8 + cy, r / 4, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();

            }
        });

        var sprite = game.add.sprite(0, 0, 'sheet-basic', 0);
        sprite.animations.add('loop', null, 12, true);

        sprite.animations.play('loop');

    },

    update: function () {}

});

game.state.start('single-loop');
