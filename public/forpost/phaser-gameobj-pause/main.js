var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        var canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.strokeStyle = '#ff0000';
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();

        this.game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 1, 0, 0);

        game.state.start('demo');

    }

});

game.state.add('demo', {

    create: function () {

        game.paused = true;

        var i = 0,
        count = 10,
        sprite;
        while (i < count) {
            sprite = this.game.add.sprite(0, 0, 'sheet');
            sprite.name = 'block' + i;
            i += 1;
        }

    },

    paused: function () {

        console.log('yeah');

    },

    update: function () {

        var i = 0,
        count = 10,
        sprite;
        while (i < count) {
            sprite = this.game.world.getByName('block' + i);
            sprite.x = game.world.centerX - 16;
            sprite.y = game.world.centerY - 16;
            i += 1;
        }

    }

});

game.state.start('boot');
