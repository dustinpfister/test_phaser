var createTexture = function (game, done) {

    var key = 'guy-blue',
    data = ['11111', '12121', '11111', '33333', ' 3 3 ', ' 3 3 ', ' 3 3 ', ' 4 4 '],
    pxWidth = 8,
    pxHeight = 8,
    palletIndex = 0;

    done = done || function () {};

    // pallet 0 for 'blue guy'
    game.create.palettes[palletIndex] = ['black', 'orange', 'white', 'blue', 'pink'];

    game.create.texture(key, data, pxWidth, pxHeight, palletIndex, true, done);

};


var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createTexture(game, function () {

            var sprite = game.add.sprite(32, 32, 'guy-blue');
			sprite.blendMode = PIXI.blendModes.ADD;

        });


    }

});


console.log(PIXI.blendModes);

game.state.start('boot');