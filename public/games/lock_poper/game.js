// the actual Game state once everything is loaded
var Game = (function () {

    // STATE VARIABLES
    var point, // point display object
    maxI = 30, // max index for a point
    i = 0, // point index
    di = 1, // delta index

    // target point
    target,
    tarI = 0,

    // game status
    gameOver = false,
    canDie = false,
    // tolerance is the number of index positions before and after the
    // current index where the player has a chance to act
    tolerence = 3,

    tickRate = 100, // tick rate
    lastTick = new Date(), //the last game tick

    // text disp objects
    text_index,

    // HELPERS
    // normalize the given point index on a circle
    normPTI = function (i) {

        //return i % maxI;

        return Math.floor((i % maxI + maxI) % maxI);

    },

    // get a new index that is a safe distance from the given point
    newIndex = function (i) {

        return normPTI(i + maxI / 2);

    },

    // distance between two points on a circle
    dist = function (a, b) {

        var h = maxI / 2,
        diff = normPTI(a - b);

        if (diff > h) {

            diff -= maxI;

        }

        return Math.abs(diff);

    },

    // set a point disp object with the given index
    setPoint = function (dispObj, i) {
        var r = Math.PI * 2 / maxI * i;
        dispObj.x = game.world.centerX + Math.cos(r) * (game.world.width / 4);
        dispObj.y = game.world.centerY + Math.sin(r) * (game.world.width / 4);
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
            text_dist = game.add.text(5, 20, '', style);
            text_status = game.add.text(5, 35, '', style);

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

            console.log(dist(5, 99));

            // input
            game.input.onDown.add(function (pt, b) {

                //onAction();

                di = di === 1 ? -1 : 1;
            });

            // set a starting target index
            tarI = newIndex(i);

        },

        // what to do on each tick
        update : function () {

            var now = new Date(),
            d = dist(i, tarI);

            // can the player die

            // the canDie flag is set true
            // if it is below tolerance
            if (d <= tolerence) {

                canDie = true;

            }

            if (canDie && d > tolerence) {

                gameOver = true;

            }

            // update pointer disp objects
            setPoint(point, i);
            setPoint(target, tarI);

            // update text disp objects
            text_index.text = 'index: ' + i + '/' + maxI;
            text_dist.text = 'dist: ' + d;
            text_status.text = 'canDie: ' + canDie + ', gameOver: ' + gameOver;

            if (!gameOver) {

                // step index
                if (now - lastTick >= tickRate) {
                    i += di;
                    i = normPTI(i);
                    lastTick = now;
                }

            }

        }

    };

}
    ());
