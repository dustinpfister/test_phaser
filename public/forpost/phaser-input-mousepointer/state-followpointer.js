var followPointer = function (game, sprite) {

    var mouse = game.input.mousePointer;

    sprite.body.velocity.set(0, 0);

}

game.state.add('follow-pointer', {

    create: function () {

        var data = game.data = {},
        sprite = game.data.sprite = game.add.sprite(0, 0, 'sheet-ball');

        game.physics.enable(sprite);

    },
    update: function () {

        followPointer(game, game.data.sprite);

    }

});
