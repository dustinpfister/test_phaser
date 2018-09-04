
// make a basic sprite sheet
var makeCircleSheet = function (game) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;

    ctx.strokeStyle = '#ff0000';
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(48.5, 16.5, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    this.game.cache.addSpriteSheet('sheet-circle', null, canvas, 32, 32, 2, 0, 0);

};

// make a group of circles
var makeCircleGroup = function (game) {

    var circles = game.add.group();
    circles.name = 'circles';

    circles.data = {
        i: 0
    };

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

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        // make the sheet
        makeCircleSheet(this.game);

        // enable stepping
        game.enableStep();

        // start the demo
        game.state.start('demo');

    }

});

game.state.add('demo', {

    create: function () {

        makeCircleGroup(this.game);

        // on input down, step
        this.game.input.onDown.add(function () {

            game.step();

        });

    },

    // what to do for each tick
    update: function () {

        var circles = game.world.getByName('circles'),
        index = 0;

        circles.forEach(function (circle) {

            circle.frame = 0;

            if (index === circles.data.i) {

                circle.frame = 1;

            }

            index += 1;

        });

        circles.data.i += 1;
        circles.data.i %= circles.children.length;

    }

});

game.state.start('boot');
