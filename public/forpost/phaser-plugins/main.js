
var myPlugin = function (game, opt) {

    var plugin = new Phaser.Plugin(game, game.plugins);

    plugin.init = function (opt) {

        console.log('hello I am a plugin');
        console.log(opt.foo); // 'bar'

    };

    game.plugins.add(plugin, opt);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        myPlugin(game, {
            foo: 'bar'
        });

        /*
        game.plugins.add(myPlugin, {
        foo: 'bar'
        });

         */

    },

    // update loop
    update: function () {}

});

game.state.start('demo');
