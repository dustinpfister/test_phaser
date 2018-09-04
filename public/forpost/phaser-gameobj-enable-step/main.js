
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
    len = 12, // 12 circles
    x,
    y,
    r;

    // create a sprite for each circle
    while (i < len) {

        r = Math.PI * 2 * (i / len);
        x = game.world.centerX - 16 + Math.cos(r) * 96;
        y = game.world.centerY - 16 + Math.sin(r) * 96;

        // using group.create to create sprites for the group
        circles.create(x, y, 'sheet-circle', 0);

        i += 1;

    }

};

// tick the given circle group
var tickCircleGroup = function (circles) {

    var index = 0;

    // for each circle
    circles.forEach(function (circle) {

        // default to frame zero
        circle.frame = 0;

        // if index === current index
        if (index === circles.data.i) {

            // use frame 1
            circle.frame = 1;

        }

        // next child index
        index += 1;

    });

    // step current index
    circles.data.i += 1;
    circles.data.i %= circles.children.length;

}

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// the boot state
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

// the actual demo state
game.state.add('demo', {

    create: function () {

        makeCircleGroup(this.game);

        // on input down, step
        this.game.input.onDown.add(function () {

            // game.step can then be used to
            // step each game tick
            game.step();

        });

    },

    // what to do for each tick
    update: function () {

        // call the tick Circle group method for each
        // frame tick
        tickCircleGroup(game.world.getByName('circles'));

    }

});

// start with the boot state
game.state.start('boot');
