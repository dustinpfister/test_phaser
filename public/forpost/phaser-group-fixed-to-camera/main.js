

// add a fixed group helper
var addFixedGroup = function (game, name, offset) {

    var fixed = game.add.group();
    fixed.name = name;
    fixed.fixedToCamera = true;
    fixed.cameraOffset = offset;

    return fixed;

};

// add a text element to a group
var addText = function (game, group, name, x, y) {

    var font = {
        fill: 'white',
        font: '15px courier'
    };

    x = x === undefined ? 5 : x;
    y = y === undefined ? 5 : y;

    var text = game.add.text(x, y, '', font);
    text.name = name;
    group.add(text);

};

// just make a simple box sheet
var mkBoxSheet = function (game, sheetKey) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, 32, 32);
    game.cache.addSpriteSheet(sheetKey, null, canvas, 32, 32, 1, 0, 0);

};

// gen boxes
var genBoxes = function (game, sheekKey, count) {

    var bx = count || 100,
    x,
    y;
    while (bx--) {

        x = Math.random() * (game.world.width - 32);
        y = Math.random() * (game.world.height - 32);

        game.add.sprite(x, y, sheekKey);

    }

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('example', {

    create: function () {

        // SETING WORLD SIZE
        game.world.resize(640, 480);

        // MAKING THWE FIXED GROUP
        var fixed = addFixedGroup(game, 'fixed', new Phaser.Point(0, game.camera.height - 20));

        // ADDING A TEXT ELEMENT TO THE FIXED GROUP
        addText(game, fixed, 'mess');

        // GENERATING SOME BOXES TO THE WORLD
        mkBoxSheet(game, 'sheet-box');
        genBoxes(game, 'sheet-box', 150);

        // SETTING SOME VALUES
        // that will be used in the update method
        var data = game.data = game.data || {};

        data.frame = 0;
        data.maxFrame = 200;
        data.dist = game.world.height / 4;

    },

    update: function () {

        var per = game.data.frame / game.data.maxFrame,
        fixed = game.world.getByName('fixed'),
        angle = Math.PI * 2 * per,
        x,
        y;

        // updating position of the camera
        x = Math.floor((game.world.width / 2) - (game.camera.width / 2) + Math.cos(angle) * game.data.dist);
        y = Math.floor((game.world.height / 2) - (game.camera.height / 2) + Math.sin(angle) * game.data.dist);
        game.camera.setPosition(x, y);

        // displaying current camera position in text object
        // that is in the fixed group
        fixed.getByName('mess').text = 'fixed info: (' + x + ',' + y + ') ';

        // step frame
        game.data.frame += 1;
        game.data.frame %= game.data.maxFrame;

    }

});

game.state.start('example');
