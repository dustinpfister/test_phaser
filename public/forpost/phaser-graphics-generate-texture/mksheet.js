var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('mksheet', {

    // create method
    create: function () {

        // create graphics
        var gfx = game.make.graphics(0, 0);
        gfx.lineStyle(3, 0xffffff, 1);
        gfx.visible = false;

        // draw frame 0
        gfx.moveTo(16, 3);
        gfx.lineTo(29, 29);
        gfx.lineTo(3, 29);
        gfx.currentPath.shape.closed = true;

        // draw frame 1
        gfx.moveTo(48, 29);
        gfx.lineTo(35, 3);
        gfx.lineTo(61, 3);
        gfx.currentPath.shape.closed = true;

        // creating a sprite sheet with generateTexture
        game.cache.addSpriteSheet('sheet', null, gfx.generateTexture().baseTexture.source, 32, 32, 2, 0, 0);

        // creating a sprite with the sheet
        var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet', 0);
        sprite.anchor.set(0.5, 0.5);
        sprite.width = 100;
        sprite.height = 100;

        // step frame index every second
        game.time.events.loop(1000, function () {
            sprite.frame += 1;
            sprite.frame = sprite.frame %= 2;
        });

    }

});

game.state.start('mksheet');
