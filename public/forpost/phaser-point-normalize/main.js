var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var point = new Phaser.Point(-0, 1),

        // normalize point
        normal = Phaser.Point.normalize(point);

        console.log(point);
        console.log(normal);

    }

});

game.state.add('polly', {

    create: function () {

        var polly = new Phaser.Polygon((function () {
                    var points = [],
                    pt,
                    x,
                    y,
                    a,
                    pi = 0,
                    pLen = 10,
                    xOff = 25,
                    yOff = 37,
                    d = 100;
                    while (pi < pLen) {

                        a = Math.PI * 2 * (pi / pLen);
                        x = Math.cos(a) * d + xOff;
                        y = Math.sin(a) * d + yOff;

                        pt = new Phaser.Point(x, y);

                        points.push(pt);

                        pi += 1;
                    }

                    return points;

                }
                    ()));

        console.log(polly.points);

    }

});

game.state.start('polly');
