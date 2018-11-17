
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

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        createSheetGameBoard(game);
        createSheetBuildings(game);
        createSheetEnemies(game);

        Plugin_defence(game, {

            xOffset: 32,
            yOffset: 32

        });

        game.data.grid.onTileClick.add(function (tile, c, r, row, rows) {
            console.log(tile, c, r, row, rows);
        });

        game.data.disp = game.add.text(10, game.world.height - 20, 'hello', {
                fill: 'white',
                font: '15px courier'
            });

    },

    update: function () {

        game.data.disp.text = 'health: ' + game.data.player.health;

    }

});

game.state.start('demo');
