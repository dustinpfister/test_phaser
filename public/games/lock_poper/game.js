// the actual Game state once everything is loaded
var Game = (function () {

    // State variables
    var pt, // point display object
    i = 0,  // point index
    maxI = 70, // max index for a point
    tickRate = 12,  // tick rate
    lastTick = new Date(), //the last game tick

    // HELPERS
    // normalize the given point index on a circle
    normPTI = function (i) {

        return i % maxI;

    };

    // return a phaser State object to the global
    return {

        create : function () {

            //game.add.sprite(0, 0, 'phaser');

            pt = game.add.graphics(0, 0);
            pt.beginFill(0x00ff00);
            pt.drawCircle(0, 0, game.world.width / 16);
            pt.endFill();

        },

        // what to do on each tick
        update : function () {

            var r = Math.PI * 2 / maxI * i,
            now = new Date();

            pt.x = game.world.centerX + Math.cos(r) * (game.world.width / 4);
            pt.y = game.world.centerY + Math.sin(r) * (game.world.width / 4);

            if (now - lastTick >= tickRate) {
                i += 1;
                i = normPTI(i);
                lastTick = now;
            }

        }

    };

}
    ());
