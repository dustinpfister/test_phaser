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
    sprite;
    while (i < this.count) {

        sprite = this.enemys.create(0, 0, this.sheetKey);
        sprite.name = this.enemys.name + '-sprite-' + i;
        sprite.frame = Math.floor(Math.random() * 3);

        sprite.data = new Enemy({
                game: this.game,
                sprite: sprite,
                startPos: new Phaser.Point(100, 0),
            });

        sprite.x = sprite.data.startX;
        sprite.y = sprite.data.startY;

        i += 1;
    }

};
