

console.log(Phaser);

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // add a graphics object to the world
            var gra = game.add.graphics(0, 0);

            // making an interesting data object for this one
            gra.data = {

                maxLines : 20,
                maxSets : 4,
                lines : [],
                sx : 0,
                sy : game.world.height / 2,

                drawCount : 2,
                lastTime : new Date(),
                rate : 150,

                genLines : function () {

                    var i,
                    sx,
                    sy,
                    ex,
                    ey,
                    line,
                    h = game.world.height,
                    hh = h / 2,
                    range = h / 2,
                    setI = 0;

                    this.lines = [];

                    // make line sets
                    while (setI < this.maxSets) {

                        i = 0;
                        sx = this.sx;
                        sy = this.sy;

                        // gen lines for current set
                        while (i < this.maxLines) {

                            range = hh * (i / this.maxLines);

                            ex = game.world.width / this.maxLines * (i + 1);
                            ey = Math.random() * range + (hh - range / 2);

                            line = new Phaser.Line(sx, sy, ex, ey);

                            this.lines.push(line);

                            sx = ex;
                            sy = ey;

                            i += 1;
                        }

                        setI += 1;

                    }

                },

                update : function () {

                    var now = new Date();

                    if (now - this.lastTime >= this.rate) {

                        this.drawCount += 1;

                        if (this.drawCount >= this.lines.length) {

                            this.drawCount = 1;

                            this.genLines();

                        }

                        this.lastTime = now;
                    }

                },

                // draw to the given graphics object
                draw : function (gra) {

                    var i = 0,
                    len = this.drawCount,
                    //setI,
                    per,
                    line;

                    gra.clear();

                    gra.lineStyle(5, 0x000000);
                    while (i < len) {

                        line = this.lines[i];

                        //setI = Math.floor(i / this.maxLines);

                        per = i / (len - 1);

                        gra.lineAlpha = 1 - per;

                        // start by moving to a point
                        gra.moveTo(line.start.x, line.start.y);

                        // draw a line
                        gra.lineTo(line.end.x, line.end.y);

                        i += 1;
                    }

                }

            };

            gra.data.genLines();

            gra.data.draw(gra);

        },

        update : function () {

            var gra = game.world.children[0];

            gra.data.update();
            gra.data.draw(gra);

        }

    }, true);

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
