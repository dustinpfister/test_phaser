var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        var canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = '#8f0000';
        ctx.beginPath();
        ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();

        this.game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 1, 0, 0);

        game.state.start('demo');

    }

});

game.state.add('demo', {

    create: function () {

        var i = 0,
        count = 10,
        obj;
        while (i < count) {
            obj = this.game.add.sprite(0, 0, 'sheet');
            obj.name = 'block' + i;
            i += 1;
        }

        obj = game.add.text(game.world.centerX, game.world.centerY, '', {
                fill: 'white'
            });
        obj.name = 'text';
        obj.anchor.set(0.5, 0.5);

        this.game.data = {
            i: 0
        };

        this.game.input.onDown.add(function () {

            this.game.paused = !this.game.paused;

        });

    },

    paused: function () {

        this.game.world.getByName('text').text = 'paused';

    },

    update: function () {

        var per = this.game.data.i / 120,
        r = Math.PI * 2 * per,
        i = 0,
        count = 10,
        sprite;
        while (i < count) {

            a = Math.PI * 2 * (i / 10);

            sprite = this.game.world.getByName('block' + i);
            sprite.x = game.world.centerX - 16 + Math.cos(r + a) * 50;
            sprite.y = game.world.centerY - 16 + Math.sin(r + a) * 50;
            i += 1;
        }

        this.game.data.i += 1;
        this.game.data.i %= 120;

        this.game.world.getByName('text').text = '';

    }

});

game.state.start('boot');
