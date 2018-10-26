
var Plugin_missiles = function (game, opt) {

    var Missile = function (sprite) {

        this.sprite = sprite;
        this.set('a', 0, 0, 320, 240);

    };

    // set a missle to player 'p' or ai 'a', and start and target positions
    Missile.prototype.set = function (faction, sx, sy, tx, ty) {

        var sprite = this.sprite;

        this.faction = faction || 'a';
        //this.sx = sx === undefined ? 0 : sx;
        //this.sy = sy === undefined ? 0 : sy;
        //this.tx = tx === undefined ? 320 : tx;
        //this.ty = ty === undefined ? 240 : ty;

        this.pointStart = new Phaser.Point(sx, sy);
        this.pointTarget = new Phaser.Point(tx, ty);

        this.angle = this.pointStart.angle(this.pointTarget);
        this.distance = this.pointStart.distance(this.pointTarget);

        this.ticks = 100;
        this.currentTick = 0;
        //this.distancePerTick = this.distance / this.ticks;

        this.launched = false;
        this.explode = false;

        sprite.x = this.pointStart.x;
        sprite.y = this.pointTarget.y;
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

    Missile.prototype.step = function () {

        var sprite = this.sprite,
        per;

        if (this.launched && !this.explode) {
            this.currentTick += 1;
            if (this.currentTick >= this.ticks) {
                this.explode = true;
            }
        }

        per = this.currentTick / this.ticks;

        sprite.x = this.pointStart.x + Math.cos(this.angle) * (this.distance * per);
        sprite.y = this.pointStart.y + Math.sin(this.angle) * (this.distance * per);

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

        data.missiles.children[0].data.launch();

    };

    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        // create or append game.data
        game.data = game.data || {};

        createMissilePool(game);

    };

    plug.update = function () {

        game.data.missiles.forEachAlive(function (missile) {

            missile.data.step();

        });

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
