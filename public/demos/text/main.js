/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

create : function () {

game.add.text(0, 0, 'Hello World', {fill : 'white'});

}

});
 */
/*
var game = (function () {

var tx,
foos = 0;

return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

// create method
create : function () {

tx = game.add.text(20, 20, '', {
fill : '#ffffff'
});

},

// the update method will be called on each tick
update : function () {

tx.text = 'foos: ' + foos;

foos += 1;
}

});

}
());
 */

var game = (function () {

    var tx,
    i = 0,
    maxI = 500,
    per = 0,
    bias = 0;

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            tx = game.add.text(20, 20, '', {
                    fill : '#ffffff'
                });

        },

        // the update method will be called on each tick
        update : function () {

            per = i / maxI;
            bias = 1 - Math.abs(.5 - per) / .5;

            tx.text = 'i: ' + i;

            // changing text position on each update
            tx.x = 150 * bias;
            tx.y = Math.sin(Math.PI * 2 * bias) * 50 + 70;

            i += 1;
            if (i >= maxI) {

                i = i % maxI;

            }
        }

    });

}
    ());
