
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');


game.state.add('demo', {

    create: function () {

        Plugin_missile(game, {});
		
		var missile = new game.data.Missile(0,0,64,64);

		
		//game.add.sprite(0,0,'sheet-missile');


        game.data.tx = game.add.text(10, 10, '', {
                fill: 'white',
                font: '15px courier'
            });

    },

    update: function () {

        var tx = game.data.tx;


    }

});

game.state.start('demo');

/*
game.state.add('demo', {

    create: function () {

        Plugin_missiles(game, {});

        var missile = game.data.missiles.group.children[0];

        missile.data.set('p', 160, 240, 100, 50);
        missile.data.launch();

        game.data.tx = game.add.text(10, 10, '', {
                fill: 'white',
                font: '15px courier'
            });

    },

    update: function () {

        var tx = game.data.tx,
        exploded = game.data.missiles.getExploded('*').list;

        tx.text = '';

        if (exploded.length) {

            tx.text = 'exploded: ' + exploded.length;

        }

    }

});

game.state.start('demo');
*/

