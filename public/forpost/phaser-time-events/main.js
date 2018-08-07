// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// some global stuff
game.global = {

    xMax: 32,
    xMin: 0,

    // a move sprite method
    moveSprite: function (sprite) {

        // step based on a boolean in the sprites data object
        // that may or may not be there
        if (sprite.data.goRight) {
            sprite.x += 5;
        } else {
            sprite.x -= 5;
        }

        // find of the sprite is out of bounds, setting the boolean
        // in it's data object if not there in the process.
        if (sprite.x >= this.xMax) {
            sprite.data.goRight = false;
            sprite.data.x = this.xMax;
        }
        if (sprite.x <= this.xMin) {
            sprite.data.goRight = true;
            sprite.data.x = this.xMin;
        }

    },

    // make a simple sprite sheet
    mkSheet: function (game) {

        // using canvas to make a sprite sheet
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        spriteGT,
        spriteRT;

        // will hold two frames that are 32 x 32
        canvas.width = 64;
        canvas.height = 32;

        // drawing the frames
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(32, 0, 32, 32);

        // adding the sheet to the phaser cache
        game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 2, 0, 0);

    }

};

// compare-real-time demo
game.state.add('compare-real-time', {

    // create method for compare-real-time demo state
    create: function () {

        var spriteGT,
        spriteRT; // sprite game time, and sprite real time

        // calling my method that will give me a sprite sheet
        game.global.mkSheet(game);

        // create game time sprite
        spriteGT = game.add.sprite(0, 32, 'sheet', 0);
        spriteGT.name = 'box_game_time';

        // create an play an animation using phasers animation manager
        spriteGT.animations.add('flash', [0, 1], 6, true);
        spriteGT.play('flash');

        // Here is the time event example in action
        // move 'box_game_time' sprite every 100ms
        game.time.events.loop(100, function () {

            game.global.moveSprite(game.world.getByName('box_game_time'));

        });

        // real time sprite
        spriteRT = game.add.sprite(0, 64, 'sheet', 0);
        spriteRT.name = 'box_real_time';

        game.global.xMax = game.world.width - 32;

    },

    // update method for compare-real-time demo state
    update: function () {

        var spriteRT = game.world.getByName('box_real_time');

        // moving 'box_real_time' by whatever speed the update loop ticks at.
        game.global.moveSprite(spriteRT);

        // doing the same with animation
        spriteRT.frame += 1;
        if (spriteRT.frame >= 3) {
            spriteRT.frame = 0;
            spriteRT.frame = 0;
        }

    }

});

game.state.start('compare-real-time');
