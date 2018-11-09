
var mkImmovable = function (game) {

    var imm = game.data.immovable = game.add.sprite(game.world.centerX - 32, game.world.centerY - 32, 'blocks', 0);
    imm.width = 64;
    imm.height = 64;

    // enable physics and set immovable
    game.physics.enable(imm);
    imm.body.immovable = true;

};

var mkGroup = function (game) {

    var group = game.data.group = game.add.group(),
    sprite,
    radian,
    dist,
    i = 0,
    len = 5;
    while (i < len) {
        radian = Math.PI * 2 / len * i;
        dist = Math.random() * 30 + 70;
        sprite = game.make.sprite(
                game.world.centerX + Math.cos(radian) * dist,
                game.world.centerY + Math.sin(radian) * dist, 'blocks', 1);
        game.physics.enable(sprite);
        sprite.body.velocity.set(
            Math.cos(radian) * -100,
            Math.sin(radian) * -100);
        sprite.body.bounce.set(1, 1);
        group.add(sprite);
        i += 1;
    }

};

// just make a simple block sheet
var mkBlockSheet = function (game) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;

    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#af0000';
    ctx.fillRect(0, 0, 32, 32);
    ctx.strokeRect(0, 0, 32, 32);

    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(32.5, 0, 31, 32);

    game.cache.addSpriteSheet('blocks', null, canvas, 32, 32, 2, 0, 0);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = {};

        mkBlockSheet(game);
        mkImmovable(game);
        mkGroup(game);

    },

    update: function () {

        game.data.group.forEach(function (sprite) {

            sprite.x = Phaser.Math.wrap(sprite.x, -8, game.world.width + 8);
            sprite.y = Phaser.Math.wrap(sprite.y, -8, game.world.height + 8);

            game.physics.arcade.collide(sprite, game.data.group);
            game.physics.arcade.collide(sprite, game.data.immovable);

        });

    }

});

game.state.start('demo');
