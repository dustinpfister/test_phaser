var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('res', {

    // create method
    create: function () {

        // create graphics
        var gfx = game.add.graphics(0, 0);
        gfx.lineStyle(3, 0xffffff, 1);
        gfx.moveTo(16, 0);
        gfx.lineTo(32, 32);
        gfx.lineTo(0, 32);
        gfx.currentPath.shape.closed = true;
        gfx.visible = false;

        // create textures with different resolutions
        var i = 0,
        sprite,
        texture,
        len = 9;
        while (i < len) {

            texture = gfx.generateTexture(.15 + 0.85 * (i / len));
            game.add.sprite(0 + 32 * i, 32, texture);

            i += 1;

        }

    }

});

game.state.start('res');
