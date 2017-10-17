
var Title = (function () {

    var disp,
    last = new Date(),
    rate = 500,
    dispText = false;

    return {

        create : function () {

            var titleText = 'Lock Poper!',
            textSize = 40;

            // find a better way to cener text
            game.add.text(game.world.centerX - 130, game.world.centerY - 70, titleText, {

                fill : 'white',
                font : textSize + 'px courier'

            });

            disp = game.add.text(game.world.centerX - 100, game.world.centerY, '', {

                    fill : 'white',
                    font : '15px courier'

                });

            game.input.onDown.add(function () {

                game.state.start('game');

            });

        },

        update : function () {

            var now = new Date();

            if (now - last >= rate) {

                dispText = !dispText;
                last = now;

            }

            disp.text = dispText ? 'press or click screen' : '';

        }

    };

}
    ());
