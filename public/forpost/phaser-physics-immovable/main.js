
var mkImmovable = function (game) {

    var gfx = game.add.graphics(game.world.centerX, game.world.centerY);

    gfx.beginFill(0x00ff00);
    gfx.drawRect(-32, -32, 64, 64);

}

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = {};

        mkImmovable(game);

    },

    update: function () {}

});

game.state.start('demo');
