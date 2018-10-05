
var onBlockInputDown = function (block) {

    block.damage(1);

    block.frame = 4 - Math.floor(block.health / 4 * 4);

};

var createGroup = function (game) {

    var group = game.add.group(),
    block,
    i,
    count = 25;

    i = 0;
    while (i < count) {
        // create children
        block = group.create(0, 0, 'sheet-block', 0);

        // make sure input is enabled
        block.inputEnabled = true;
        block.health = 5;

        i += 1;

    }

    group.align(5, 5, 34, 34);
    group.x = 32;
    group.y = 32;

    // attach the OnBlcokInputDown handler for the group
    // with onChildInputDown
    group.onChildInputDown.add(onBlockInputDown);

};

// make a sprite sheet
var mkSheet = function (game) {

    var states = 5,
    i,
    val,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32 * states;
    canvas.height = 32;

    i = 0;
    while (i < states) {
        val = 255 - Math.floor(200 * i / states);
        ctx.fillStyle = 'rgba(0,0,' + val + ',1)';
        ctx.fillRect(32 * i, 0, 32, 32);
        i += 1;
    }

    game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, states, 0, 0);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        mkSheet(game);

        createGroup(game);

    }

});

game.state.start('demo');
