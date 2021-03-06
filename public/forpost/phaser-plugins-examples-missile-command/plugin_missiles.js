/*

 * Adds a Missile Class
 * Adds a Missile Group Class

 */

var Plugin_missiles = function (game, opt) {

    // create or use game.data
    var data = game.data = game.data || {};

    var createMissileSheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 8;
        canvas.height = 8;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 8, 8);
        game.cache.addSpriteSheet('sheet-missile', null, canvas, 8, 8, 1, 0, 0);
    };

    // MISSILE CLASS
    data.Missile = function (sprite) {

        this.sprite = sprite;
        this.set('a', 0, 0, 300, 220);

    };

    // set a missile to player 'p' or ai 'a', and start and target positions
    data.Missile.prototype.set = function (faction, sx, sy, tx, ty) {

        var sprite = this.sprite;

        this.faction = faction || 'a';

        this.pointStart = new Phaser.Point(sx, sy);
        this.pointTarget = new Phaser.Point(tx, ty);

        this.angle = this.pointStart.angle(this.pointTarget);
        this.distance = this.pointStart.distance(this.pointTarget);

        // time and flight time
        this.launched = false;
        this.time = 0;
        this.flightTime = 5 * 1000;

        // explode
        this.explode = false;
        this.blastRadius = 32;
        this.blastTime = 0;
        this.blastTimeTotal = 3000;

        sprite.x = this.pointStart.x;
        sprite.y = this.pointTarget.y;
        sprite.anchor.set(0.5, 0.5);

        // a set missile starts out killed
        // Missile.launch must be called to revive
        sprite.kill();

    };

    // launch a set missile
    data.Missile.prototype.launch = function () {

        this.launched = true;
        this.explode = false;
        this.time = 0;
        this.bastTime = 0;
        this.sprite.revive();

    };

    data.Missile.prototype.update = function () {

        var sprite = this.sprite,
        per;

        // if the missile has launched, but has not yet exploded
        if (this.launched && !this.explode) {
            this.time += sprite.game.time.elapsed;
            if (this.time >= this.flightTime) {
                this.time = this.flightTime;
                this.explode = true;
            }
        }

        // if the missile exploded
        if (this.explode) {
            this.blastTime += sprite.game.time.elapsed;
            if (this.blastTime >= this.blastTimeTotal) {
                this.blastTime = this.blastTimeTotal
                    sprite.kill();
            }
        }

        // always set position based on current time over flight time
        per = this.time / this.flightTime;
        sprite.x = this.pointStart.x + Math.cos(this.angle) * (this.distance * per);
        sprite.y = this.pointStart.y + Math.sin(this.angle) * (this.distance * per);

    };

    // CREATE MISSILE POOL
    var createMissilePool = function (game) {

        var data = game.data,
        i = 0,
        missile
        len = 10;

        data.missiles.group = game.add.group();
        while (i < len) {
            sprite = game.make.sprite(0, 0, '_missing'); //'sheet-missile');
            sprite.data = new data.Missile(sprite);
            data.missiles.group.add(sprite);
            i += 1;
        }

    };

    // PLUGIN OBJECT
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {

        game.data.missiles = {

            getExploded: function (faction) {

                faction = faction || '*';

                var missiles = game.data.missiles.group;

                return missiles.filter(function (missile) {

                    if (faction === '*') {

                        return missile.data.explode;

                    }

                    return missile.data.explode && missile.data.faction === faction;

                });

            }

        };

        createMissileSheet(game);
        createMissilePool(game);

    };

    plug.update = function () {

        // step all alive missiles
        game.data.missiles.group.forEachAlive(function (missile) {
            missile.data.update();
        });

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
