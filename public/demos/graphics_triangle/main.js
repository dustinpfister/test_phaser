
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);

            console.log(gra);

            gra.lineStyle(6, 0x00ff00);

            //gra.drawTriangle([0, 0, 100, 0, 100, 100, 0, 0],true);
            //gra.drawTriangle([0, 0, 0, 100, 100, 100, 0, 0],false);

            var points = [],
            i = 0,
            len = 3;
            while (i < len) {

                points.push(Math.random() * 160);
                points.push(Math.random() * 120);

                i += 1;
            }
            points.push(points[0]);
            points.push(points[01]);

            gra.drawTriangle(points, false);

            gra.lineStyle(3, 0xff0000);
            gra.drawTriangle(points, true);

            //gra.drawPolygon([0, 0, 100, 0, 100, 100, 0, 0])

            //gra.drawPolygon(points);

        }

    });
