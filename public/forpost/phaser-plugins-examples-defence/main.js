

var createSheetBuildings = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 16, 32);
    game.cache.addSpriteSheet('sheet-buildings', null, canvas, 16, 32, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        createSheetBuildings(game);

        Plugin_gameboard(game);
        Plugin_buildings(game);

    }

});

game.state.start('demo');
