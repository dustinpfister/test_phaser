
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

    var y = 0,
    x,
    w = opt.pxWidth / opt.cellWidth,
    h = opt.pxHeight / opt.cellHeight;
    while (y < opt.cellHeight) {

        x = 0;
        while (x < opt.cellWidth) {

            ctx.strokeRect(x, y, w, h);

            x += 1;

        }

        y += 1;

    }

    //game.cache.addSpriteSheet(opt.key, null, canvas, opt.pxWidth, opt.pxHeight, 1, 0, 0);

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
