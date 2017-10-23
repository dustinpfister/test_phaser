
/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

// create method
create : function () {

// add a graphics object to the world
var gra = game.add.graphics(game.world.centerX, game.world.centerY);

//gra.lineStyle(3, 0x00ff00);

gra.lineWidth = 3;
gra.lineColor = 0x00ff00;
gra.lineAlpha = 1;


gra.drawPolygon([0, -100, 100, 0, 0, 100, -50, 100, -50, 50, -100, 50, -100, -50, -50, -50, -50, -100, 0, -100]);

}

});
 */

var getPoints = function () {

    var pCT = 10, // point count
    p = [], // points array to be returned
    pi = 0; // current point index
    while (pi < pCT) {

        // set some radian, and radius values for each point
        var ra = Math.PI * 2 / pCT * pi,
        ri = 75 + Math.random() * 25;

        // push x first, then y
        p.push(Math.cos(ra) * ri);
        p.push(y = Math.sin(ra) * ri);

        pi += 1;

    }

    // push first point at the end
    p.push(p[0]);
    p.push(p[1]);

    // return the points
    return p;

},

points = getPoints();

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);

        },

        update : function () {

            var gra = game.world.children[0];

            points = getPoints();

            gra.clear();

            gra.lineStyle(3, 0x00ff00);

            gra.drawPolygon(points);

        }

    });
