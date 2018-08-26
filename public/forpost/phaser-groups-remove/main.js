

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basics-1', {

    create: function () {

        var group1 = game.add.group(),
        group2 = game.add.group();

        var i = 5;
        while (i--) {

            group1.add(game.add.text(0, i * 20, 'foo' + i, {
                    fill: 'red'
                }));

        }

        console.log(group1.children.length); // 5
        console.log(group2.children.length); // 0

        var text = group1.children[2];
        text.x = 0;
        text.y = 0;

        group1.remove(text, false);

        group2.add(text);
        group2.x = 100;

        console.log(group1.children.length); // 4
        console.log(group2.children.length); // 1

    }

});

game.state.start('basics-1');
