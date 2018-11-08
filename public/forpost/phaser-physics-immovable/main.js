
var mkImmovable = function (game) {

    var imm = game.data.immovable = game.add.sprite(game.world.centerX, game.world.centerY, 'blocks');

    game.physics.enable(imm);

    imm.body.immovable = true;

};

var mkGroup = function (game) {

    var group = game.data.group = game.add.group();

    var i = 0,
    len = 10;
    while (i < len) {

        var radian = Math.PI * 2 / len * i,
        dist = Math.random() * 30 + 70,
        gfx = game.make.sprite(
                game.world.centerX + Math.cos(radian) * dist,
                game.world.centerY + Math.sin(radian) * dist, 'blocks');

        game.physics.enable(gfx);
        gfx.body.velocity.set(50 + Math.random() * 50, 50 + Math.random() * 50);

        //gfx.beginFill(0x00ff00);
        //gfx.drawRect(0, 0, 16, 16);

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

    update: function () {

        game.data.group.forEach(function (gfx) {

            gfx.x = Phaser.Math.wrap(gfx.x, -8, game.world.width + 8);
            gfx.y = Phaser.Math.wrap(gfx.y, -8, game.world.height + 8);

            game.physics.arcade.collide(gfx, game.data.group);
            game.physics.arcade.collide(gfx, game.data.immovable);

        })

    }

});

game.state.start('demo');
