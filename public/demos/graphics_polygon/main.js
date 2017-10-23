
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

        forAll : function (func) {

            var i = 0,
            api;
            while (i < this.pointCount) {

                api = {

                    i : i,
                    xi : i * 2,
                    yi : i * 2 + 1,
                    data : this.data[i],
                    points : this.points,
                    pointCount : this.pointCount

                };

                api.x = api.points[api.xi];
                api.y = api.points[api.yi];

                func.call(api, api.x, api.y);

                i += 1;
            }

        },

        // set data values
        setData : function () {

            var i = 0;

            this.data = [];
            while (i < this.pointCount) {

                this.data.push({

                    radius : 80,
                    radian : Math.PI * 2 / this.pointCount * i,
                    deltaRadius : 1 - Math.floor(Math.random() * 2) * 2,
                    radiusMin : 70 - Math.floor(Math.random() * 30),
                    radiusMax : 90 + Math.floor(Math.random() * 30),
                    rate : 33 + Math.floor(66 * Math.random()),
                    lastTime : new Date(),
                    prop : Math.random() * .25 + .25

                });

                i += 1;

            }

        },

        update : function () {

            var i = 0,
            roll,
            now,
            data;
            while (i < this.pointCount) {

                data = this.data[i];

                now = new Date();
                roll = Math.random();

                if (roll < data.prop) {

                    data.rate = 33 + Math.floor(66 * Math.random())

                }

                if (now - data.lastTime >= data.rate) {

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

                    data.lastTime = now;
                }

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

            PM.setPoints();

            var back = game.add.graphics(game.world.centerX, game.world.centerY);

            back.lineStyle(3, 000000, .4);

            PM.forAll(function (x, y) {

                back.moveTo(Math.cos(this.data.radian) * this.data.radiusMin,
                    Math.sin(this.data.radian) * this.data.radiusMin);
                back.lineTo(

                    Math.cos(this.data.radian) * this.data.radiusMax,
                    Math.sin(this.data.radian) * this.data.radiusMax);

            });

            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);

        },

        update : function () {

            var gra = game.world.children[1];

            gra.clear();

            PM.update();

            gra.lineStyle(6, 0x000000);

            gra.drawPolygon(PM.points);

            gra.lineStyle(2, 0xffffff);

            gra.drawPolygon(PM.points);
        }

    }, true);
