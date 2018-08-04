
var fromCanvas = function (opt) {

    var canvas,
    ctx,
    bitmap;

    opt = opt || {};
    opt.game = opt.game || null;
    opt.width = opt.width || 32;
    opt.height = opt.height || 32;
    opt.render = opt.render || function (ctx) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, this.width, this.height);
    };
    opt.name = opt.name || new Date().getTime();
    opt.cacheBitmap = opt.cacheBitmap || false;

    // use a canvas given via opt object, or create new
    canvas = opt.canvas || document.createElement('canvas');
    ctx = canvas.getContext('2d');

    // if a canvas is given that will override
    // and width, and height given
    if (opt.canvas) {

        opt.width = opt.canvas.width;
        opt.height = opt.canvas.height;

    } else {

        // else leave opt.width, and height
        // and use it to set the size of the new
        // canvas
        canvas.width = opt.width;
        canvas.height = opt.height;

        // and render to the new canvas
        opt.render.call(opt, ctx);

    }

    // create a bitmap data instance
    bitmap = game.add.bitmapData(opt.width, opt.height, 'bitmap-' + opt.name, opt.cacheBitmap);

    // draw to the bitmap data instance canvas.
    bitmap.context.drawImage(canvas, 0, 0);

    // use the bitmap data as the texture for a sprite
    sprite = game.add.sprite(0, 0, bitmap);
    sprite.name = opt.name;

    // return the sprite
    return sprite

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.global = {

    per: 0,
    frame: 0,
    maxFrame: 50,
    step: function () {

        this.frame += 1;
        this.frame %= this.maxFrame;

        this.per = this.frame / this.maxFrame;

    }

};

game.state.add('boot', {

    create: function () {

        var sp1,
        sp2,
        canvas,
        ctx;

        // creates a new canvas, and uses a render method for it
        sp1 = fromCanvas({
                game: game,
                name: 'sp1',
                width: 32,
                height: 64,
                render: function (ctx) {
                    ctx.strokeStyle = '#00ff00';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(0, 0, this.width, this.height);
                }
            });
        sp1.x = 32;
        sp1.y = 32;

        // uses a canvas that was created before hand
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        sp2 = fromCanvas({
                game: game,
                name: 'sp2',
                cacheBitmap: true,
                canvas: canvas
            });
        sp2.x = 128;
        sp2.y = 32;

        console.log(game.state);

    },

    update: function () {

        var sp2 = game.world.getByName('sp2'),
        r = Math.PI * 2 / game.global.maxFrame * game.global.frame,
        d = 75;

        sp2.x = Math.cos(r) * d + game.world.centerX - sp2.width / 2;
        sp2.y = Math.sin(r) * d + game.world.centerY - sp2.height / 2; ;

        game.global.step();

    }

});

game.state.start('boot');
