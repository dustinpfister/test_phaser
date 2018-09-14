var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        // setup game data object
        Enemy.setup.call(this);

        Enemy.mkSheet(this.game);

        Enemy.createEnemyPool.call(this);

        // start demo, and do not clear the world
        game.state.start('demo', false, false);

    }

});

game.state.add('demo', {

    create: function () {

        // call Enemy.spawn every second
        game.time.events.loop(1000, Enemy.spawn, this);

        // text display object to show score
        var text = game.add.text(5, 5, '', {
                fill: 'white'
            });
        text.name = 'disp-score';

    },

    update: function () {

        var data = this.game.data;

        Enemy.update.call(this);

        game.world.getByName('disp-score').text = 'score: ' + data.score;

    }

});

game.state.start('boot');
