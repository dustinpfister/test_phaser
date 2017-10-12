
/*
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {

render : function () {

game.debug.pointer(game.input.mousePointer);

}

});
 */

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {

        create : function () {

            var st = {
                fill : '#ffffff',
                font : '15px courier'
            };

            game.add.text(20, 20, 'tx0', st);
            game.add.text(20, 40, 'tx1', st);

        },

        update : function () {

            var pt = game.input.mousePointer,
            time,
            tx = game.world.children;

            if (pt.isDown) {

                // time can be found thanks to pt.timeDown
                time = new Date() - pt.timeDown;

                tx[0].text = 'mouse is down!';
                tx[1].text = time;

            } else {

                tx[0].text = 'mouse is not down.';
                tx[1].text = '';

            }

        },

        render : function () {

            //game.debug.pointer(game.input.mousePointer);

        }

    });
