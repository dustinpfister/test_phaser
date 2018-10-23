
var Plugin_runner = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    // Guy SPRITE SHEET
    var createGuySheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 32;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 32, 64);
        game.cache.addSpriteSheet('sheet-guy', null, canvas, 32, 64, 1, 0, 0);
    };

    // GUY SPRITE
    var createGuySprite = function (game) {
        var x = game.world.width / 2,
        y = game.world.height-32,
        guy = game.data.runner.guy = game.add.sprite(x, y, 'sheet-guy');
        guy.anchor.set(0.5, 0.5);

        // physics
        game.physics.enable(guy);
        guy.body.collideWorldBounds = true;
        guy.checkWorldBounds = true;
        //guy.body.velocity.set(100, 50);
        //guy.body.bounce.set(1);
    };

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};
        game.data.runner = {};

        // start or reset Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        createGuySheet(game);

        createGuySprite(game);

    };
	
	plug.update = function(){
		
		
		
	};

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
