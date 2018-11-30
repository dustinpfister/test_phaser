var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// BASIC
game.state.add('basic', {

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

            bx.x -= 10;

        });

    }

});

// ON DRAG METHODS
game.state.add('on-drag-methods', {

    create: function () {

        var bx = game.add.graphics(32, 32);
        bx.beginFill(0xff0000);
        bx.drawRect(0, 0, 32, 32);
        bx.endFill();

        // enable input, drag, and snap
        bx.inputEnabled = true;
        bx.input.draggable = true;
        bx.input.snapOnDrag = true;
        bx.input.snapX = 32;
        bx.input.snapY = 32;

        // what to do when the drag starts
        bx.events.onDragStart.add(function () {
            console.log('drag start');
        });

        // what to do when the drag updates
        bx.events.onDragUpdate.add(function (bx) {
            console.log(bx.x / 32, bx.y / 32);
        });

        // what to do when the drag ends
        bx.events.onDragStop.add(function (bx) {
            // snap back to center
            if (bx.x <= 0 || bx.x >= game.world.width || bx.y <= 0 || bx.y >= game.world.height) {
                bx.x = 0;
                bx.y = 0;
            }
        });

    }

});

game.state.add('drag-offet', {

    create: function () {

        var bx = game.add.graphics(0, 0);
        bx.beginFill(0xff0000);
        bx.drawRect(0, 0, 32, 32);
        bx.endFill();

        // enable input, drag, and snap
        bx.inputEnabled = true;
        bx.input.draggable = true;
        bx.input.snapOnDrag = true;
        bx.input.snapX = 32;
        bx.input.snapY = 32;

        bx.input.dragOffset.set(32, 32);

        console.log(bx.input)

    }

});

game.state.start('drag-offet');
