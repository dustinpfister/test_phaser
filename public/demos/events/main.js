
var game = (function () {

    var drawCircle = function (gra, size) {

        size = size || 100;

        // main circle
        gra.clear();
        gra.beginFill(0x00ff00);
        gra.drawCircle(0, 0, size, size);
        gra.endFill();

    },

    checkBounds = function (gra) {

        if (gra.x < gra.width / 2) {

            gra.x = gra.width / 2;

        }

        if (gra.x > game.world.width - gra.width / 2) {

            gra.x = game.world.width - gra.width / 2;

        }

        if (gra.y < gra.height / 2) {

            gra.y = gra.height / 2;

        }

        if (gra.y > game.world.height - gra.height / 2) {

            gra.y = game.world.height - gra.height / 2;

        }

    }

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            var gra = game.add.graphics(game.world.centerX, game.world.centerY),
            text = game.add.text(5, 5, '', {
                    fill : '#ffffff',
                    font : '15px courier'
                });

            drawCircle(gra);

            // prevent context menu on long press, or right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            }

            // enable input for the Graphics Display Object
            // this will add an instance of inputHanddler at gra.input
            // some event handlers at gra.events will now work like
            // gra.events.onInputDown
            gra.inputEnabled = true;

            // enable draggable events like gra.events.onDragStart
            gra.input.draggable = true;
            console.log(gra.input.draggable);

            gra.events.onDragStart.add(function (gra) {

                console.log('Drag start.');

            });

            gra.events.onDragUpdate.add(function (gra) {

                console.log('Drag update.');

                checkBounds(gra);

            });

            gra.events.onDragStop.add(function (gra) {

                console.log('Drag stop.');

                console.log(gra.x);

            });

            // add a single handler for onInputDown
            gra.events.onInputDown.add(function (gra) {

                console.log('down');

            });

            // add a single handler for onInputDown
            gra.events.onInputUp.add(function (gra) {

                console.log('up');

            });

            gra.events.onInputOver.add(function (gra) {

                console.log('over');

            });

            gra.events.onInputOut.add(function (gra) {

                console.log('out');

            });

        },

        // the update method will be called on each tick
        update : function () {

            var gra = game.world.children[0],
            text = game.world.children[1];

            //text.text = gra.events;


        }

    });

}
    ());
