var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('example', {

    create: function () {

        // SETING WORLD SIZE
        game.world.resize(640, 480);

        // MAKING THWE FIXED GROUP
        var fixed = game.add.group();
        fixed.name = 'fixed';
        fixed.fixedToCamera = true;
        fixed.cameraOffset = new Phaser.Point(0, game.camera.height - 20);

        // ADDING A TEXT ELEMENT TO THE FIXED GROUP
        var font = {
            fill: 'white',
            font: '15px courier'
        };
        var text = game.add.text(5, 5, '', font);
        text.name = 'mess';
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

        // SETTING SOME VALUES
        // that will be used in the update method
        var data = game.data = game.data || {};

        data.frame = 0;
        data.maxFrame = 200;
        data.dist = game.world.height / 4;

    },

    update: function () {

        var per = game.data.frame / game.data.maxFrame,
        fixed = game.world.getByName('fixed'),
        angle = Math.PI * 2 * per,
        x,
        y;

        // updating position of the camera
        x = Math.floor((game.world.width / 2) - (game.camera.width / 2) + Math.cos(angle) * game.data.dist);
        y = Math.floor((game.world.height / 2) - (game.camera.height / 2) + Math.sin(angle) * game.data.dist);
        game.camera.setPosition(x, y);

        // displaying current camera position in text object
        // that is in the fixed group
        fixed.getByName('mess').text = 'fixed info: (' + x + ',' + y + ') ';

        // step frame
        game.data.frame += 1;
        game.data.frame %= game.data.maxFrame;

    }

});

game.state.start('example');
