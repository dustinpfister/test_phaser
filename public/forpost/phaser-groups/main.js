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
        blocks.name = 'blocks';

        var i = 0,
        len = 16,
        sprite,
        x,
        y;

        // using group.create to create sprites for the group
        while (i < len) {

            x = 32 + Math.random() * (game.world.width - 64);
            y = 32 + Math.random() * (game.world.height - 64);

            sprite = blocks.create(0, 0, 'block');
            sprite.name = 'block-' + i;
            sprite.frame = Math.floor(Math.random() * 3);
            sprite.data = {
                startX: x,
                startY: y,
                deltaX: 0,
                deltaY: 0,
                tick: 0,
                tickCount: 10
            };
            sprite.x = sprite.data.startX;
            sprite.y = sprite.data.startY;

            i += 1;
        }

        // every second
        game.time.events.loop(1000, function () {

            // run through each sprite
            blocks.forEach(function (sprite) {

                var dat = sprite.data;

                // and change the position
                //sprite.x = 32 + Math.random() * (game.world.width - 64);
                //sprite.y = 32 + Math.random() * (game.world.height - 64);


                dat.startX += dat.deltaX;
                dat.startY += dat.deltaY;

                dat.tick = 0;
                dat.deltaX = Math.random() * 50 - 25;
                dat.deltaY = Math.random() * 50 - 25;

            });

        });

    },

    update: function () {

        var blocks = game.world.getByName('blocks');

        blocks.forEach(function (sprite) {

            var dat = sprite.data,
            per = dat.tick / dat.tickCount;

            sprite.x = dat.startX + dat.deltaX * per;
            sprite.y = dat.startY + dat.deltaY * per;

            if (dat.tick < dat.tickCount) {

                dat.tick += 1;

            }

        });

    }

});

game.state.start('demo');
