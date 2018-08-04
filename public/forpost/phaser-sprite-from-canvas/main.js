
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

    bitmap = new Phaser.BitmapData(opt.game, 'bitmap', opt.width, opt.height);
    // draw the canvas to the bitmap canvas
    bitmap.context.drawImage(canvas, 0, 0);

    return game.add.sprite(0, 0, bitmap);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        var sp1,
        sp2,
        canvas,
        ctx;

        // creates a new canvas, and uses a render method for it
        sp1 = fromCanvas({
                game: game,
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
                canvas: canvas
            });
        sp2.x = 128;
        sp2.y = 32;

    }

});

game.state.start('boot');
