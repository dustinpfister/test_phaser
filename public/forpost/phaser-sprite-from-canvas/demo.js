// full demo state
game.state.add('demo', {

    create: function () {

        var sp3,
        canvas,
        ctx;

        // creates a new canvas, and uses a render method for it
        fromCanvas({
            game: game,
            name: 'sp1',
            width: 32,
            height: 128,
            render: function (ctx) {
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 6;
                ctx.strokeRect(0, 0, this.width, this.height);
            }
        });

        // this represents a canvas that was canvas before hand
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // uses a canvas that was created before hand
        fromCanvas({
            game: game,
            name: 'sp2',
            cacheBitmap: true, // cache the bitmap data instance
            canvas: canvas
        });

        // I can make more sprites with the cached bitmap from sp2
        sp3 = game.add.sprite(0, 0, game.cache.getBitmapData('bitmap-sp2'));
        sp3.name = 'sp3';

    },

    update: function () {

        var sp1 = game.world.getByName('sp1'),
        sp2 = game.world.getByName('sp2'),
        sp3 = game.world.getByName('sp3');

        sp1.x = game.global.bias * (game.world.width - sp1.width);
        sp1.y = game.world.centerY - sp1.height / 2;

        sp2.x = Math.cos(game.global.r) * 75 + game.world.centerX - sp2.width / 2;
        sp2.y = Math.sin(game.global.r) * 75 + game.world.centerY - sp2.height / 2;

        sp3.x = game.world.centerX - sp3.width / 2;
        sp3.y = game.world.centerY - sp3.height / 2;

        game.global.step();

    }

});
