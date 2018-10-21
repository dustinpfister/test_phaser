var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = game.data || {};

        var data = game.data;

        var ship = data.ship = game.add.sprite(32, 32, 'sheet-guy');
        ship.anchor.set(0.5, 0.5);

        var angle = 0;
        angle = Phaser.Math.rotateToAngle(angle, angle + Math.PI);

        console.log(ship.rotation);
        ship.rotation = Phaser.Math.rotateToAngle(ship.rotati, Math.PI, 0.005);
        ship.rotation = Phaser.Math.rotateToAngle(0, Math.PI, 0.005);

        ship.rotation = Phaser.Math.rotateToAngle(0, Math.PI, 0.005);

        ship.rotation = Phaser.Math.rotateToAngle(0, Math.PI, 0.005);
        console.log(ship.rotation);

    },

    update: function () {

        var data = game.data,
        cursors = data.cursors,
        ship = data.ship;

        ship.rotation = Phaser.Math.rotateToAngle(ship.rotation, Math.PI, 0.05);

    }

});

game.state.start('demo')
