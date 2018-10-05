
// the onBlockInputDown handler
var onBlockInputDown = function (block) {

    block.damage(1);

    block.frame = 5 - Math.floor(block.health / 5 * 5);
    block.frame %= 5;

    // reset the group if they are all dead
    if (block.parent.countLiving() === 0) {
        resetGroup(block.parent);
    }

};

// create the group
var createGroup = function (game) {

    var group = game.add.group(),
    block,
    i = 0,
    count = 25;

    // create children
    while (i < count) {
        block = group.create(0, 0, 'sheet-block', 0);
        i += 1;
    }

    resetGroup(group);

    // attach the OnBlcokInputDown handler for the group
    // with onChildInputDown
    group.onChildInputDown.add(onBlockInputDown);

};

var resetGroup = function (group) {

    group.forEach(function (block) {

        // make sure input is enabled
        block.inputEnabled = true;
        block.revive(5);

    });

    // align children, and move the group
    group.align(5, 5, 34, 34);
    group.x = 32;
    group.y = 32;

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
