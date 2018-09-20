
var mkSheet = function () {

    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 96;
    canvas.height = 32;

    // green block
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, 0, 32, 32);

    // red block
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(32, 0, 32, 32);

    // blue block
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(64, 0, 32, 32);

    // add a single sheet to cache
    game.cache.addSpriteSheet('sheet-blocks', null, canvas, 32, 32, 3, 0, 0);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        // make the sheet
        mkSheet(game);

        // CREATE A TILEMAP
        var map = this.map = game.add.tilemap(null, 32, 32, 6, 6);

        // ADD A SPRITE SHEET
        map.addTilesetImage('sheet-blocks');

        // CREATE A LAYER
        var layer = map.create('my-layer', 6, 6, 32, 32);

        // a layer is like a sprite
        // many of the properties and methods are the same
        layer.inputEnabled = true;
        layer.fixedToCamera = false;
        layer.x = 32;
        layer.y = 32;
        layer.events.onInputDown.add(function (layer, pt) {
            var x = Math.floor((pt.x - layer.x) / 32),
            y = Math.floor((pt.y - layer.y) / 32),
            tile = map.getTile(x, y);
            tile.index += 1;
            tile.index = tile.index % 3;
            map.putTile(tile.index, x, y);
        });

        // SET INDEX DATA
        // map.ForEach can be used to set all index values in
        // an area
        map.forEach(function (tile) {

            tile.index = Math.floor(Math.random() * 2);

        }, this, 0, 0, 6, 6);

        // map.putTile can be used to set a single index
        map.putTile(2, 0, 0);

    },

    update: function () {}

});

game.state.start('boot');
