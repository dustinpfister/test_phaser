

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('hello-world', {

    render: function () {

        game.debug.pointer(game.input.mousePointer);

    }

});

game.state.start('hello-world');
