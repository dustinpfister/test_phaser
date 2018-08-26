

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basics-1', {

    create: function () {

        var group = game.add.group();

        var i = 5;
        while (i--) {

            group.add(game.add.text(0, i * 20, 'foo', {
                    fill: 'red'
                }));

        }

        console.log(group.children.length); // 5

    }

});

game.state.start('basics-1');
