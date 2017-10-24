

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create the sprite
        create : function () {

            var bx = game.add.graphics(game.world.centerX, game.world.centerY);

            bx.beginFill(0xff0000);
            bx.drawRect(-160, -120, 160, 120);
            bx.endFill();

            bx.inputEnabled = true;
            bx.input.draggable = true;

            bx.input.snapOnRelease = true;
            bx.input.snapX = 160;
            bx.input.snapY = 120;

            console.log(bx.input);

            bx.events.onDragStop.add(function (bx) {

                // snap back to center
                if (bx.x <= 0 || bx.x >= 480 || bx.y <= 0 || bx.y >= 360) {

                    bx.x = 160;
                    bx.y = 120;

                }

            });

        }

    });

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea',{

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
*/
