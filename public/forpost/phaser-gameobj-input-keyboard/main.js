var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = game.data || {};

        var data = game.data;

        var guy = data.guy = game.add.sprite(0, 0, 'sheet-guy');

        game.physics.enable(guy);
        guy.body.gravity.set(0, 200);
        guy.body.collideWorldBounds = true;

        data.cursors = game.input.keyboard.createCursorKeys();

        // making jumps event driven
        data.cursors.up.onDown.add(function () {
            if (guy.body.onFloor()) {
                guy.body.velocity.y = -150;
            }
        });

    },

    update: function () {

        var data = game.data,
        cursors = data.cursors,
        guy = data.guy;

        guy.body.velocity.x = 0;

        //  polling for left and right movement
        if (cursors.left.isDown) {
            guy.body.velocity.x = -150;
        }

        if (cursors.right.isDown) {
            guy.body.velocity.x = 150;
        }

    }

});

game.state.start('demo')
