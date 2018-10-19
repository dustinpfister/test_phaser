
var updatePointer = function (game) {

    var ship = game.data.ship,
    pointer = game.data.pointer;

    // default to an invisible pointer
    pointer.visible = false;

    // using ship.inCamera to toggle displaying the pointer
    if (!ship.inCamera) {
        pointer.angle = new Phaser.Point(pointer.centerX, pointer.centerY).angle({
                x: ship.centerX,
                y: ship.centerY
            }) / Math.PI * 180;
        pointer.visible = true;
    }

};

// make a sprite sheet
var mkSheet = function (game) {

    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 96;
    canvas.height = 32;

    // red box
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, 32, 32);

    // triangle
    ctx.beginPath();
    ctx.moveTo(34, 2);
    ctx.lineTo(62, 16);
    ctx.lineTo(34, 30);
    ctx.closePath();
    ctx.fill();
    game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 2, 0, 0);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('incamera', {

    create: function () {

        game.data = game.data || {};

        var data = game.data;

        mkSheet(game);

        // create the ship, and pointer
        var ship = game.data.ship = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet', 0);
        ship.anchor.set(0.5, 0.5);
        ship.data.dx = 5;
        ship.data.dy = 2;

        var pointer = game.data.pointer = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet', 1);
        pointer.anchor.set(0.5, 0.5);
        pointer.visible = false;

    },

    update: function () {

        var ship = game.data.ship;

        // update pointer
        updatePointer(game);

        // update ship
        ship.x += ship.data.dx;
        ship.y += ship.data.dy;
        ship.x = Phaser.Math.wrap(ship.x, -320, 640);
        ship.y = Phaser.Math.wrap(ship.y, -240, 480);

    }

});

game.state.start('incamera');
