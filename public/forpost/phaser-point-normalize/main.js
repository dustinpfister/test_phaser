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

var mkPollyCircle = function (pLen, d, xOff, yOff) {

    var points = [],
    pt,
    x,
    y,
    a,
    pi;

    pLen = pLen === undefined ? 10 : pLen;
    d = d === undefined ? 100 : d;
    xOff = xOff === undefined ? 25 : xOff;
    yOff = yOff === undefined ? 25 : yOff;

    pi = 0;
    while (pi < pLen) {

        a = Math.PI * 2 * (pi / pLen);
        x = Math.floor(Math.cos(a) * d + xOff);
        y = Math.floor(Math.sin(a) * d + yOff);

        pt = new Phaser.Point(x, y);

        points.push(pt);

        pi += 1;
    }

    return new Phaser.Polygon(points);

};

game.state.add('polly', {

    create: function () {

        // create a Phaser Polygon  from an
        // array of points
        var polly = mkPollyCircle(5, 100, 50, 25);

        // normalize all
        polly.points.forEach(function (pt) {

            pt = pt.normalize();

        });

        console.log(polly.points);

    }

});

game.state.start('polly');
