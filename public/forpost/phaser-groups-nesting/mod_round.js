// The Wave Class that will be used with the round class
var Round = function (opt) {

    opt = opt || {};

    this.game = opt.game || game;

    // the key of the sprite sheet to use
    this.sheetKey = opt.sheetKey || '';

    this.waveCount = opt.waveCount || 3;
    this.waves = game.add.group();
    this.active = game.add.group();

    var i = 0;
    while (i < this.waveCount) {

        var wave = new Wave({
                game: this.game,
                sheetKey: opt.sheetKey,
                name: 'wave-' + (i + 1)
            });

        this.waves.add(wave.wave);

        i += 1;

    }

};
