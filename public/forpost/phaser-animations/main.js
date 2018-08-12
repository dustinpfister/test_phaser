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

                        ctx.fillStyle = '#ffffff';
                        ctx.strokeStyle = '#000000';

                        // legs
                        ctx.fillRect(x + 2, y + 16, 4, 12 - 8 * (1 - this.bias));
                        ctx.strokeRect(x + 2, y + 16, 4, 12 - 8 * (1 - this.bias));
                        ctx.fillRect(x + 10, y + 16, 4, 12 - 8 * (1 - this.bias));
                        ctx.strokeRect(x + 10, y + 16, 4, 12 - 8 * (1 - this.bias));

                        // body
                        ctx.fillRect(x, y, 16, 16);
                        ctx.strokeRect(x, y, 16, 16);

                    }
                }, {
                    frames: 8,
                    forFrame: function (ctx) {

                        var x = this.cx - 8,
                        y = this.cy - 8;

                        //ctx.fillStyle = '#00ff00';
                        //ctx.fillRect(0, 0, this.frameWidth, this.frameHeight);

                        ctx.fillStyle = '#ffffff';
                        ctx.strokeStyle = '#000000';

                        // legs
                        ctx.save();
                        ctx.translate(x + 4, y + 12);
                        ctx.rotate((Math.PI / 180 * 45) * (1 - this.bias));
                        ctx.fillRect(-2, 0, 4, 12);
                        ctx.strokeRect(-2, 0, 4, 12);
                        ctx.restore();

                        ctx.save();
                        ctx.translate(x + 12, y + 12);
                        ctx.rotate((-Math.PI / 180 * 45) * (1 - this.bias));
                        ctx.fillRect(-2, 0, 4, 12);
                        ctx.strokeRect(-2, 0, 4, 12);
                        ctx.restore();

                        // body
                        ctx.fillRect(x, y + 2 * this.bias, 16, 16);
                        ctx.strokeRect(x, y + 2 * this.bias, 16, 16);

                    }
                }
            ]

        });

        var sprite = game.add.sprite(0, 0, 'sheet-box-guy', 0);
        sprite.name = 'box-walk';

        // static movement animation
        sprite.animations.add('walk', [4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        sprite.animations.play('walk');
        sprite.x = 0;
        sprite.y = 96;
        sprite.data.right = true;

        sprite = game.add.sprite(0, 0, 'sheet-box-guy', 0);
        sprite.name = 'box-static';
        sprite.animations.add('static', [0, 1, 2, 3], 6, true);
        sprite.animations.play('static');

        sprite.x = 64;
        sprite.y = 32;

    },

    update: function () {

        var sprite = game.world.getByName('box-walk');

        if (sprite.data.right) {
            sprite.x += 1;
        } else {
            sprite.x -= 1;
        }

        sprite.x = Phaser.Math.clamp(sprite.x, 0, game.world.width - 32);

        if (sprite.x === 0 || sprite.x === game.world.width - 32) {

            sprite.data.right = !sprite.data.right;

        }

    }

});

game.state.start('ani-basic');
