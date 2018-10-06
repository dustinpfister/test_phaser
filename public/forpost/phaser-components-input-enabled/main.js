
var mkGraphic = function (game) {

    var gra = game.data.gra = game.add.graphics(160, 120);

    // enable the input
    gra.inputEnabled = true;

};

var draw = function (gra, color) {

    color = color || 0x0000ff;

    gra.clear();
    gra.beginFill(color);
    gra.drawRect(-50, -50, 100, 100);
    gra.endFill();

};

var attachEvents = function () {

    var gra = game.data.gra;

    // I can now use the onInputDown event
    gra.events.onInputDown.add(function (gra, pt) {

        draw(gra, 0x00ff00);

    });

    // onInputUp also
    gra.events.onInputUp.add(function (gra, pt) {

        draw(gra, 0x0000ff);

    });

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = game.data || {};

        mkGraphic(game);

        attachEvents();

        draw(game.data.gra);
    }

});

game.state.start('demo');
