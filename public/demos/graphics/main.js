var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // add a graphics object to the world
            var cir = game.add.graphics(game.world.centerX, game.world.centerY);

			console.log(cir);
			
            // make it a green circle
            cir.beginFill(0x00ff00);
            cir.drawCircle(0, 0, 100);
            cir.endFill();

        }

});

/*
var game = (function () {

    var bx, // ref to graphics object
    i = 0,
    maxI = 100;

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            bx = game.add.graphics(0, 0);

            bx.beginFill(0x00ff00);
            bx.drawCircle(50, 50, 100);
            bx.endFill();

        },

        // the update method will be called on each tick
        update : function () {

            var r = Math.PI * 2 / maxI * i;

            bx.x = game.world.centerX - 50 + Math.cos(r) * 50;
            bx.y = game.world.centerY - 50 + Math.sin(r) * 50;

            i += 1;

            if (i === maxI) {

                i = 0;

            }

        }

    });

}
    ());
*/