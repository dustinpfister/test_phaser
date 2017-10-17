// the actual Game state once everything is loaded
var Game = (function () {

    // State variables
    var point, // point display object
    maxI = 70, // max index for a point
    i = 0, // point index
    di = 1, // delta index

    target,
    tarI = 0,

    tickRate = 12, // tick rate
    lastTick = new Date(), //the last game tick

    // text disp objects
    text_index,

    // HELPERS
    // normalize the given point index on a circle
    normPTI = function (i) {

        //return i % maxI;

        return Math.floor((i % maxI + maxI) % maxI);

    },

    newIndex = function (i) {

        return normPTI(i + maxI / 2);

    };

    // return a phaser State object to the global
    return {

        create : function () {

            var style = {
                fill : 'white',
                font : '15px courier'
            };

            // text disp objects
            text_index = game.add.text(5, 5, '', style);

            // point disp object
            target = game.add.graphics(0, 0);
            target.beginFill(0xffff00);
            target.drawCircle(0, 0, game.world.width / 16);
            target.endFill();

            // target disp object
            point = game.add.graphics(0, 0);
            point.beginFill(0x00ff00);
            point.drawCircle(0, 0, game.world.width / 16);
            point.endFill();

            // input
            game.input.onDown.add(function (pt, b) {

                di = di === 1 ? -1 : 1;

            });

            // set a starting target index
            tarI = newIndex(i);

        },

        // what to do on each tick
        update : function () {

            var r = Math.PI * 2 / maxI * i,
            now = new Date();

            point.x = game.world.centerX + Math.cos(r) * (game.world.width / 4);
            point.y = game.world.centerY + Math.sin(r) * (game.world.width / 4);

            r = Math.PI * 2 / maxI * tarI
            target.x = game.world.centerX + Math.cos(r) * (game.world.width / 4);
            target.y = game.world.centerY + Math.sin(r) * (game.world.width / 4);

            text_index.text = 'index: ' + i + '/' + maxI;

            if (now - lastTick >= tickRate) {
                i += di;
                i = normPTI(i);
                lastTick = now;
            }

        }

    };

}
    ());
