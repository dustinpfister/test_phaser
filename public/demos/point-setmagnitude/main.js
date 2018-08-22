var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var point = new Phaser.Point(10, 5);

        point.normalize();

        point.multiply(11, 11);

        // normalize point
        //point.setMagnitude(10);

        console.log(point);

    }

});

game.state.start('basic');
