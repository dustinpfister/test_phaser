// The Wave Class that will be used with the round class
var Wave = function (opt) {

    opt = opt || {};

    this.game = opt.game || game;

    // the key of the sprite sheet to use
    this.sheetKey = opt.sheetKey || '';

    // the group instance that will contain Sprites for each enemy
    this.enemys = this.game.add.group();
    this.enemys.name = opt.name || '';

    // the count of enemys
    this.count = opt.count || 10;

    var i = 0,
    x,
    y,
    sprite;
    while (i < this.count) {

        sprite = this.enemys.create(0, 0, this.sheetKey);
        sprite.name = this.enemys.name + '-sprite-' + i;

        x = Math.floor(Math.random() * (this.game.world.width - 16));

        // make the data object of the sprite,
        // and instance of Enemy
        sprite.data = new Enemy({
                game: this.game,
                sprite: sprite,
                startPos: new Phaser.Point(x, -16),
                targetPos: new Phaser.Point(x, game.world.height - 16)
            });

        i += 1;

    }

};
