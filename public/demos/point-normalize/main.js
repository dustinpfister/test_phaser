var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var point = new Phaser.Point(10,1),
        out = new Phaser.Point(1,1);

        // normalize point
        Phaser.Point.normalize(point);
        console.log(point);

    }

});

game.state.start('basic');
