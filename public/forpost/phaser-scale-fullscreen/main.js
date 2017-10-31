
var game = (function () {

    var updateInfo;

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // create some kind of graphic
            var gra = game.add.graphics(160, 120),

            // text style
            style = {
                fill : '#ffffff',
                font : '12px courier',
                align : 'center',
                boundsAlignH : 'center'
            },

            // text 1
            text1 = game.add.text(0, 0, 'tx1', style);

            // update info method
            updateInfo = function () {

                if (game.scale.compatibility.supportsFullScreen) {

                    text1.text = 'Client supports fullscreen';
                    text1.text += '\n click or touch to toggle';
                    text1.text += '\n isFullScreen: ' + game.scale.isFullScreen;

                    text1.text += '\n world size: ' + game.world.width + ',' + game.world.height;
                    text1.text += '\n scale size: ' + game.scale.width + ',' + game.scale.height;

                } else {

                    text1.text = 'Client does not support full screen';

                }

            };

            // set text bounds
            text1.setTextBounds(0, 20, game.world.width, game.world.height);

            // update into for first time
            updateInfo();

            // draw graphic
            gra.beginFill(0x0000ff);
            gra.drawCircle(0, 0, 240);
            gra.endFill();

            // set background color
            game.stage.backgroundColor = '#2a2a2a';

            // disable scrollTo
            game.scale.compatibility.scrollTo = false;

            // add a handler for onDown that will toggle full screen
            game.input.onDown.add(function () {

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

                console.log(game.scale);

            });

        },

        update : function () {

            // update info
            updateInfo();

        }

    });

}
    ());
