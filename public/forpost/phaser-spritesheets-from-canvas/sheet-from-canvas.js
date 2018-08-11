
var sheetFromCanvas = function (opt) {

    var f,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    opt = opt || {};
    opt.name = opt.name || '';
    opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.forFrame = opt.forFrame || function () {};
    opt.game = opt.game || null;

    canvas.width = opt.frameWidth * opt.frames;
    canvas.height = opt.frameHeight;

    f = 0;
    while (f < opt.frames) {
        per = f / opt.frames;
        opt.forFrame.call({
            f: f,
            sx: opt.frameWidth * f + 0.5,
            per: per,
            canvas: canvas,
            ctx: ctx
        }, ctx);
        f += 1;
    }

    // add a new sheet to cache if we have a game
    if (opt.game) {
        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
    }

    // return the canvas
    return canvas;

};

game.state.add('sheet-from-canvas', {

    data: {
        maxFrame: 30,
        frameRate: 100,
        lastFrame: new Date()
    },

    create: function () {

        sheetFromCanvas({
            name: 'sheet-1',
            game: game,
            frames: 30,
            frameWidth: 64,
            frameHeight: 64,
            forFrame: function (ctx) {
                ctx.strokeStyle = '#ffff00';
                ctx.save();
                ctx.translate(this.sx + 32, 32);
                ctx.rotate(Math.PI * 2 * this.per);
                ctx.strokeRect(-16, -16, 32, 32);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, 30);
                ctx.stroke();
                ctx.restore();
            }
        });

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
