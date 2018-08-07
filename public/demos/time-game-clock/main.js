

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.global = {

    xMax: 32,
    xMin: 0,

    // a move sprite method
    moveSprite: function (sprite) {

        // pass a sprite, use with call, or monkey patch the Sprite class
        sprite = sprite || this;

        if (sprite.data.goRight) {

            sprite.x += 5;

        } else {

            sprite.x -= 5;

        }

        if (sprite.x >= game.global.xMax) {

            sprite.data.goRight = false;
            sprite.data.x = game.global.xMax;

        }

        if (sprite.x <= game.global.xMin) {

            sprite.data.goRight = true;
            sprite.data.x = game.global.xMin;

        }

    }

};

game.state.add('demo', {

    create: function () {

        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        spriteGT,
        spriteRT;

        canvas.width = 64;
        canvas.height = 32;

        ctx.fillStyle = '#00ff00';
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(32, 0, 32, 32);

        game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 2, 0, 0);

        // game time sprite
        spriteGT = game.add.sprite(0, 32, 'sheet', 0);
        spriteGT.name = 'box_game_time';
        spriteGT.data.goRight = true;

        // create an play an animation using phasers animation manager
        spriteGT.animations.add('flash', [0, 1], 6, true);
        spriteGT.play('flash');

        // move 'box_game_time' sprite every 100ms
        game.time.events.loop(100, function () {

            game.global.moveSprite(game.world.getByName('box_game_time'));

        });

        // real time sprite
        spriteGT = game.add.sprite(0, 64, 'sheet', 0);
        spriteGT.name = 'box_real_time';

        game.global.xMax = game.world.width - spriteGT.width;

    },

    update: function () {

        // moving 'box_real_time' by whatever speed the update loop ticks at.
        game.global.moveSprite(game.world.getByName('box_real_time'));

    }

});

game.state.start('demo');
