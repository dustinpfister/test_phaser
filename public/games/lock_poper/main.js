
// th Boot State
var Boot = {

    preload : function () {

        // set full screen mode
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

        // load progress bar
        game.load.image('loadingbar', '/img/loadingbar.png');

    },

    // create method
    create : function () {

        game.state.add('load', Load);
        game.state.start('load');

    }

};

// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', Boot);
