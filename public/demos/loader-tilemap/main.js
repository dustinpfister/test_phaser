var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    preload: function () {

        game.load.tilemap('map-blocks', '/demos/loader-tilemap/first-map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('image-blocks', '/img/sheet_blocks.png');

    },

    create: function () {

        var map = game.add.tilemap('map-blocks');

        map.addTilesetImage('blocks', 'image-blocks');

        var layer = map.createLayer('stage1');
		
		layer.resizeWorld();

    },

    update: function () {}

});

game.state.start('boot');
