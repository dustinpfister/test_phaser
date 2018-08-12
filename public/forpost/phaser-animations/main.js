// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// some global stuff
game.global = {};

game.state.add('ani-basic', {

    create: function () {

        sheetFromCanvas({
            game: game,
            name: 'box-guy',
            animations: [{
                    frames: 2,
                    forFrame: function (ctx) {

                        // red background
                        ctx.fillStyle = '#ff0000';
                        ctx.fillRect(0, 0, this.frameWidth, this.frameHeight)

                    }
                }, {
                    frames: 3,
                    forFrame: function (ctx) {

                        console.log(this.sx);

                        ctx.fillStyle = '#00ff00';
                        ctx.fillRect(0, 0, this.frameWidth, this.frameHeight)

                    }
                }, {
                    frames: 3,
                    forFrame: function (ctx) {

                        console.log(this.sx);

                        ctx.fillStyle = '#0000ff';
                        ctx.fillRect(0, 0, this.frameWidth, this.frameHeight)

                    }
                }
            ]

        });

        game.add.sprite(0, 0, 'sheet-basic', 0);

    },

    update: function () {}

});

game.state.start('ani-basic');
