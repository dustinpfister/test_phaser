
var mkImmovable = function (game) {

    var gfx = game.data.immovable = game.add.graphics(game.world.centerX, game.world.centerY);

    gfx.beginFill(0x00ff00);
    gfx.drawRect(-32, -32, 64, 64);

};

var mkGroup = function (game) {

    var group = game.data.group = game.add.group();

    var i = 0,
    len = 10;
    while (i < len) {

        var radian = Math.PI * 2 / len * i,
        dist = Math.random() * 30 + 70,
        gfx = game.make.graphics(
                game.world.centerX + Math.cos(radian) * dist,
                game.world.centerY + Math.sin(radian) * dist);

        game.physics.enable(gfx);
        gfx.body.velocity.set(10, 10);

        gfx.beginFill(0x00ff00);
        gfx.drawRect(-8, -8, 16, 16);

        group.add(gfx);

        i += 1;

    }

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = {};

        mkImmovable(game);

        mkGroup(game);

    },

    update: function () {}

});

game.state.start('demo');
