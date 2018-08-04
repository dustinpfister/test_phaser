// basic state
game.state.add('basic', {

    create: function () {

        // create a canvas, and get the 2d context
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        bitmap,
        sprite;

        // set the native width, and height of the canvas
        // and draw something to the context
        canvas.width = 64;
        canvas.height = 64;
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // make a bitmap, and draw the canvas to its canvas
        bitmap = new Phaser.BitmapData(game, '', 64, 64);
        bitmap.context.drawImage(canvas, 0, 0);

        // use that bitmap as the texture for the sprite
        sprite = game.add.sprite(0, 0, bitmap);
        sprite.name = 'bx';
        sprite.x = game.world.centerX - sprite.width / 2;
        sprite.y = game.world.centerY - sprite.height / 2;

    }

});