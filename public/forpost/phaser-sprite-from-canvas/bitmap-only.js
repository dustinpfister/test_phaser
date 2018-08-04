// basic state
game.state.add('bitmap-only', {

    create: function () {

        var bitmap,
        ctx,
        sprite;

        // make a bitmap, and draw to the canvas context
        bitmap = new Phaser.BitmapData(game, '', 64, 64);
        ctx = bitmap.context;
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, bitmap.width, bitmap.height);

        // use that bitmap as the texture for the sprite
        sprite = game.add.sprite(0, 0, bitmap);
        sprite.name = 'bx';
        sprite.x = game.world.centerX - sprite.width / 2;
        sprite.y = game.world.centerY - sprite.height / 2;

    }

});
