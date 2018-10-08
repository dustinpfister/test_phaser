
/*
var createGrid = function (game, done) {

game.create.grid('', 320, 240, 32, 24, 'red', true, done);

};
 */

createGridCanvas = function (opt) {

    opt = opt || {};

    opt.key = opt.key || 'grid';
    opt.pxWidth = opt.pxWidth || 320;
    opt.pxHeight = opt.pxHeight || 240;
    opt.cellWidth = opt.cellWidth || 32;
    opt.cellHeight = opt.cellHeight || 24;

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = opt.pxWidth;
    canvas.height = opt.pxHeight;

    ctx.strokeStyle = '#ff0000';
    ctx.fillStyle = '#8a0000';
    ctx.lineWidth = 3;

    var y = 0,
    x,
    w = opt.pxWidth / opt.cellWidth,
    h = opt.pxHeight / opt.cellHeight;
    while (y < opt.cellHeight) {

        x = 0;
        while (x < opt.cellWidth) {

            ctx.fillRect(x * w, y * h, w, h);
            ctx.strokeRect(x * w, y * h, w, h);

            x += 1;

        }

        y += 1;

    }

    game.cache.addImage(opt.key, null, canvas);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createGridCanvas();

        game.add.sprite(0, 0, 'grid');

        /*
        createGrid(game, function (texture) {

        game.add.sprite(0, 0, texture);

        });

         */

    }

});

game.state.start('boot');
