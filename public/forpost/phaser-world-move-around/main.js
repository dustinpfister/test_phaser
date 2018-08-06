var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.data = {

    cursors: null

};

game.state.add('world-demo', {

    create: function () {

        game.world.resize(640, 240);

        sheetFromCanvas({

            game: game,
            name: 'sheet-player',
            frames: 1,
            forFrame: function (ctx) {

                ctx.fillStyle = '#00ff00';
                ctx.fillRect(0, 0, 32, 32);

            }

        });

        var player = game.add.sprite(0, 0, 'sheet-player', 0);
        player.name = 'player';

        game.data.cursors = game.input.keyboard.createCursorKeys()

    },

    update: function () {

        var player = game.world.getByName('player'),
        cursors = game.data.cursors;

        if (cursors.right.isDown) {

            player.x += 1;

        }

        if (cursors.left.isDown) {

            player.x -= 1;

        }

        if (cursors.down.isDown) {

            player.y += 1;

        }

        if (cursors.up.isDown) {

            player.y -= 1;

        }

    }

});

game.state.start('world-demo');
