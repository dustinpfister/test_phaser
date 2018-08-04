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
