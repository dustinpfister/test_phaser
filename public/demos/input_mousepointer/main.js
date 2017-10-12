
//var tx;
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {

/*
        create : function () {

            tx = game.add.text(20, 20, '', {
                    fill : '#ffffff'
                });

        },

        update : function () {

            tx.text = game.input.pointers.length;

        },
*/
        render : function () {

            game.input.pointers.forEach(function (pointer) {

                game.debug.pointer(pointer);

            });

        }

    })
