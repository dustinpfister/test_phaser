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

// a polly state
game.state.add('polly', {

    create: function () {

        // create a Phaser Polygon  from an array of points
        var polly = mkPollyCircle(5, 100, 50, 50);

        // before normalization
        console.log(polly.points[0]); // i.Point {x: 150, y: 50, type: 25}

        // normalize all
        polly.points.forEach(function (pt) {
            pt = pt.normalize();
        });

        // after normalization
        console.log(polly.points[0]); // i.Point {x: 0.9486832980505138, y: 0.3162277660168379, type: 25}

        // now the polygon can be easily scaled, and positioned
        var scale = 5,
        offset = {
            x: 100,
            y: 100
        };
        polly.points.forEach(function (pt) {
            pt.x = pt.x * scale + offset.x;
            pt.y = pt.y * scale + offset.y;
        });

        console.log(polly.points[0]); // i.Point {x: 104.74341649025257, y: 101.58113883008419, type: 25}


    }

});

game.state.start('polly');
