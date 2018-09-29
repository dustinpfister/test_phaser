// The Wave Class that will be used with the round class
var Wave = function (opt) {

    opt = opt || {};

    this.game = opt.game || game;

    // the key of the sprite sheet to use
    this.sheetKey = opt.sheetKey || '';

    // the group instance that will contain Sprites for each enemy
    this.wave = this.game.add.group();
    this.wave.name = opt.name || '';

    // append this class instance to something in the enemy group
    this.wave.data = this;

    // the count of enemys
    this.count = opt.count || 3;
    this.lastRelease = new Date();

    var i = 0,
    x,
    y,
    sprite;
    while (i < this.count) {

        sprite = this.wave.create(0, 0, this.sheetKey);
        sprite.name = this.wave.name + '-sprite-' + i;

        x = Math.floor(Math.random() * (this.game.world.width - 16));

        // make the data object of the sprite,
        // and instance of Enemy
        sprite.data = new Enemy({
                game: this.game,
                sprite: sprite,
                startPos: new Phaser.Point(x, 0),
                targetPos: new Phaser.Point(x, game.world.height + 16)
            });

        i += 1;

    }

};

Wave.prototype.tick = function () {

    var now = new Date();
    if (now - this.lastRelease >= this.releaseRate) {}

    // tick all enemy's
    this.enemys.forEach(function (enemy) {

        enemy.data.tick();

    });

};
