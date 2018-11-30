var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// BASIC
game.state.add('basic', {

    // create the sprite
    create: function () {

        var bx = game.add.graphics(game.world.centerX, game.world.centerY);

        bx.beginFill(0xff0000);
        bx.drawRect(-50, -50, 100, 100);
        bx.endFill();

        bx.inputEnabled = true;
        bx.input.draggable = true;

    }

});

// SNAP EXAMPLE
game.state.add('snap', {

    // create the sprite
    create: function () {

        var bx = game.add.graphics(game.world.centerX, game.world.centerY);

        bx.beginFill(0xff0000);
        bx.drawRect(-160, -120, 160, 120);
        bx.endFill();

        // enable input, and make the object draggable
        bx.inputEnabled = true;
        bx.input.draggable = true;

        // enable snap by enabling snap on release
        bx.input.snapOnRelease = true;
        bx.input.snapX = 160;
        bx.input.snapY = 120;

        // keep the sprite from snapping out of bounds
        // with the onDragStop event
        bx.events.onDragStop.add(function (bx) {

            // snap back to center
            if (bx.x <= 0 || bx.x >= 480 || bx.y <= 0 || bx.y >= 360) {

                bx.x = 160;
                bx.y = 120;

            }

        });

    }

});

game.state.start('snap');
