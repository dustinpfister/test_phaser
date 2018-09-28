var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        var text,
        font = {
            fill: 'white',
            font: '15px courier'
        },
        i = 0,
        len = 25,
        group = game.add.group();

        // add text elements
        while (i < len) {

            text = game.add.text(0, 0, i, font);

            group.add(text);

            i += 1;

        }

        group.align(5, 5, 40, 40, Phaser.TOP_LEFT, 0);

        console.log(group.width);

        group.x = game.world.centerX - group.width / 2;
        group.y = game.world.centerY - group.height / 2;

    },

    update: function () {}

});

game.state.start('boot');
