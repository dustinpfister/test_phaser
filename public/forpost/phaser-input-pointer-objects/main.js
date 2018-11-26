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

        game.input.onDown.add(function (ptObj, ptE) {

            // pointer object
            console.log(ptObj);

            // pointer event
            console.log(ptE);

        });

    }
});

game.state.start('example1');
