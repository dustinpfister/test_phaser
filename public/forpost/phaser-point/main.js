var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var pt = new Phaser.Point(10, 10);

        // so then there are the x and y properties of the point
        console.log(pt.x, pt.y); // 15, 20

        // and then there are methods that can be used with other points
        var pt2 = new Phaser.Point(20, 20),
        angle = pt.angle(pt2);
        console.log(angle / Math.PI * 180); // 45

    }

});

game.state.start('basic');
