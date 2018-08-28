var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('example', {

    create: function () {

        // SETING WORLD SIZE
        game.world.resize(640, 480);

        // MAKING THWE FIXED GROUP
        var fixed = game.add.group();
        fixed.fixedToCamera = true;
        fixed.cameraOffset = new Phaser.Point(0, game.camera.height - 20);

        // ADDING A TEXT ELEMENT TO THE FIXED GROUP
        var font = {
            fill: 'white',
            font: '15px courier'
        };
        var text = game.add.text(5, 5, 'fixed to camera', font);
        fixed.add(text);

        // GENERATING SOME BOXES TO THE WORLD
        var canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0, 0, 32, 32);
        game.cache.addSpriteSheet('sheet-box', null, canvas, 32, 32, 1, 0, 0);

        var bx = 100,
        x,
        y;
        while (bx--) {

            x = Math.random() * (game.world.width - 32);
            y = Math.random() * (game.world.height - 32);

            game.add.sprite(x, y, 'sheet-box');

        }

    },

    update: function () {}

});

game.state.start('example');
