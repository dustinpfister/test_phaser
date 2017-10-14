
var game = (function () {

    var tx;

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

		    var style = {fill:'#ffffff'};
            bx = game.add.text(20,20,'foo', style);

        },

        // the update method will be called on each tick
        update : function () {


        }

    });

}
    ());
