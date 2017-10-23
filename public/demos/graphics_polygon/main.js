
// Poly Model Example
var PM = (function () {

    var api = {

        pointCount : 10,

        // the points
        points : [],

        // parallel array of delta values for the points
        del : [],

        // set the staring status of points
        setPoints : function () {

            // current point index
            var pi = 0;

            this.points = [];

            while (pi < this.pointCount) {

                // set some radian, and radius values for each point
                var ra = Math.PI * 2 / this.pointCount * pi,
                ri = 75 + Math.random() * 25;

                // push x first, then y
                this.points.push(Math.floor(Math.cos(ra) * ri));
                this.points.push(Math.floor(y = Math.sin(ra) * ri));

                pi += 1;

            }

            // push first point at the end
            this.points.push(this.points[0]);
            this.points.push(this.points[1]);

        },

        //
        setDeltas : function () {

            this.del = [];

        }

    };

    return api;

}
    ());

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);

            PM.setPoints();

        },

        update : function () {

            var gra = game.world.children[0];

            gra.clear();

            gra.lineStyle(3, 0x00ff00);

            gra.drawPolygon(PM.points);

        }

    });
