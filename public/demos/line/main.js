
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // making a graphics display object
            var gra = game.add.graphics(0, 0),

            // making an instance of Phaser.Line
            line = new Phaser.Line(50, 190, 270, 190);

            // draw the line
            gra.lineStyle(3, 0xff0000);
            gra.moveTo(line.start.x, line.start.y);
            gra.lineTo(line.end.x, line.end.y);

			
            //console.log(line.midPoint());

			
        }

    });
