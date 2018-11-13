


var createStateLoop = function (game) {

    var data = game.data;

    data.money = 0;
    data.moneyPerSecond = 15 / 60 / 60;
    data.startTime = new Date();

    var loop = function () {

        setTimeout(loop, 1000);

        var now = new Date(),
        time = now - data.startTime;

        data.money = time / 1000 * data.moneyPerSecond;

        // log money to title element
        titleLoger('m=' + game.data.money.toFixed(2));

    };

    loop();

};

var titleLoger = function (text) {
    document.title = text;
};

// the main game variable
var game = new Phaser.Game(500, 40, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = {};

        game.stage.disableVisibilityChange = true;

        createStateLoop(game);

        game.data.disp = game.add.text(10, 10, '', {
                fill: 'white',
                font: '10px courier'
            });

    },

    update: function () {

        game.data.disp.text = 'm: ' + game.data.money.toFixed(2) + ': st: ' + game.data.startTime;

    }

});

game.state.start('demo');
