// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// some global stuff
game.global = {};

game.state.add('ani-basic', {

    create: function () {

        sheetFromCanvas({
            game: game,
            name: 'sheet-box-guy',
            animations: [{
                    frames: 4,
                    forFrame: function (ctx) {

                        var x = this.cx - 8,
                        y = this.cy - 8 - 4 + 8 * (1 - this.bias);

                        // red background
                        ctx.fillStyle = '#ff0000';
                        ctx.fillRect(0, 0, this.frameWidth, this.frameHeight);

                        ctx.fillStyle = '#ffffff';

                        // legs
                        ctx.fillRect(x + 2, y + 16, 4, 12 - 8 * (1 - this.bias));
                        ctx.fillRect(x + 10, y + 16, 4, 12 - 8 * (1 - this.bias));

                        // body
                        ctx.fillRect(x, y, 16, 16);

                    }
                }, {
                    frames: 8,
                    forFrame: function (ctx) {

                        var x = this.cx - 8,
                        y = this.cy - 8;

                        ctx.fillStyle = '#00ff00';
                        ctx.fillRect(0, 0, this.frameWidth, this.frameHeight);

                        ctx.fillStyle = '#ffffff';

                        // legs
                        ctx.save();
                        ctx.translate(x + 4, y + 12);
                        ctx.rotate((Math.PI / 180 * 45) * (1 - this.bias));
                        ctx.fillRect(-2, 0, 4, 12);
                        ctx.restore();

                        ctx.save();
                        ctx.translate(x + 12, y + 12);
                        ctx.rotate((-Math.PI / 180 * 45) * (1 - this.bias));
                        ctx.fillRect(-2, 0, 4, 12);
                        ctx.restore();

                        // body
                        ctx.fillRect(x, y + 2 * this.bias, 16, 16);

                    }
                }
            ]

        });

        var sprite = game.add.sprite(0, 0, 'sheet-box-guy', 0);
        sprite.name = 'box-guy';

        // static movement animation
        sprite.animations.add('static', [0, 1, 2, 3], 6, true);
        sprite.animations.add('walk', [4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        sprite.animations.play('walk');

    },

    update: function () {}

});

game.state.start('ani-basic');
