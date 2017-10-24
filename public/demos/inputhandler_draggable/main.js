
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
{
 
        // create the sprite
        create : function () {
 
            var bx = game.add.graphics(game.world.centerX, game.world.centerY);
 
            bx.beginFill(0xff0000);
            bx.drawRect(-50, -50, 100, 100);
            bx.endFill();
 
            bx.inputEnabled = true;
            bx.input.draggable = true;
 
        }
 
    }
 
);
