
game.state.add('repeat', {

    create: function () {

        var tick = 0;
        game.time.events.repeat(1000, 5, function () {

            console.log('tick: ' + tick);
            tick++;

        });

    }

})
