

var makeSprite = function (game) {

    var sprite = game.data.sprite = game.add.sprite(10, 10, 'sheet-box');

    // setting a pixels per second value for sprite.data
    sprite.data.pps = 128;

    // setting an update method for the sprite
    sprite.update = function () {

        // using game.time.elapsed to figure deltaX
        var deltaX = game.time.elapsed / 1000 * sprite.data.pps;
        sprite.x = Phaser.Math.wrap(sprite.x += deltaX, -8, game.world.width + 8);
    };

};

var createBoxSheet = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 8;
    canvas.height = 8;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 8, 8);
    game.cache.addSpriteSheet('sheet-box', null, canvas, 8, 8, 1, 0, 0);
};

// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('pps', {

    create: function () {

        game.data = {};

        createBoxSheet(game);

        makeSprite(game);

    },

    update: function () {

        var sprite = game.data.sprite;

    }

});

game.state.start('pps');
