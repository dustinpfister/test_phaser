
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// set some game values
game.transparent = true;
game.scale.compatibility.scrollTo = false;

game.state.add('circles',

    // so I want to place some stuff in a closure
    (function () {

        var conf,
        rOff = 0,
        i = 0,
        circles,

        setCircle = function (cr, ci, rOff) {
            var r;

            rOff = rOff || 0;

            r = Math.PI * 2 / conf.count * ci + rOff;
            cr.x = conf.cx + Math.cos(r) * conf.radius,
            cr.y = conf.cy + Math.sin(r) * conf.radius

        };

        // the State object that will get returned
        return {

            // so here is the init method
            init: function (opt) {

                var prop,

                // the defaults
                defaults = {

                    count: 3,
                    cx: 160,
                    cy: 120,
                    size: 32,
                    radius: 64,
                    color: 0x00ff00

                };

                opt = opt || {};

                // apply defaults to anything that is missing
                for (prop in defaults) {

                    if (opt[prop] === undefined) {

                        opt[prop] = defaults[prop];

                    }

                }

                // ref opt to the variable that will be shared across methods.
                conf = opt;

            },

            // the create method
            create: function () {

                var ci = 0,
                r,
                cir;

                // set up the circles based on conf settings
                circles = [];
                while (ci < conf.count) {

                    cir = game.add.graphics(0, 0);

                    cir.beginFill(conf.color);
                    cir.drawCircle(0, 0, conf.size);
                    cir.endFill();

                    setCircle(cir, ci);

                    circles.push(cir);

                    ci += 1;

                }

            },

            // showtime
            update: function () {

                var ci = 0;

                rOff = Math.PI * 2 / 100 * i;
                while (ci < conf.count) {

                    setCircle(circles[ci], ci, rOff);

                    ci += 1;
                }

                i++;
                if (i >= 100) {

                    i = 0;

                }

            }

        };

    }
        ()));

// start with default settings
game.state.start('circles', true, true, {

    count: 8,
    size: 16,
    color: 0x00afff

});
