game.state.add('sheet', {

    create: function () {

        var frame = 0,
        maxFrame = 3,
        bitmap = new Phaser.BitmapData(game, '', 32 * maxFrame, 32),
        ctx;

        ctx = bitmap.context;
        while (frame < maxFrame) {

            var sx = 32 * frame + 0.5,
            per = frame / maxFrame;

            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx + 8 * per, 0, 16 - 8 * per, 16);

            frame += 1;

        }

        game.cache.addSpriteSheet('sheet-1', null, bitmap.canvas, 32, 32, 3, 0, 0);

        console.log(game.cache);

        var sprite = game.add.sprite(0, 0, 'sheet-1', 2);
        sprite.smoothed = false;
        sprite.x = 32;
        sprite.y = 32;

    }

});

game.state.start('sheet');
