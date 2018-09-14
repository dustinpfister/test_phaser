
var Enemy = {

    onKill: function (sprite) {

        var game = sprite.game;

        game.data.score += 1;

    }

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        // sprite sheet generated by canvas
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 32;

        // blue frame
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(0, 0, 32, 32);

        // red frame
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(32, 0, 32, 32);

        game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, 2, 0, 0);

        // start demo, and do not clear the world
        game.state.start('demo', false, false);

    }

});

game.state.add('demo', {

    create: function () {

        var data = this.game.data = {

            maxEnemys: 5,
            enemys: game.add.group(),
            score: 0

        };

        // spawn loop
        game.time.events.loop(1000, function () {

            if (data.enemys.length < data.maxEnemys) {

                var enemy = data.enemys.create(-32, -32, 'sheet-block');
                enemy.data = {

                    dx: Math.random() * 4 + 1,
                    dy: Math.random() * 4 + 1,
                    hp: 2

                };

                enemy.events.onKilled.add(Enemy.onKill);

                enemy.inputEnabled = true;
                enemy.events.onInputDown.add(function (enemy) {

                    enemy.data.hp -= 1;

                    if (enemy.data.hp === 1) {

                        enemy.frame = 1;

                    }

                    if (enemy.data.hp <= 0) {

                        enemy.kill();
                        enemy.destroy();

                    }

                });

            }

        });

        var text = game.add.text(5, 5, '', {
                fill: 'white'
            });
        text.name = 'disp-score';

    },

    update: function () {

        var data = this.game.data,
        game = this.game;

        data.enemys.forEach(function (enemy) {

            enemy.x = Phaser.Math.wrap(enemy.x += enemy.data.dx, -32, game.world.width + 32);
            enemy.y = Phaser.Math.wrap(enemy.y += enemy.data.dy, -32, game.world.height + 32);

        });

        game.world.getByName('disp-score').text = 'score: ' + data.score;

    }

});

game.state.start('boot');
