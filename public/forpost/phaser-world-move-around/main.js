var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.data = {

    cursors: null

};

game.state.add('world-demo', {

    create: function () {

        var i,
        sprite,
        player,
        len,
        x,
        y

        // set world size twice that of the native camera size
        // given to the phaser camera constructor
        game.world.resize(640, 480);

        // making a sheet for objects
        sheetFromCanvas({

            game: game,
            name: 'sheet-object',
            frames: 1,
            forFrame: function (ctx) {

                ctx.fillStyle = '#0000ff';
                ctx.fillRect(0, 0, 32, 32);

            }

        });

        // a sheet for the player
        sheetFromCanvas({

            game: game,
            name: 'sheet-player',
            frames: 1,
            forFrame: function (ctx) {

                ctx.fillStyle = '#00ff00';
                ctx.fillRect(0, 0, 32, 32);

            }

        });

        // place some objects in the world
        i = 0;
        len = 20;
        while (i < len) {

            x = Math.floor(Math.random() * (game.world.width - 32));
            y = Math.floor(Math.random() * (game.world.height - 32));

            sprite = game.add.sprite(x, y, 'sheet-object', 0);
            sprite.name = 'object' + i;

            i += 1;

        }

        // the player sprite
        player = game.add.sprite(0, 0, 'sheet-player', 0);
        player.name = 'player';
        player.data = {
            dx: 0,
            dy: 0
        };

        // keyboard cursor keys
        game.data.cursors = game.input.keyboard.createCursorKeys();

        // have the camera follow the player sprite
        game.camera.target = player;

    },

    // update loop
    update: function () {

        var player = game.world.getByName('player'),
        cursors = game.data.cursors;

        // data the deltas based a keyboard input
        if (cursors.right.isDown)
            player.data.dx += .25;
        if (cursors.left.isDown)
            player.data.dx -= .25;
        if (cursors.down.isDown)
            player.data.dy += .25;
        if (cursors.up.isDown)
            player.data.dy -= .25;

        // crude friction
        player.data.dx /= 1.05;
        player.data.dy /= 1.05;
        if (player.data.dx > 0 && player.data.dx <= 0.1)
            player.data.dx = 0;
        if (player.data.dx < 0 && player.data.dx >= -0.1)
            player.data.dx = 0;
        if (player.data.dy > 0 && player.data.dy <= 0.1)
            player.data.dy = 0;
        if (player.data.dy < 0 && player.data.dy >= -0.1)
            player.data.dy = 0;

        // clamp deltas
        player.data.dx = Phaser.Math.clamp(player.data.dx, -5, 5);
        player.data.dy = Phaser.Math.clamp(player.data.dy, -5, 5);

        // add to player pos by deltas
        player.x += Math.floor(player.data.dx);
        player.y += Math.floor(player.data.dy);

        // clamp player pos
        player.x = Phaser.Math.clamp(player.x, 0, (game.world.width - 32));
        player.y = Phaser.Math.clamp(player.y, 0, (game.world.height - 32));

    }

});

game.state.start('world-demo');
