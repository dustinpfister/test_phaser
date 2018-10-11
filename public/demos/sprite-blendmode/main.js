
var guyData = ['11111', '12121', '11111', '33333', ' 3 3 ', ' 3 3 ', ' 3 3 ', ' 4 4 '],
background = ['11111', '10001', '10001', '10001', '11111', ]

var createTexture = function (game, data, key, done) {

    //var key = 'guy-blue',
    //data = ,
    var pxWidth = 8,
    pxHeight = 8,
    palletIndex = 0;

    done = done || function () {};

    // pallet 0 for 'blue guy'
    //game.create.palettes[palletIndex] = ['black', 'orange', 'white', 'blue', 'pink'];

    game.create.texture(key, data, pxWidth, pxHeight, palletIndex, true, done);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createTexture(game, background, 'background', function () {

            var sprite = game.add.sprite(32, 32, 'background');
            //sprite.blendMode = PIXI.blendModes.ADD;

            createTexture(game, guyData, 'guy-blue',function () {

                var sprite = game.add.sprite(32, 32, 'guy-blue');
                sprite.blendMode = PIXI.blendModes.ADD;

            });

        });

    }

});

console.log(PIXI.blendModes);

game.state.start('boot');
