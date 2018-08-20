
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('static', {

    create: function () {

        // objects for centerPoint, and a thing that
        // I want to rotate around it.
        var thing = {
            x: 100,
            y: 100
        },
        center = {
            x: 0,
            y: 0
        };

        Phaser.Point.rotate(thing, center.x, center.y, 45, true, 100);

        console.log(Math.floor(thing.x), Math.floor(thing.y));

    }

});

game.state.start('static');
