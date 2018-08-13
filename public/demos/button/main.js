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
        buttons = ['foo', 'bar'],

        // state colors [over,out,down,up]
        stateColors = ['#ffff00', '#afafaf', '#ff0000', '#00ff00'],
        button = 0,
        maxButton = buttons.length,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

        canvas.width = frameWidth * maxFrame;
        canvas.height = frameHeight * maxButton;

        // disable scrollTo
        game.scale.compatibility.scrollTo = false;

        // make button sheet
        while (button < buttons.length) {

            frame = 0;
            while (frame < maxFrame) {

                // figure startx, and percent done
                var sx = frameWidth * frame + 0.5,
                sy = frameHeight * button + 0.5;

                // draw for current button
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = stateColors[frame];
                ctx.strokeRect(sx, sy, frameWidth - 1, frameHeight - 1);
                ctx.fillRect(sx, sy, frameWidth - 1, frameHeight - 1);

                ctx.fillStyle = '#000000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(buttons[button], sx + frameWidth / 2, sy + frameHeight / 2)

                // next frame
                frame += 1;

            }

            // next button
            button += 1;

        }

        document.body.appendChild(canvas);

        // add a new sheet to cache
        this.game.cache.addSpriteSheet('sheet-button', null, canvas, frameWidth, frameHeight, maxFrame, 0, 0);

        game.state.start('demo');

    }

});

// start boot state
game.state.start('boot');
