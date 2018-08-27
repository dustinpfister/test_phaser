var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// round object
var round = {

    waves: {},
    cache: {},
    active: {},
    game: game,

    enemyCount: 0,

    playerHP: 1000,

    // setup waves
    setup: function () {

        var waveCount = 3,
        enemysPerWave = 5,
        wave,
        enemy,
        wi,
        ei;

        this.waves = game.add.group();
        this.waves.name = 'waves';
        this.waves.x = -32;

        this.cache = game.add.group();
        this.cache.name = 'cache';
        this.cache.x = -32;

        this.active = game.add.group();
        this.active.name = 'active';
        this.active.x = 0;

        // 3 waves of 5
        this.genWaves(3, 5);

        // 1 wave of ten
        this.genWaves(1, 10);

    },

    // generate the waves
    genWaves: function (waveCount, enemysPerWave) {

        var wave,
        enemy,
        wi,
        ei;

        // for each
        wi = 0;
        while (wi < waveCount) {

            // add new wave as parent of this.waves (nesting)
            wave = game.add.group(this.waves);
            wave.name = 'wave-' + (wi + 1);

            ei = 0;
            while (ei < enemysPerWave) {

                enemy = wave.create(0, 0, 'badguys');
                enemy.name = 'enemy-' + this.enemyCount;
                enemy.inputEnabled = true;

                enemy.events.onInputDown.add(function (enemy) {

                    enemy.destroy();

                });

                this.enemyCount += 1;
                ei += 1;
            }

            wi += 1;

        }

    },

    // add next wave to cache
    nextWave: function () {

        if (this.waves.children.length > 0) {

            var wave = this.waves.children[0],
            enemy,
            cache = this.cache,
            i = wave.children.length;
            while (i--) {
                enemy = wave.children[i];
                wave.remove(enemy);
                cache.add(enemy);
            }

            wave.destroy();

        }

    },

    // release the next enemy from cache
    release: function () {

        if (this.cache.children.length > 0) {

            var enemy = this.cache.children[0];
            enemy.x = Math.floor(Math.random() * (this.game.world.width - 32));
            enemy.y = -32;

            this.cache.remove(enemy, false);

            this.active.add(enemy);

        }

    },

    // tick the active group, where the real action happens
    tick: function () {

        var game = round.game;

        this.active.forEach(function (enemy) {

            enemy.y += 1;

            if (enemy.y >= game.world.height) {

                round.playerHP -= 5;

                enemy.destroy();

            }

        });

    }

};

game.state.add('example-1', {

    create: function () {

        // basic block sprite sheet, made wwith canvas
        var canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 32, 32);
        this.game.cache.addSpriteSheet('badguys', null, canvas, 32, 32, 1, 0, 0);

        // setup
        round.setup();

        var font = {
            fill: 'white',
            font: '10px courier'
        };

        var text = game.add.text(5, 5, '', font);
        text.name = 'text1';

        var text2 = game.add.text(5, 15, '', font);
        text2.name = 'text2';

        // call next wave for first time, and every ten seconds
        round.nextWave.call(round);
        game.time.events.loop(7000, round.nextWave, round);

        // release a new enemy from cache every second
        game.time.events.loop(1000, round.release, round);

        // tick active group
        game.time.events.loop(33, round.tick, round);

    },

    update: function () {

        var text = game.world.getByName('text1'),
        text2 = game.world.getByName('text2');

        // wave info
        text.text = 'waves: ' + round.waves.children.length + ' | enemys: ' +
            round.active.children.length +
            '(+' + round.cache.children.length + ')';

        // player info
        text2.text = 'hp: ' + round.playerHP;

    }

})

game.state.start('example-1');
