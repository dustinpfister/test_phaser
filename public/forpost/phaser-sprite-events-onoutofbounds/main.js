
// Guy SPRITE SHEET
var createEnemySheet = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 16, 16);
    game.cache.addSpriteSheet('sheet-enemy', null, canvas, 16, 16, 1, 0, 0);
};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        createEnemySheet(game);

        var data = game.data = game.data || {
            health: 100
        };

        var enemy = data.enemy = game.add.sprite(game.world.centerX, game.world.height, 'sheet-enemy');
        enemy.anchor.set(0.5, 0.5);

        // set checkWorldBounds, and attach a handler
        enemy.checkWorldBounds = true;
        enemy.events.onOutOfBounds.add(function () {
            enemy.y = game.world.height;
            game.data.health -= 10;
            if (game.data.health <= 0) {
                game.data.gameOver = true;
            }
        });

    },

    update: function () {

        var enemy = game.data.enemy;

        enemy.y -= 1;

    }

});

game.state.start('demo');
