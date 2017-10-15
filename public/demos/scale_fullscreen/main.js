
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            bx = game.add.graphics(160, 120);

            bx.beginFill(0x00ff00);
            bx.drawCircle(0, 0, 240);
            bx.endFill();

            game.stage.backgroundColor = '#2a2a2a';

            game.input.onDown.add(function () {

                // Stretch to fill
                //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

                // Maintain aspect ratio
                game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

                // if game is full screen
                if (game.scale.isFullScreen) {

                    // turn it off
                    game.scale.stopFullScreen();
                } else {

                    // else turn it on
                    game.scale.startFullScreen(false);
                }

            });

        },

        // the update method will be called on each tick
        update : function () {}

    });
