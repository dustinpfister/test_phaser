var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// round object
var round = {

    waves: {},
    cache: {},
    active: {},
    game: game,

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

        // for each
        wi = 0;
        while (wi < waveCount) {

            // add new wave as parent of this.waves
            wave = game.add.group(this.waves);
            wave.name = 'wave-' + (wi + 1);

            ei = 0;
            while (ei < enemysPerWave) {

                enemy = wave.create(0, 0, 'badguys');
                wave.name = 'wave-' + (wi + 1);

                ei += 1;
            }

            wi += 1;

        }

    },

    // add next wave to cache
    nextWave: function () {

        if (this.waves.children.length > 0) {

            var wave = this.waves.children[0],
            cache = this.cache;

            wave.forEach(function (enemy) {

                wave.remove(enemy);
                cache.add(enemy);

            });

            wave.destroy();

        }

    },

    // release the next enemy from cache
    release: function () {

        if (this.cache.children.length > 0) {

            var enemy = this.cache.children[0];

            this.cache.remove(enemy, false);

            this.active.add(enemy);

        }

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

        // call next wave
        game.time.events.loop(3000, round.nextWave, round);

        game.time.events.loop(500, round.release, round);

    }

})

game.state.start('example-1');

/*
game.state.add('game', {

create: function () {

// green block sheet
sheetFromCanvas({
name: 'badguys',
game: this.game,
frames: 3,
frameWidth: 16,
frameHeight: 16,
forFrame: function (ctx) {
var colors = ['green', 'red', 'blue'];
ctx.fillStyle = colors[this.f];
ctx.lineWidth = 3;
ctx.fillRect(0, 0, 32, 32);
}
});

this.game.data = this.game.data || {};

var round = this.game.data.round = new Round({
game: this.game,
sheetKey: 'badguys',
waveCount: 10
});

game.time.events.loop(round.tick, 1000, round);

}

});
*/
