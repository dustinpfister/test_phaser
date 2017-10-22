
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);

            // make it a red rectangle
            gra.lineStyle(3, 0xff0000);

            // start by moving to a point
            gra.moveTo(0, 0);

            // draw a line
            gra.lineTo(100, 0);

        }

    });

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

// create method
create : function () {

// add a graphics object to the world
var gra = game.add.graphics(game.world.centerX, game.world.centerY);

// make it a red rectangle
gra.lineStyle(3, 0xff0000);

var i = 0,
len = 12;
while (i < len + 1) {

var r = Math.PI * 2 / len * i,
radius = 50 - 25 * (i % 2),
method;

method = i === 0 ? 'moveTo' : 'lineTo';

gra[method](

Math.cos(r) * radius,
Math.sin(r) * radius);

i += 1;
}

}

});
*/
