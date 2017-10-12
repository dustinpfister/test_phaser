
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {

        render : function () {

            game.debug.pointer(game.input.mousePointer);

        }

    });
