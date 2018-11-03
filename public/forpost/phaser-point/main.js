var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        var pt = new Phaser.Point(15, 20);

        console.log(pt.x, pt.y); // 15, 20

    }

});

game.state.start('basic');
