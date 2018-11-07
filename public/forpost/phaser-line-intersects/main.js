var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var line1 = new Phaser.Line(10, 50, 10, 100),
        line2 = new Phaser.Line(20, 75, 8, 75),

        intersect = Phaser.Line.intersects(line1, line2);

        console.log(intersect.x, intersect.y); // 10 75

    }

});

game.state.start('basic');
