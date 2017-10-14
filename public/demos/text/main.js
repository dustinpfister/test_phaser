
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
