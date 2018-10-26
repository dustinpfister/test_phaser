
var onOutOfBounds = function (enemy) {

    var game = this.game;

    if (enemy.y <= 0) {
        enemy.y = game.world.height + 32;
        game.data.health -= 10;
        if (game.data.health <= 0) {
            game.data.gameOver = true;
        }
    }

};

var createEnemySprite = function (game) {

    var data = game.data;

    data.enemys = game.add.group();

    var i = 0,
    len = 1;
    while (i < len) {

        // create the enemy sprite
        var enemy = data.enemy = game.make.sprite(game.world.centerX, game.world.height + 32, 'sheet-enemy');
        enemy.anchor.set(0.5, 0.5);

        // set checkWorldBounds, and attach a handler
        enemy.checkWorldBounds = true;
        enemy.events.onOutOfBounds.add(onOutOfBounds, this);

        data.enemys.add(enemy);

        i += 1;

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

        var data = game.data = game.data || {
            health: 100,
            gameOver: false,
            lt: game.time.physicsElapsedMS,
            enemyPPS: 32 // enemy pixles per second
        };

        createEnemySheet(game);

        createEnemySprite(game);

        // reset game if it is over
        game.input.onDown.add(function () {
            if (data.gameOver) {
                data.health = 100;
                data.gameOver = false;
            }
        });

        // text object
        var tx = data.tx = game.add.text(10, 10, '', {
                fill: 'white',
                font: '15px courier'
            });

    },

    update: function () {

        var data = game.data,
        enemy = data.enemy,
        tx = data.tx;

        tx.text = 'health: ' + data.health;
        if (data.gameOver) {
            tx.text = 'game over: click to reset';
        } else {
            // move enemy by pixels per second going by elapsed game time
            //enemy.y -= game.time.elapsed / 1000 * data.enemyPPS;
            data.enemys.children[0].y -= game.time.elapsed / 1000 * data.enemyPPS;
        }

    }

});

game.state.start('demo');
