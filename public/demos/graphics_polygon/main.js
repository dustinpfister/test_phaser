
// Poly Model Example
var PM = (function () {

    var api = {

        pointCount : 10,

        // the points
        points : [],

        // parallel array of delta values for the points
        data : [],

        // set the staring status of points
        setPoints : function () {

            // current point index
            var pi = 0,
            data;

            this.points = [];

            // set the values for each point
            this.setData();
            while (pi < this.pointCount) {

                data = this.data[pi];

                // push x first, then y
                this.points.push(Math.floor(Math.cos(data.radian) * data.radius));
                this.points.push(Math.floor(y = Math.sin(data.radian) * data.radius));

                pi += 1;

            }

            // push first point at the end
            this.points.push(this.points[0]);
            this.points.push(this.points[1]);

        },

        // set data values
        setData : function () {

            var i = 0;

            this.data = [];
            while (i < this.pointCount) {

                this.data.push({

                    radius : 50,
                    radian : Math.PI * 2 / this.pointCount * i,
                    deltaRadius : 1 - Math.floor(Math.random() * 2) * 2,
                    radiusMin : 20,
                    radiusMax : 100

                });

                i += 1;

            }

        },

        update : function () {

            var i = 0,
            data;
            while (i < this.pointCount) {

                data = this.data[i];

                data.radius += data.deltaRadius;

                if (data.radius <= data.radiusMin) {

                    data.radius = data.radiusMin;
                    data.deltaRadius = 1;

                }

                if (data.radius >= data.radiusMax) {

                    data.radius = data.radiusMax;
                    data.deltaRadius = -1;

                }

                this.points[i * 2] = Math.cos(data.radian) * data.radius;
                this.points[i * 2 + 1] = Math.sin(data.radian) * data.radius;

                i += 1;

            }

            // splice out the last point
            // and set it to the first point
            this.points.splice(this.points.length - 2, 1, this.points[0]);
            this.points.splice(this.points.length - 1, 1, this.points[1]);

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

            PM.update();

            gra.lineStyle(3, 0x00ff00);

            gra.drawPolygon(PM.points);

        }

    });
