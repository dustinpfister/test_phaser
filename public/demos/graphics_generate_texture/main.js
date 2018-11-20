var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    // create method
    create: function () {

        var data = game.data = {};

        var gfx = data.gfx = game.add.graphics(0, 0);

        gfx.beginFill(0x00ff00);
        gfx.drawRect(0, 0, 32, 32);
        gfx.visible = false;

        var texture = gfx.generateTexture();

        var sprite = game.add.sprite(32, 32, texture);

    }

});

game.state.start('basic');
