
var modes = new Phaser.Game(320, 240, Phaser.HEADLESS);

modes.state.add('boot', {

    create: function () {

        modes.enableStep();

    },

    update: function () {

        console.log('normal');

    }

});

modes.state.add('normal', {

    create: function () {

        console.log('yes');

    },

    update: function () {

        console.log('normal');

    }

});

modes.state.start('boot');

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

/*
game.state.add('boot', {

create: function () {

//game.enableStep();

game.state.start('play');

}

});

game.state.add('play', {

create: function () {

modes.start('normal');

// step main game every second
game.time.events.loop(1000, function () {
game.step();
});

},

update: function () {

//console.log('play tick');

}

});

game.state.start('boot');
*/
