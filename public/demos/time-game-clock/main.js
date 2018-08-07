

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
        sprite;

        canvas.width = 64;
        canvas.height = 32;

        ctx.fillStyle = '#00ff00';
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(32, 0, 32, 32);

        game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 2, 0, 0);

        // game time sprite
        sprite = game.add.sprite(0, 32, 'sheet', 0);
        sprite.name = 'box_game_time';
        sprite.data.goRight = true;

        // real time sprite
        sprite = game.add.sprite(0, 64, 'sheet', 1);
        sprite.name = 'box_real_time';

        game.global.xMax = game.world.width - sprite.width;

        // move 'box_game_time' sprite every 100ms
        game.time.events.loop(100, function () {

            game.global.moveSprite(game.world.getByName('box_game_time'));

        });

    },

    update: function () {

        // moving 'box_real_time' by whatever speed the update loop ticks at.
        game.global.moveSprite(game.world.getByName('box_real_time'));

    }

});

game.state.start('demo');
