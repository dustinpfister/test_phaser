
// the first plugin
var myFirstPlugin = function (game, opt) {

    // create the plugin object
    var plugin = new Phaser.Plugin(game, game.plugins);

    // to be called once
    plugin.init = function (opt) {

        console.log('hello I am a plugin');
        console.log(opt.foo); // 'bar'

    };

    // to be called on each tick
    plugin.update = function () {

        console.log('tick');

    };

    // add the plugin
    game.plugins.add(plugin, opt);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        myFirstPlugin(game, {
            foo: 'bar'
        });

    }

});

game.state.start('demo');
