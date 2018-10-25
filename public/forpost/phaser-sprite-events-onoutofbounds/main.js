
var onOutOfBounds = function (enemy) {

    var game = this.game;

    if (enemy.y <= 0) {
        enemy.y = game.world.height + 32;
        game.data.health -= 25;
        if (game.data.health <= 0) {
            game.data.gameOver = true;
        }
    }

};

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
            health: 100,
            gameOver: false
        };

        var enemy = data.enemy = game.add.sprite(game.world.centerX, game.world.height + 32, 'sheet-enemy');
        enemy.anchor.set(0.5, 0.5);

        // set checkWorldBounds, and attach a handler
        enemy.checkWorldBounds = true;
        enemy.events.onOutOfBounds.add(onOutOfBounds, this);

        var tx = data.tx = game.add.text(10, 10, '', {
                fill: 'white',
                font: '15px courier'
            });

        game.input.onDown.add(function () {

            if (data.gameOver) {
                data.health = 100;
                data.gameOver = false;
            }

        });

    },

    update: function () {

        var data = game.data,
        enemy = data.enemy,
        tx = data.tx;

        tx.text = 'health: ' + data.health;
        if (!data.gameOver) {
            enemy.y -= 10;
        } else {
            tx.text = 'game over';
        }

    }

});

game.state.start('demo');
