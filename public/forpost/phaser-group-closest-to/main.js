
var mkSheet = function (game) {

    // basic block sprite sheet, made with canvas
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 96;

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
    ctx.strokeRect(65, 1, 31, 31);

    game.cache.addSpriteSheet('sheet-blocks', null, canvas, 32, 32, 3, 0, 0);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        mkSheet(game);
		
		var sprite = game.add.sprite(0,0,'sheet-blocks',0);

    },

    update: function () {}

});

game.state.start('boot');
