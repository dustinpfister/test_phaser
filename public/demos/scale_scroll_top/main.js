
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            bx = game.add.graphics(160, 120);

            bx.beginFill(0x00ff00);
            bx.drawCircle(0, 0, 240);
            bx.endFill();

            game.stage.backgroundColor = '#2a2a2a';

            game.scale.compatibility.scrollTo = false;
            // console.log(game.scale);


        },

        // the update method will be called on each tick
        update : function () {}

    });
