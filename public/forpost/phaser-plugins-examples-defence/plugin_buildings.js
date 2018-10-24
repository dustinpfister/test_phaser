
var Plugin_runner = function (game, opt) {

    // Guy SPRITE SHEET
    var createGuySheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 32;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 16, 32);
        game.cache.addSpriteSheet('sheet-guy', null, canvas, 16, 32, 1, 0, 0);
    };


    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
