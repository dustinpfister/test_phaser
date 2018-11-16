
var createSheetBuildings = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 32, 32);
    game.cache.addSpriteSheet('sheet-buildings', null, canvas, 32, 32, 1, 0, 0);
};

var createSheetGameBoard = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, 31, 31);
    game.cache.addSpriteSheet('sheet-gameboard', null, canvas, 32, 32, 1, 0, 0);
};

var createSheetEnemies = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 32, 32);
    game.cache.addSpriteSheet('sheet-enemies', null, canvas, 32, 32, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        createSheetGameBoard(game);
        createSheetBuildings(game);
        createSheetEnemies(game);

        Plugin_gameboard(game);
        Plugin_buildings(game);
        Plugin_enemies(game);

    }

});

game.state.start('demo');
