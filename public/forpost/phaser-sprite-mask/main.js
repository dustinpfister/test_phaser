var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('mask-demo', {

    create: function () {

        var texture = game.make.graphics(0, 0);
        texture.beginFill(0xff0000);
        texture.drawRect(0, 0, 32, 32);
        texture.endFill();

        var mask = game.make.graphics(0, 0);
        mask.beginFill(0xffffff);
        mask.drawCircle(16, 16, 32);

        //Here we add a Sprite to the display list
        sprite = game.add.sprite(0, 0, texture.generateTexture());
        sprite.scale.set(2);
        sprite.mask = mask;

        var group = game.add.group();
        group.add(sprite);
        group.add(mask);

        group.x = 32;
        group.y = 32;

    }

});

game.state.start('mask-demo');
