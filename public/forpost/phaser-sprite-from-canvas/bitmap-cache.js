

game.state.add('bitmap-cache', {

    data: {

        max: 10,
        bx: []

    },

    create: function () {

        var bitmap,
        ctx,
        sprite;

        // make an instance of bitmap data, and cache it.
        // the final argument here is a boolean that if true will
        // add the bitmap to the phaser cache.
        bitmap = game.add.bitmapData(64, 64, 'bitmap-key', true);

        // I can just draw to the canvas context on the bitmapData
        ctx = bitmap.context;
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, bitmap.width, bitmap.height);

        this.data.bx = [];

    },

    update: function () {

        var bitmap,
        sprite,
        i,
        x,
        y;

        if (this.data.bx.length < this.data.max) {

            x = Math.random() * game.world.width;
            y = Math.random() * game.world.height;

            // so I can grab at the cached bitmap like this
            bitmap = game.cache.getBitmapData('bitmap-key');

            // and then use it to make a sprite
            sprite = game.add.sprite(x, y, bitmap);
            sprite.data.maxLife = Math.floor(Math.random() * 150 + 50);
            sprite.data.life = sprite.data.maxLife;

            this.data.bx.push(sprite);

        }

        i = this.data.bx.length;
        while (i--) {

            sprite = this.data.bx[i];
            sprite.data.life -= 1;

            if (sprite.data.life <= 0) {

                this.data.bx.splice(i, 1);
                sprite.kill();

            } else {

                sprite.alpha = sprite.data.life / sprite.data.maxLife;

            }

        }

    }

});
