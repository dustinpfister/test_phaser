
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // add a graphics object to the world
            var gra = game.add.graphics(0, 0);

            // make it a red rectangle
            gra.lineStyle(3, 0xff0000);

            gra.data = {

                maxLines : 10,
                lines : [],
                sx : 0,
                sy : game.world.height / 2,
                genLines : function () {

                    var i = 0,
                    sx = this.sx,
                    sy = this.sy,
                    ex,
                    ey,
                    line;

                    // gen lines
                    while (i < this.maxLines) {

                        ex = game.world.width / this.maxLines * (i+1);
                        ey = Math.random() * game.world.height;

                        line = new Phaser.Line(sx, sy, ex, ey);

                        this.lines.push(line);

                        sx = ex;
                        sy = ey;

                        i += 1;
                    }

                },

                // draw to the given graphics object
                draw : function (gra) {

                    gra.clear();

                    gra.lineStyle(3, 0xff0000);

                    this.lines.forEach(function (line) {

                        console.log(line.start.y)

                        // start by moving to a point
                        gra.moveTo(line.start.x, line.start.y);

                        // draw a line
                        gra.lineTo(line.end.x, line.end.y);

                    });

                }

            };

            gra.data.genLines();

            gra.data.draw(gra);


        },

        update : function () {}

    },true);

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

// create method
create : function () {

// add a graphics object to the world
var gra = game.add.graphics(game.world.centerX, game.world.centerY);

// make it a red rectangle
gra.lineStyle(3, 0xff0000);

var i = 0,
len = 12;
while (i < len + 1) {

var r = Math.PI * 2 / len * i,
radius = 50 - 25 * (i % 2),
method;

method = i === 0 ? 'moveTo' : 'lineTo';

gra[method](

Math.cos(r) * radius,
Math.sin(r) * radius);

i += 1;
}

}

});
*/
