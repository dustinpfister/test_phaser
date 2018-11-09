var followPointer = function (game, sprite) {

    // the mouse pointer
    var pt = game.input.mousePointer,

    // angle to pointer
    angle = sprite.position.angle(pt);

    sprite.body.velocity.set(Math.cos(angle) * 10, Math.sin(angle) * 10);

};

game.state.add('follow-pointer', {

    create: function () {

        var data = game.data = {},
        sprite = game.data.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet-ball'),
        tx = game.data.tx = game.add.text(10, 10, 0, {
                fill: 'white',
                font: '10px courier'
            });

        sprite.anchor.set(0.5, 0.5);

        game.physics.enable(sprite);

    },
    update: function () {

        var pt = game.input.mousePointer,
        sprite = game.data.sprite;

        game.data.tx.text = sprite.position.angle(pt) / Math.PI * 180;

        followPointer(game, sprite);

    }

});
