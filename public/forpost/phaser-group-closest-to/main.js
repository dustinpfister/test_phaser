
// show the closest enemy in the enemies group
var showClosest = function (game) {

    var enemies = game.data.enemies,
    closest = enemies.getClosestTo(game.data.player);

    // set to selected frame
    closest.frame = 2;

};

var mkSheet = function (game) {

    // basic block sprite sheet, made with canvas
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 96;
    canvas.height = 32;

    // player block
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 32, 32);

    // enemy block
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(32, 0, 32, 32);

    // enemy selected block
    ctx.fillStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.fillRect(64, 0, 32, 32);
    ctx.strokeRect(65.5, 1.5, 29, 29);

    game.cache.addSpriteSheet('sheet-blocks', null, canvas, 32, 32, 3, 0, 0);

};

var createEnemies = function (game) {

    var enemies = game.data.enemies = game.add.group();
    var i = 0,
    enemy,
    len = 15;
    while (i < len) {
        enemies.create(0, 0, 'sheet-blocks', 1);
        i += 1;
    }

    enemies.scatter(new Phaser.Rectangle(0, 0, game.world.width - 32, game.world.height - 32));

};

var createPlayer = function () {

    var player = game.data.player = game.add.sprite(0, 0, 'sheet-blocks', 0);
    player.x = game.world.centerX - 16;
    player.y = game.world.centerY - 16;

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        game.data = game.data || {};

        mkSheet(game);

        createEnemies(game);

        createPlayer(game);

        showClosest(game);

    }

});

game.state.start('boot');
