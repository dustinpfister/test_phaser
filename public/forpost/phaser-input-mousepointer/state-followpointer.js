var followPointer = function (game, sprite) {

    // the mouse pointer
    var pt = game.input.mousePointer,
    home = {
        x: game.world.centerX,
        y: game.world.centerY
    },
    angle,
    distance,
    power;

    if (pt.withinGame) {

        // angle to pointer
        angle = sprite.position.angle(pt);

        distance = sprite.position.distance(pt);

    } else {

        angle = sprite.position.angle(home);

        distance = sprite.position.distance(home);

    }

    power = distance / 150;

    power = power > 1 ? 1 : power;

    // set velocity of the sprite
    sprite.body.velocity.set(Math.cos(angle) * 200 * power, Math.sin(angle) * 200 * power);

};

var createBallSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = '#8f0000';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    game.cache.addSpriteSheet('sheet-ball', null, canvas, 32, 32, 1, 0, 0);
};

game.state.add('follow-pointer', {

    create: function () {

        var data = game.data = {};

        createBallSheet(game);

        var sprite = game.data.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet-ball');
        sprite.anchor.set(0.5, 0.5);
        game.physics.enable(sprite);

        game.data.tx = game.add.text(10, 10, 0, {
                fill: 'white',
                font: '10px courier'
            });

    },
    update: function () {

        var pt = game.input.mousePointer,
        sprite = game.data.sprite;

        game.data.tx.text = sprite.position.angle(pt) / Math.PI * 180;

        followPointer(game, sprite);

    }

});
