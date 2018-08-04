
var fromCanvas = function (opt) {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
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

    canvas.width = opt.width;
    canvas.height = opt.height;

    opt.render.call(opt, ctx);

    bitmap = new Phaser.BitmapData(opt.game, 'bitmap', opt.width, opt.height);
    // draw the canvas to the bitmap canvas
    bitmap.context.drawImage(canvas, 0, 0);

    return game.add.sprite(0, 0, bitmap);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        var sprite = fromCanvas({
                game: game,
                render: function (ctx) {

                    ctx.strokeStyle = '#00ff00';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(0, 0, this.width, this.height);

                }
            });

    }

});

game.state.start('boot');
