
var Plugin_missiles = function (game, opt) {

    var Missile = function (sprite) {

        this.sprite = sprite;
        this.set('a', 0, 0, 10, 10);

    };

    // set a missle to player 'p' or ai 'a', and start and target positions
    Missile.prototype.set = function (faction, sx, sy, tx, ty) {

        var sprite = this.sprite;

        this.faction = faction || 'a';
        this.sx = sx === undefined ? 0 : sx;
        this.sy = sy === undefined ? 0 : sy;
        this.tx = tx === undefined ? 100 : tx;
        this.ty = ty === undefined ? 100 : ty;

        this.launched = false;

        sprite.x = this.sx;
        sprite.y = this.sy;
        sprite.anchor.set(0.5, 0.5);

        // a set missile starts out killed
        // Missle.launch must be called to revive
        sprite.kill();

    };

    // launch a set missile
    Missile.prototype.launch = function () {

        this.launched = true;
        this.sprite.revive();

    };

    var createMissilePool = function (game) {

        var data = game.data,
        i = 0,
        missile
        len = 10;

        data.missiles = game.add.group();
        while (i < len) {

            sprite = game.make.sprite(0, 0, 'sheet-missile');

            sprite.data = new Missile(sprite);

            data.missiles.add(sprite);

            i += 1;

        }

    };

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        createMissilePool(game);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
