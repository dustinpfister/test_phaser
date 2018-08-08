
/*
game.state.add('repeat', {

create: function () {

var tick = 0;
game.time.events.repeat(1000, 5, function () {

console.log('tick: ' + tick);
tick++;

});

}

});
 */

game.state.add('repeat', {

    create: function () {

        var tick = 0,
        timer = game.time.events.loop(1000, function () {

            console.log('tick: ' + tick);

            if (tick === 3) {

                timer.loop = false;

            }

            tick++;

        });

    }

});
