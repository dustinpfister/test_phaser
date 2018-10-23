
var Plugin_runner = function (game, opt) {

    // Guy SPRITE SHEET
    var createGuySheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 32;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 16, 32);
        game.cache.addSpriteSheet('sheet-guy', null, canvas, 16, 32, 1, 0, 0);
    };

    // GUY SPRITE
    var createGuySprite = function (game) {

        var runner = game.data.runner,
        x = game.world.width / 2,
        y = game.world.height - 32,
        guy = runner.guy = game.add.sprite(x, y, 'sheet-guy');
        guy.anchor.set(0.5, 0.5);

        // physics
        game.physics.enable(guy);
        guy.body.collideWorldBounds = true;
        guy.checkWorldBounds = true;
        guy.body.gravity.set(0, 150);

        // making jumps event driven
        runner.cursors.up.onDown.add(guyJump, this);
        game.input.onDown.add(guyJump, this);

    };

    // the player wants to jump
    var guyJump = function () {

        var guy = this.game.data.runner.guy;

        if (guy.body.touching.down || guy.body.onFloor()) {

            guy.body.velocity.y = -175;

        }

    };

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        var runner = game.data.runner = {};

        runner.cursors = game.input.keyboard.createCursorKeys();

        createGuySheet(game);
        createGuySprite(game);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
