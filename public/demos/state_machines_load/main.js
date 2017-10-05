
// th Boot State
var Boot = {

    preload : function () {

        game.load.image('loadingbar', '/img/loadingbar.png');

    },

    // create method
    create : function () {

        game.state.add('load', Load);
        game.state.start('load');

    }

};


// the load state
var Load = {

    preload : function () {

        var loadSprite = game.add.sprite(0, 0, 'loadingbar');
        loadSprite.width = 0;
        loadSprite.x = game.world.centerX - loadSprite.width / 2;
        loadSprite.y = game.world.centerY - 16;

        game.load.onLoadStart.add(function () {}, this);
        game.load.onFileComplete.add(function (progress) {

            loadSprite.width = game.width * (progress / 100);
            loadSprite.x = game.world.centerX - loadSprite.width / 2;

        }, this);
        game.load.onLoadComplete.add(function () {}, this);

        // start loading the asset files
        game.load.image('phaser', '/img/phaser.png');

    },

    // when done create will be called
    create : function () {

        console.log('ready to rock!');
        game.state.add('game', Game);
        game.state.start('game');

    }

};


// the actual Game state once everything is loaded
var Game = {

    create : function () {

        game.add.sprite(0, 0, 'phaser');

    },

    update : function () {}

};

// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', Boot);

