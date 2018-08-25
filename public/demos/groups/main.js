var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// sheet from canvas helper
var sheetFromCanvas = function (opt) {

    var f,
    fd, // frame data
    sx,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    opt = opt || {};
    opt.name = opt.name || 'sheet';
    opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.forFrame = opt.forFrame || function () {};
    opt.game = opt.game || {};

    canvas.width = opt.frameWidth * opt.frames;
    canvas.height = opt.frameHeight;

    // to store frame data
    opt.game.global = opt.game.global || {};
    opt.game.global.frameData = opt.game.frameData || {};

    fd = opt.game.global.frameData[opt.name] = [];

    f = 0;
    // for each frame
    while (f < opt.frames) {

        // find current percent
        per = f / opt.frames;
        sx = opt.frameWidth * f + 0.5;

        // push frame index to frame data
        fd.push(f);

        // call forFrame with api set to the value
        // of 'this' inside the forFrame function
        ctx.save();
        ctx.translate(sx, 0);
        opt.forFrame.call({
            f: f,
            p: Math.PI,
            p2: Math.PI * 2,
            hw: opt.frameWidth / 2,
            hh: opt.frameHeight / 2,
            sx: sx,
            per: per,
            canvas: canvas,
            ctx: ctx
        }, ctx);
        ctx.restore();

        // next frame
        f += 1;

    }

    // add a new sheet to cache if we have a game
    if (opt.game) {

        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);

    }

    //document.body.appendChild(canvas);

    // return the canvas
    return canvas;

};

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

            x = 32+Math.random() * (game.world.width - 64);
            y = 32 + Math.random() * (game.world.height - 64);

            sprite = blocks.create(x, y, 'block');
            sprite.name = 'block-' + i;
            sprite.frame = Math.floor(Math.random() * 3);

            i += 1;
        }


    },

    update: function () {}

});

game.state.start('demo');
