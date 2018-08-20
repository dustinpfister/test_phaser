var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// very basic
var angle = Phaser.Point.prototype.angle.call({
        x: 0,
        y: 0
    }, {
        x: 10,
        y: 10
    });
console.log(angle); // 0.7853981633974483
console.log(angle / Math.PI * 180); // 45

game.state.add('basic', {

    create: function () {

        var sprite = game.add.sprite(10, 10),
        sprite2 = game.add.sprite(10, -20),

        angle = new Phaser.Point(sprite.x, sprite.y).angle(sprite2) / Math.PI * 180;

        console.log(angle);
         - 90;

    }

});

game.state.add('demo', {

    create: function () {}

});

game.state.start('demo');
