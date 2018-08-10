var sheetFromCanvas = function (opt) {

    var f,
    sx,
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

        sx = opt.frameWidth * f + 0.5;

        ctx.save();
        ctx.translate(sx, 0);

        opt.forFrame.call({
            f: f,
            sx: sx,
            per: per,
            bias: Math.abs(.5 - per) / .5,
            canvas: canvas,
            ctx: ctx,
            frameWidth: opt.frameWidth,
            frameHeight: opt.frameHeight
        }, ctx);
        ctx.restore();

        f += 1;
    }

    // add a new sheet to cache if we have a game
    if (opt.game) {
        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
    }

    // return the canvas
    return canvas;

};
