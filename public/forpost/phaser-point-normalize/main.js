var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var point = new Phaser.Point(10, 1),

        // normalize point
        normal = Phaser.Point.normalize(point);

        console.log(point); // i.Point {x: 10, y: 1, type: 25}
        console.log(normal); // i.Point {x: 0.9950371902099892, y: 0.09950371902099892, type: 25}

    }

});

game.state.add('polly', {

    create: function () {

        // create a Phaser Polygon  from an
        // array of points
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
                        x = Math.floor(Math.cos(a) * d + xOff);
                        y = Math.floor(Math.sin(a) * d + yOff);

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

game.state.start('basic');
