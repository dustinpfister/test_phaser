
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
    r: 0,
    bias: 0,
    frame: 0,
    maxFrame: 150,
    step: function () {

        this.frame += 1;
        this.frame %= this.maxFrame;

        this.per = this.frame / this.maxFrame;
        this.r = Math.PI * 2 * this.per;
        this.bias = Math.abs(this.per - 0.5) / 0.5;

    }

};

game.state.add('demo', {

    create: function () {

        var sp3,
        canvas,
        ctx;

        // creates a new canvas, and uses a render method for it
        fromCanvas({
            game: game,
            name: 'sp1',
            width: 32,
            height: 128,
            render: function (ctx) {
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 6;
                ctx.strokeRect(0, 0, this.width, this.height);
            }
        });

        // this represents a canvas that was canvas before hand
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // uses a canvas that was created before hand
        fromCanvas({
            game: game,
            name: 'sp2',
            cacheBitmap: true, // cache the bitmap data instance
            canvas: canvas
        });

        // I can make more sprites with the cached bitmap from sp2
        sp3 = game.add.sprite(0, 0, game.cache.getBitmapData('bitmap-sp2'));
        sp3.name = 'sp3';

    },

    update: function () {

        var sp1 = game.world.getByName('sp1'),
        sp2 = game.world.getByName('sp2'),
        sp3 = game.world.getByName('sp3');

        sp1.x = game.global.bias * (game.world.width - sp1.width);
        sp1.y = game.world.centerY - sp1.height / 2;

        sp2.x = Math.cos(game.global.r) * 75 + game.world.centerX - sp2.width / 2;
        sp2.y = Math.sin(game.global.r) * 75 + game.world.centerY - sp2.height / 2;

        sp3.x = game.world.centerX - sp3.width / 2;
        sp3.y = game.world.centerY - sp3.height / 2;

        game.global.step();

    }

});

game.state.start('demo');
