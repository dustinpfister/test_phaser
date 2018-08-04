var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        bitmap = new Phaser.BitmapData(game, 'bitmap', 32, 32);

        canvas.width = 32;
        canvas.height = 32;

        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, 32, 32);

        // draw the canvas to the bitmap canvas
        bitmap.context.drawImage(canvas, 0, 0);

        var sprite = game.add.sprite(0, 0, bitmap);

    }

});

game.state.start('boot');