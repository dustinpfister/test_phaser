

game.state.add('delay', {

    create: function () {

        console.log('create method called');
        // fire the given callback every 100ms
        game.time.events.add(5000, function () {

            console.log('five secs passed');

        });

    }

});

game.state.add('basic-loops', {

    create: function () {

        // fire the given callback every 100ms
        game.time.events.loop(100, function () {

            console.log('tick 100:');

        });

        // fire the given callback every 1000ms
        game.time.events.loop(1000, function () {

            console.log('tick 1000:');

        });

    }

});

game.state.add('timer-pool', {

    create: function () {

        // making a new timer for this game that will auto destroy
        var timer = new Phaser.Timer(game, true);

        console.log('just a sec...');

        // add a one sec delay
        timer.add(1000, function () {

            console.log('okay.');

        });

        // start the timer
        timer.start();

        // add it to the timer pool
        game.time.add(timer);

    }

});