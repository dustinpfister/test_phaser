

var titleLoger = function (text) {

    document.title = text;

};

// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = {
            pps: 64
        };

        game.stage.disableVisibilityChange = true;

        var sprite = game.data.sprite = game.add.sprite(0, 0, 'sheet-block');
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
