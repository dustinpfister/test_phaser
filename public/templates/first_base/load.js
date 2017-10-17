
// the load state
var Load = {

    preload : function () {

        // add a sprite that uses my loadingbar asset,
        // that was quickly loaded during the Boot Sate
        var loadSprite = game.add.sprite(0, 0, 'loadingbar');
        loadSprite.width = 0;
        loadSprite.x = game.world.centerX - loadSprite.width / 2;
        loadSprite.y = game.world.centerY - 16;

        // what to do when a file as completed downloading
        game.load.onFileComplete.add(function (progress, key, success, loaded, total) {

            loadSprite.width = game.width * (progress / 100);
            loadSprite.x = game.world.centerX - loadSprite.width / 2;

        }, this);

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