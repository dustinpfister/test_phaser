var sheetFromCanvas = (function () {

    // generate the api for the Current forFrame method, and frame
    // used in renderFrames
    var genForFrameAPI = function (opt, ani, af, sx, canvas, ctx) {

        var per = per = af / ani.frames;

        // the API to work with in a forFrame method
        return {
            f: af,
            sx: sx,
            per: per,
            bias: Math.abs(.5 - per) / .5,
            canvas: canvas,
            ctx: ctx,
            frameWidth: opt.frameWidth,
            frameHeight: opt.frameHeight,
            cx: opt.frameWidth / 2,
            cy: opt.frameHeight / 2
        };

    };

    // render all frames with the given options, and canvas
    var genFrames = function (opt, canvas) {

        var sx = 0,
        frameData = {},
        f = 0, // frame index
        ctx = canvas.getContext('2d');
        opt.animations.forEach(function (ani) {

            af = 0; // frame index relative to the current animation
            frameData[ani.name] = [];
            while (af < ani.frames) {

                // save the context, and translate so that 0,0
                // is the upper left corner of the frame when drawing in
                // the forFrame method
                ctx.save();
                ctx.translate(sx + 0.5, 0);

                // call the forFrame method of the current animation
                // generating the api that can be used via the this keyword
                ani.forFrame.call(genForFrameAPI(opt, ani, af, sx, canvas, ctx), ctx);
                ctx.restore();

                // push the sheet relative frame index to frameData for the animation
                frameData[ani.name].push(f);

                // step start x, and frame index
                sx += opt.frameWidth;
                af += 1;
                f += 1;
            }

        });

        // return the frameData
        return frameData;

    };

    // set the canvas width based on what is set
    // via opt.
    var setCanvasWidth = function (opt, canvas) {

        var width = 0;
        opt.animations.forEach(function (ani) {
            width += ani.frames * opt.frameWidth;
        });

        canvas.width = width;
        canvas.height = opt.frameHeight;

    };

    // return the public method
    return function (opt) {

        var canvas = document.createElement('canvas'),
        frameData;

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

        // set canvas width
        setCanvasWidth(opt, canvas);

        // render frames
        frameData = genFrames(opt, canvas);

        // if we have a game object
        if (opt.game) {

            // add a sheet to cache
            opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);

            // append frame data to a global object

            game.global = game.global || {};

            game.global.frameData = frameData;

        }
		
		document.body.appendChild(canvas);

    };

}
    ());
