var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var point = new Phaser.Point(10, 1),

        // normalize point
        normal = Phaser.Point.normalize(point);

        console.log(point);
        console.log(normal);

    }

});

game.state.start('basic');
