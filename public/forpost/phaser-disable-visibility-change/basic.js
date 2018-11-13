var titleLoger = function (text) {
    document.title = text;
};

var createBoxSheet = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 32, 32);
    game.cache.addSpriteSheet('sheet-box', null, canvas, 32, 32, 1, 0, 0);
};

// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = {};

        createBoxSheet(game);

        game.stage.disableVisibilityChange = true;

        var sprite = game.data.sprite = game.add.sprite(0, 0, 'sheet-box');
        sprite.y = 32;
        sprite.data.pps = 64;

    },

    update: function () {

        var sprite = game.data.sprite;

        sprite.x += game.time.elapsed / 1000 * sprite.data.pps;
        sprite.x = Phaser.Math.wrap(sprite.x, -32, game.world.width + 32);

        titleLoger(Math.floor(sprite.x) + ':' + game.time.elapsed);

    }

});

game.state.start('demo');
