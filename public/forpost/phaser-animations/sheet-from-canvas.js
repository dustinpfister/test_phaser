var sheetFromCanvas = function (opt) {

    var f,
    sx,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    opt = opt || {};
    opt.name = opt.name || '';
    //opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.animations = opt.animations || [{
                frames: 1,
                forFrame: function () {}
            }
        ];
    opt.game = opt.game || null;

    var width = 0;
    opt.animations.forEach(function (ani) {

        width += ani.frames * opt.frameWidth;

    });

    canvas.width = width;
    canvas.height = opt.frameHeight;

    var sx = 0;
    opt.animations.forEach(function (ani) {

        f = 0;
        while (f < ani.frames) {

            per = f / ani.frames;
            ctx.save();
            ctx.translate(sx + 0.5, 0);
            ani.forFrame.call({
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

            sx += opt.frameWidth;
            f += 1;
        }

    });

    // add a new sheet to cache if we have a game
    if (opt.game) {
        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
    }

    document.body.appendChild(canvas);

    // return the canvas
    return canvas;

};
