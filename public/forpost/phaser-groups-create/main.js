
// make a basic block sheet for the given game
var makeBasicBlockSheet = function (game) {

    // basic block sprite sheet, made with canvas
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0, 0, 32, 32);
    this.game.cache.addSpriteSheet('sheet-basic-block', null, canvas, 32, 32, 1, 0, 0);

};

// create blocks
var createBlocks = function (group) {

    var i = 0,
    count = 10,
    sprite;
    while (i < count) {

        sprite = group.create(0, 0, 'sheet-basic-block', 0);
        sprite.name = 'block-' + i;

        sprite.x = Math.random() * (game.world.width - 32);
        sprite.y = Math.random() * (game.world.height - 32);

        i += 1;

    }

};

// make a block Group for the given game
var makeBlockGroup = function (game) {

    var group = game.add.group();
    group.name = 'block-group';

    createBlocks(group);

};

//
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('example', {

    create: function () {

        makeBasicBlockSheet(this.game);

        makeBlockGroup(this.game);

    }

});

game.state.start('example');
