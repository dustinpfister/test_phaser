var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        // green block sheet
        sheetFromCanvas({
            name: 'block',
            game: game,
            frames: 3,
            frameWidth: 16,
            frameHeight: 16,
            forFrame: function (ctx) {
                var colors = ['red', 'white', 'blue'];
                ctx.fillStyle = colors[this.f];
                ctx.lineWidth = 3;
                ctx.fillRect(0, 0, 32, 32);
            }
        });

        // making a group
        var blocks = game.add.group();

        var i = 0,
        len = 160,
        sprite,
        x,
        y;

        // uisng group.create to create sprites for the group
        while (i < len) {

            x = 32 + Math.random() * (game.world.width - 64);
            y = 32 + Math.random() * (game.world.height - 64);

            sprite = blocks.create(x, y, 'block');
            sprite.name = 'block-' + i;
            sprite.frame = Math.floor(Math.random() * 3);

            i += 1;
        }

        game.time.events.loop(1000, function () {

            blocks.forEach(function (sprite) {

                sprite.x = 32 + Math.random() * (game.world.width - 64);
                sprite.y = 32 + Math.random() * (game.world.height - 64);

            });

        });

    }

});

game.state.start('demo');
