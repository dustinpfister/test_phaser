
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
{
 
        // create method
        create : function () {
 
            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);
 
            gra.lineStyle(3, 0x00ff00);
            gra.drawPolygon([0, -100, 100, 0, 0, 100,-50,100,-50,50,-100,50,-100,-50,-50,-50,-50,-100,0,-100]);
 
        }
 
    }
 
);
