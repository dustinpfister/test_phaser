// the actual Game state once everything is loaded
var Game = (function () {

    var pt;

    return {

        create : function () {

            //game.add.sprite(0, 0, 'phaser');

            pt = game.add.graphics(0, 0);
            pt.beginFill(0x00ff00);
            pt.drawCircle(0, 0, 20);
            pt.endFill();

        },

        update : function () {

            pt.x = game.world.centerX;
            pt.y = game.world.centerY;

        }

    };

}
    ());
