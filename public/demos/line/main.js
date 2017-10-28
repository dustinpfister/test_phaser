
console.log(new Phaser.Line());
console.log(Phaser.Math);

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // making a graphics display object
            var gra = game.add.graphics(0, 0),

            // making an instance of Phaser.Line
            line1 = new Phaser.Line(-100, 0, 0, 0),
            line2 = new Phaser.Line(0, 100, 100, 0),

            // draw line method
            drawLine = function (gra, line) {

                gra.moveTo(line.start.x, line.start.y);
                gra.lineTo(line.end.x, line.end.y);

            };

			line1.centerOn(100,120);
			
			console.log(line1.start.x); // 50
			
            // draw the lines
            gra.lineStyle(3, 0xff0000);
            drawLine(gra, line1);
            drawLine(gra, line2);

            var cp = Phaser.Line.intersects(line1, line2);

			if(cp){
            
			   console.log(cp.x + ',' + cp.y);
			
			}
			console.log(line1.midPoint())

        }

    });

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

// create method
create : function () {

// making a graphics display object
var gra = game.add.graphics(0, 0),

// making an instance of Phaser.Line
baseLine = new Phaser.Line(50, 190, 270, 190),

// get the midpoint of the baseline
mp = baseLine.midPoint(),

// make a new center line off from the midpoint of baseLine
centerLine = new Phaser.Line(mp.x, mp.y, mp.x, baseLine.y - 100),

// draw line method
drawLine = function (gra, line) {

gra.moveTo(line.start.x, line.start.y);
gra.lineTo(line.end.x, line.end.y);

}

// draw the lines
gra.lineStyle(3, 0xff0000);
drawLine(gra, baseLine);
drawLine(gra, centerLine);

}

});
*/
