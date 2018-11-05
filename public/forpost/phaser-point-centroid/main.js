var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('other', {

    create: function () {

        var points = [],
        i = 0,
        x,
        y,
        len = 5;
        while (i < len) {

            x = 320 / len * i;
            y = 240 - Math.pow(2, i);
            points.push(new Phaser.Point(x, y));
            i += 1;

        }

        console.log(Phaser.Point.centroid(points));

    }

});

game.state.start('other');
