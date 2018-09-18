
// make a sprite sheet
var mkSheet = function (game) {

    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;

    // blue frame
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 32, 32);

    game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, 2, 0, 0);

};

var setupDataObject = function (game, sprite) {

    // appending some values to the data object
    sprite.data.frame = 0;
    sprite.data.frame_max = 50;
    sprite.data.sprite = sprite;
    sprite.data.game = game;

    // step sprite movement method
    sprite.data.step = function () {

        this.per = this.frame / this.frame_max;
        this.bias = 1 - Math.abs(0.5 - this.per) / 0.5;

        this.sprite.x = this.game.world.centerX - 16 - 100 + 200 * this.bias;
        this.sprite.y = this.game.world.centerY - 16;

        this.frame += 1;
        this.frame %= this.frame_max;

    };

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    create: function () {

        // make my sprite sheet
        mkSheet(game);

        // make a sprite using my sprite sheet
        var sprite = game.add.sprite(0, 0, 'sheet-block');
        sprite.name = 'bx';

        // seup the data object
        setupDataObject(game, sprite);

    },

    update: function () {

        var sprite = game.world.getByName('bx');

        // calling my step method
        sprite.data.step();

    }

});

game.state.start('basic');