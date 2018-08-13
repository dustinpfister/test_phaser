// main
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
game.transparent = true;

// demo state
game.state.add('demo', {

    create: function () {

        var onPress = function () {

            console.log('foo');
            console.log(this);

        };

        var button = game.add.button(10, 10, 'sheet-button', onPress, game, 0, 1, 2, 3);

    }

});

// boot state
game.state.add('boot', {

    create: function () {

        var frame = 0,
        maxFrame = 4,
        frameWidth = 32,
        frameHeight = 16,
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = frameWidth * maxFrame;
        canvas.height = frameHeight;

        // disable scrollTo
        game.scale.compatibility.scrollTo = false;
        while (frame < maxFrame) {

            // figure startx, and percent done
            var sx = frameWidth * frame + 0.5,
            per = frame / maxFrame;

            // draw for current button
            ctx.strokeStyle = '#000000';
            ctx.strokeRect(sx, 0, frameWidth - 1, frameHeight);

            // next frame
            frame += 1;

        }

        // add a new sheet to cache
        this.game.cache.addSpriteSheet('sheet-button', null, canvas, frameWidth, frameHeight, maxFrame, 0, 0);

        game.state.start('demo');

    }

});

// start boot state
game.state.start('boot');
