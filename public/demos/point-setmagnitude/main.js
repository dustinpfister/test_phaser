var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var point = new Phaser.Point(10, 5),
        startMag = point.getMagnitude();

        console.log('start mag: ' + startMag); // 11.18...

        // normalize or setMagnitude(1);
        point.normalize();
        console.log('normal mag: ' + point.getMagnitude()); // 0.99...

        // set length to 1/2
        point.setMagnitude(startMag / 2);
        console.log('half mag: ' + point.getMagnitude());
        console.log('pos: ', point.x, point.y); // 5.00... 2.50...

    }

});

game.state.start('basic');
