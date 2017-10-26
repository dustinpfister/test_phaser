
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            var bx = game.add.graphics(game.world.centerX, game.world.centerY);

            bx.beginFill(0x00ff00);
            bx.drawRect(-50, -50, 100, 100);
            bx.endFill();

            // enable input for the Graphics Display Object
            bx.inputEnabled = true;

            // add a single handler for onInputDown
            bx.events.onInputDown.add(function () {

                console.log('foo man chew');

            });

			console.log(Phaser);
			
			console.log(new Phaser.Signal());
			
        },

        // the update method will be called on each tick
        update : function () {}

    });
