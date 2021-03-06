

var moveSpriteWithCursors = function (game, sprite) {

    game.data = game.data || {};

    // create cursors
    if (!game.data.cursors) {
        game.data.cursors = game.input.keyboard.createCursorKeys();
        console.log(game.data.cursors);
    }

    var cursors = game.data.cursors;

    if (cursors.up.isDown) {
        sprite.y -= 10;
    }

    if (cursors.down.isDown) {
        sprite.y += 10;
    }

    if (cursors.left.isDown) {
        sprite.x -= 10;
    }

    if (cursors.right.isDown) {
        sprite.x += 10;
    }

    sprite.y = Phaser.Math.wrap(sprite.y, -32, game.world.height + 32);
    sprite.x = Phaser.Math.wrap(sprite.x, -32, game.world.width + 32);

};

var createBallSheet = function (game) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = 32;
    canvas.height = 32;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(16, 16, 12, 0, Math.PI * 2);
    ctx.fill();

    game.cache.addSpriteSheet('sheet-ball', null, canvas, 32, 32, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        game.data = {};

        createBallSheet(game);

        var sprite = game.data.sprite = game.add.sprite(0, 0, 'sheet-ball');

    },

    update: function () {

        moveSpriteWithCursors(game, game.data.sprite);

    }

});

game.state.start('boot');
