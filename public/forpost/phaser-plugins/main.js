
var Plugin_paddle = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};
        game.data.paddle = {};

        // start Arcade physics, should be the case by default but making sure
        // this will also reset, but not re create Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Paddle Sheet
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 96;
        canvas.height = 16;
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, 96, 16);
        game.cache.addSpriteSheet('sheet-paddle', null, canvas, 96, 16, 1, 0, 0);

        var paddle = game.data.paddle.sprite = game.add.sprite(32, 160, 'sheet-paddle');

        game.physics.enable(paddle);

    };

    plug.update = function () {};

    // add the plugin to the game
    game.plugins.add(plug, opt);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        Plugin_paddle(game, {
            foo: 'bar'
        });

    }

});

game.state.start('demo');
