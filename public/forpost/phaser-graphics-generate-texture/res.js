var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    // create method
    create: function () {

        var data = game.data = {};

        var gfx = data.gfx = game.add.graphics(0, 0);

        //gfx.beginFill(0x00ff00);
        gfx.lineStyle(3, 0xffffff, 1);
        gfx.moveTo(8, 0);
        gfx.lineTo(16, 16);
        gfx.lineTo(0, 16);
        gfx.currentPath.shape.closed = true;

        gfx.visible = false;

        var texture = gfx.generateTexture(2);

        var sprite = game.add.sprite(32, 32, texture);

    }

});

game.state.start('basic');
