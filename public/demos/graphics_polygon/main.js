
// Poly Model Example
var PM = (function () {

    var api = {

        p : [],

        setPoints : function () {

            var pCT = 10, // point count
            pi = 0,
            p; // current point index

            this.p = [];

            p = this.p;
            while (pi < pCT) {

                // set some radian, and radius values for each point
                var ra = Math.PI * 2 / pCT * pi,
                ri = 75 + Math.random() * 25;

                // push x first, then y
                p.push(Math.floor(Math.cos(ra) * ri));
                p.push(Math.floor(y = Math.sin(ra) * ri));

                pi += 1;

            }

            // push first point at the end
            p.push(p[0]);
            p.push(p[1]);

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

            console.log(PM.p);

        },

        update : function () {

            var gra = game.world.children[0];

			PM.setPoints();
			
            gra.clear();

            gra.lineStyle(3, 0x00ff00);

            gra.drawPolygon(PM.p);

        }

    });
