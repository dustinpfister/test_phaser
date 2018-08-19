var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var sprite = game.add.sprite(10, 10),
        sprite2 = game.add.sprite(10, -20),

        angle = new Phaser.Point(sprite.x, sprite.y).angle(sprite2) / Math.PI * 180;

        console.log(angle);

    }

});

game.state.start('basic');
