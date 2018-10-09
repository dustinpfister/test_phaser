
var myFirstPlugin = function (game, opt) {

    var plugin = new Phaser.Plugin(game, game.plugins);

    plugin.init = function (opt) {

        console.log('hello I am a plugin');
        console.log(opt.foo); // 'bar'

    };

    plugin.update = function () {

        console.log('tick');

    };

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
