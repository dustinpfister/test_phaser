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

// Groups
game.state.add('groups', {

    create: function () {

        var group = game.add.group();
        group.x = 32;
        group.y = 32;

        var bx = game.make.graphics(0, 0);
        bx.beginFill(0xff0000);
        bx.drawRect(0, 0, 32, 32);
        bx.endFill();

        // enable input, drag, and snap
        bx.inputEnabled = true;
        bx.input.draggable = true;
        bx.input.snapOnRelease = true;
        bx.input.snapX = 32;
        bx.input.snapY = 32;

        // what to do when the drag ends
        bx.events.onDragUpdate.add(function (bx) {
            if (bx.x < 0 || bx.x > 32 * 3 || bx.y < 0 || bx.y > 32 * 3) {
                bx.x = 0;
                bx.y = 0;
            }
        });

        // adding to the group
        group.add(bx);

    }

});

// Offset
game.state.add('drag-offet', {

    create: function () {

        var bx = game.add.graphics(64, 64);
        bx.beginFill(0xff0000);
        bx.drawRect(0, 0, 64, 64);
        bx.endFill();

        // enable input, drag, and snap
        bx.inputEnabled = true;
        bx.input.draggable = true;

        // setting drag offset
        bx.input.dragOffset.set(64, 64);

    }

});

var createBx = function (game, group, x, y) {

    // create graphics
    var gfx = game.make.graphics(x, y);
    gfx.beginFill(0x00ff00);
    gfx.drawRect(0, 0, 32, 32);
    gfx.endFill();

    // create a sprite with the graphics as a texture
    var bx = game.make.sprite(x, y, gfx.generateTexture());
    bx.inputEnabled = true;
    bx.input.draggable = true;
    bx.input.snapOnRelease = true;
    bx.input.snapX = 32;
    bx.input.snapY = 32;

    // making a name for the sprite
    bx.name = 'bx_' + group.children.length;

    // when the drag ends
    bx.events.onDragStop.add(function (bx1) {

        // loop all children of the group
        group.forEach(function (bx2) {

            // if the name does not equal the name of the sprite that as dropped
            // and if overlaps a box in the group
            if (bx2.name != bx1.name && bx1.overlap(bx2)) {

                // then the box was dropped on this one
                console.log('overlap!');
                console.log('bx1: ' + bx1.name);
                console.log('bx2: ' + bx2.name);
            }

        })

    });

    return bx;

};

// Offset
game.state.add('drag-and-drop', {

    create: function () {

        var group = game.add.group();

        group.add(createBx(game, group, 32, 32));
        group.add(createBx(game, group, 96, 32));
        group.add(createBx(game, group, 32, 96));
        group.add(createBx(game, group, 96, 96));

    }

});

game.state.start('drag-and-drop');
