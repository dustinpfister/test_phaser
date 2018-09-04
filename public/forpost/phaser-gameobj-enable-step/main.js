
// make a basic sprite sheet
var makeCircleSheet = function (game) {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);
    ctx.stroke();
    this.game.cache.addSpriteSheet('sheet-circles', null, canvas, 32, 32, 1, 0, 0);
    document.body.appendChild(canvas);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.enableStep();

game.state.add('demo', {

    create: function () {

        makeCircleSheet(this.game);

        this.game.input.onDown.add(function () {

            game.step();

        });

    },

    update: function () {

        console.log('tick');

    }

});

game.state.start('demo');
