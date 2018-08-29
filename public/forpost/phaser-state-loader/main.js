var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// I always start off with a boot state
// In this state I do anything that I want to get done
// before even pre loading content
game.state.add('boot', {

    create: function () {

        // start preload state
        game.state.start('preload');

    }

});

// pre-load any assets that will be used during the load state
game.state.add('preload', {

    preload: function () {

        game.load.image('loadingbar', '/img/loadingbar.png');

    },

    // create method
    create: function () {

        // start the actual load state
        game.state.start('load');

    }

});

// the load state
game.state.add('load', {

    preload: function () {

        // add a sprite that uses my loading bar asset,
        // that was quickly loaded during the Boot Sate
        var loadSprite = game.add.sprite(0, 0, 'loadingbar');
        loadSprite.width = 0;
        loadSprite.x = game.world.centerX - loadSprite.width / 2;
        loadSprite.y = game.world.centerY - 16;

        // what to do when a file as completed downloading
        game.load.onFileComplete.add(function (progress, key, success, loaded, total) {

            loadSprite.width = game.width * (progress / 100);
            loadSprite.x = game.world.centerX - loadSprite.width / 2;

            console.log('progress: ' + progress);
            console.log('key: ' + key);
            console.log('success: ' + success);
            console.log('loaded: ' + loaded + '\/' + total);
            console.log('**********');

        }, this);

        // start loading the asset files
        game.load.image('phaser', '/img/phaser.png');

    },

    // when done create will be called
    create: function () {

        // ready to start the game
        game.state.start('game');

    }

});

// the actual game state
game.state.add('game', {

    create: function () {

        game.add.sprite(0, 0, 'phaser');

    }

});


// start the boot state
game.state.start('boot');
