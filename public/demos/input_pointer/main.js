
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {

        create : function () {

            // a display object that will be effected
            var avg = game.add.graphics(-100, 0);
            avg.beginFill(0x00ff00);
            avg.drawCircle(0, 0, 100);
            avg.endFill();

            // add a third pointer
            game.input.addPointer();

            // maybe even a forth
            game.input.addPointer();

        },

        render : function () {

            // grabbing a ref to the display object this way
            var avg = game.world.children[0],

            // points is short for the pointer array
            points = game.input.pointers;

            // set some default values for the display object
            avg.x = 0;
            avg.y = 0;

            // the data object of a display object comes in handy for things like this
            avg.data.activeCount = 0;

            // loop over all pointers
            points.forEach(function (pointer) {

                // is the pointer active?
                if (pointer.active) {

                    // if so count it as part of the average
                    avg.x += pointer.x;
                    avg.y += pointer.y;
                    avg.data.activeCount += 1;

                }

            });

            // divide the sum over count of values for average
            avg.x /= avg.data.activeCount;
            avg.y /= avg.data.activeCount;

        }

    });

/*
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {

render : function () {

game.input.pointers.forEach(function (pointer) {

game.debug.pointer(pointer);

});

}

})
*/
