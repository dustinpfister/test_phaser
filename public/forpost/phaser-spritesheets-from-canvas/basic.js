game.state.add('basic', {

    data: {
        maxFrame: 24,
        frameRate: 100,
        lastFrame: new Date()
    },

    create: function () {

        var frame = 0,
        maxFrame = this.data.maxFrame,
        frameWidth = 64,
        frameHeight = 64,
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');

        canvas.width = frameWidth * maxFrame;
        canvas.height = frameHeight;
        while (frame < maxFrame) {

            // figure startx, and percent done
            var sx = frameWidth * frame + 0.5,
            per = frame / maxFrame;

            // draw for current frame
            ctx.strokeStyle = '#00ff00';
            ctx.save();
            ctx.translate(sx + 32, 32);
            ctx.rotate(Math.PI * 2 * per);
            ctx.strokeRect(-16, -16, 32, 32);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 30);
            ctx.stroke();
            ctx.restore();

            // next frame
            frame += 1;

        }

        // add a new sheet to cache
        game.cache.addSpriteSheet('sheet-1', null, canvas, frameWidth, frameHeight, maxFrame, 0, 0);

        // create a sprite with the sheet
        var sprite = game.add.sprite(0, 0, 'sheet-1', 0);
        sprite.smoothed = false;
        sprite.name = 'sp1';
        sprite.x = game.world.centerX - sprite.width / 2;
        sprite.y = game.world.centerY - sprite.height / 2;

    },

    // loop frames
    update: function () {

        var sprite = game.world.getByName('sp1'),
        now = new Date();

        if (now - this.data.lastFrame >= this.data.frameRate) {

            sprite.frame += 1;
            sprite.frame %= this.data.maxFrame;

            this.data.lastFrame = new Date();

        }

    }

});

game.state.start('basic');
