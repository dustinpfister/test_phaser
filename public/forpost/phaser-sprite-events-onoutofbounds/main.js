
// what to do when an enemy does out of bounds
var onOutOfBounds = function (enemy) {
    var game = this.game;
    if (enemy.y <= 0) {
        enemy.y = game.world.height + 32;
        enemy.kill();
        game.data.health -= 10;
        if (game.data.health <= 0) {
            game.data.gameOver = true;
        }
    }

};

// create a pool of enemies
var createEnemySpritePool = function (game) {

    var data = game.data,
    i = 0,
    len = 4;
    data.enemies = game.add.group();

    while (i < len) {
        // create the enemy sprite
        var space = game.world.width / len;
        var enemy = data.enemy = game.make.sprite(space * i + space / 2, game.world.height + 32, 'sheet-enemy');
        enemy.anchor.set(0.5, 0.5);

        // set checkWorldBounds, and attach a handler
        enemy.checkWorldBounds = true;
        enemy.events.onOutOfBounds.add(onOutOfBounds, this);

        // the player can kill an enemy without loosing health
        enemy.inputEnabled = true;
        enemy.events.onInputDown.add(function (enemy) {
            enemy.y = game.world.height + 32;
            enemy.kill();
        });

        enemy.data.PPS = 32;
        enemy.kill();
        data.enemies.add(enemy);
        i += 1;
    }

};

// spawn enemies
var enemySpawn = function () {

    var data = this.game.data,
    dead = data.enemies.filter(function (enemy) {
            return !enemy.alive;
        }),
    enemy,
    roll = Math.random();

    if (dead.list.length > 0 && roll < data.enemySpawnPer) {
        enemy = dead.list[Math.floor(Math.random() * dead.list.length)];
        enemy.data.PPS = 16 + Math.floor(32 * Math.random());
        enemy.revive();
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
            enemyPPS: 32, // enemy pixles per second
            enemySpawnPer: 0.25
        };

        // create enemy sprite sheet and sprite pool
        createEnemySheet(game);
        createEnemySpritePool(game);

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

        // enemy spawn loop
        game.time.events.loop(500, enemySpawn, this);

    },

    update: function () {

        var data = game.data,
        enemy = data.enemy,
        tx = data.tx;

        tx.text = 'health: ' + data.health;
        if (data.gameOver) {
            tx.text = 'game over: click to reset';
        } else {
            // move alive enemies by pixels per second going by elapsed game time
            data.enemies.forEachAlive(function (enemy) {
                enemy.y -= game.time.elapsed / 1000 * enemy.data.PPS;
            });
        }

    }

});

game.state.start('demo');
