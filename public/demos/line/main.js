
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            var gra = game.add.graphics(0, 0),

            // making an instance of Phaser.Line
            line = new Phaser.Line(50, 190, 270, 190);

            //
            gra.lineStyle(3, 0xff0000);
            gra.moveTo(line.start.x, line.start.y);
            gra.lineTo(line.end.x, line.end.y);

            console.log(line);

        },

        // the update method will be called on each tick
        update : function () {}

    });
