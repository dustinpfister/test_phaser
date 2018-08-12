var sheetFromCanvas = (function () {

    var renderFrames = function (opt,canvas) {

        var sx = 0,f,per,ctx = canvas.getContext('2d');
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
                    frameHeight: opt.frameHeight,
                    cx: opt.frameWidth / 2,
                    cy: opt.frameHeight / 2
                }, ctx);
                ctx.restore();

                sx += opt.frameWidth;
                f += 1;
            }

        });

    };

    return function (opt) {

        var canvas = document.createElement('canvas'),width;

        opt = opt || {};
        opt.name = opt.name || '';
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

        renderFrames(opt,canvas);

        // add a new sheet to cache if we have a game
        if (opt.game) {

            opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);

        }

    };

}
    ());
