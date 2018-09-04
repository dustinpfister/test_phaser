
// make a basic sprite sheet
var makeCircleSheet = function (game) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);
    ctx.stroke();
    this.game.cache.addSpriteSheet('sheet-circle', null, canvas, 32, 32, 1, 0, 0);

    //document.body.appendChild(canvas);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.enableStep();

game.state.add('demo', {

    create: function () {

        makeCircleSheet(this.game);

        var circles = game.add.group();
        circles.name = 'circles';

        var i = 0,
        len = 12,
        x,
        y,
        r;
        while (i < len) {

            r = Math.PI * 2 * (i / len);
            x = game.world.centerX - 16 + Math.cos(r) * 96;
            y = game.world.centerY - 16 + Math.sin(r) * 96;

            circles.create(x, y, 'sheet-circle', 0);

            i += 1;

        }

        this.game.input.onDown.add(function () {

            game.step();

        });

    },

    update: function () {

        console.log('tick');

    }

});

game.state.start('demo');
