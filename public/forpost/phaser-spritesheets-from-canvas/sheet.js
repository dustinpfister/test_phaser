game.state.add('basic', {

    data: {
        maxFrame: 24,
        frameRate: 33,
        lastFrame: new Date()
    },

    create: function () {

        var frame = 0,
        maxFrame = this.data.maxFrame,
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');

        canvas.width = 32 * maxFrame;
        canvas.height = 32;
        while (frame < maxFrame) {

            var sx = 32 * frame + 0.5,
            per = frame / maxFrame;

            ctx.strokeStyle = '#00ff00';

            ctx.save();
            ctx.translate(sx + 16, 16);
            ctx.rotate(Math.PI * 2 * per);
            ctx.strokeRect(-8, -8, 16, 16);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 15);
            ctx.stroke();
            ctx.restore();

            frame += 1;

        }

        game.cache.addSpriteSheet('sheet-1', null, canvas, 32, 32, maxFrame, 0, 0);

        var sprite = game.add.sprite(0, 0, 'sheet-1', 0);
        sprite.smoothed = false;
        sprite.name = 'sp1';

    },

    update: function () {

        var sprite = game.world.getByName('sp1'),
        now = new Date();

        sprite.x = 32;
        sprite.y = 32;

        if (now - this.data.lastFrame >= this.data.frameRate) {

            sprite.frame += 1;
            sprite.frame %= this.data.maxFrame;

            this.data.lastFrame = new Date();

        }

    }

});

game.state.start('basic');
