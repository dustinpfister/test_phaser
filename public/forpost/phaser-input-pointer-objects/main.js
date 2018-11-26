var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('position', {

    create: function () {

        game.input.onDown.add(function (pt) {

            console.log(pt.x, pt.y);

        });

    }

});

game.state.add('example1', {
    create: function () {

        game.input.onDown.add(function (ptObj, e) {

            // pointer object
            console.log(ptObj);

            // Event
            console.log(e);

        });

    }
});

game.state.start('example1');
