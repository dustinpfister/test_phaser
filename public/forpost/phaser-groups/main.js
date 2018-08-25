var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// SpriteDat Class to be used with Sprite dataObjects
var SpriteDat = function (opt) {

    opt = opt || {};

    this.reset();

    // will used the Phaser.Game instance given via the
    // options object, or assume a game variable exists at the global space
    this.game = opt.game || game;

};

SpriteDat.prototype.reset = function () {

    // first starting options
    this.startX = 32 + Math.random() * (game.world.width - 64);
    this.startY = 32 + Math.random() * (game.world.height - 64);

    // new deltas
    this.newDeltas();

};

// new starting position and deltas
SpriteDat.prototype.newDeltas = function () {

    // deltas (amount of change)
    this.deltaX = Math.random() * 50 - 25;
    this.deltaY = Math.random() * 50 - 25;

    // current tick, percent done, and tick count
    this.tick = 0;
    this.tickCount = Math.floor(10 + 40 * Math.random());
};

// return a
SpriteDat.prototype.clamped = function (per) {

    per = per === undefined ? this.per : per;

    return {

        x: Phaser.Math.wrap(this.startX + this.deltaX * per, -32, game.world.width + 32),
        y: Phaser.Math.wrap(this.startY + this.deltaY * per, -32, game.world.height + 32)

    }

};

game.state.add('example-1', {

    create: function () {

        // green block sheet
        sheetFromCanvas({
            name: 'block',
            game: game,
            frames: 3,
            frameWidth: 16,
            frameHeight: 16,
            forFrame: function (ctx) {
                var colors = ['red', 'white', 'blue'];
                ctx.fillStyle = colors[this.f];
                ctx.lineWidth = 3;
                ctx.fillRect(0, 0, 32, 32);
            }
        });

        // making a group
        var blocks = game.add.group();
        blocks.name = 'blocks';

        var i = 0,
        len = 32,
        sprite,
        x,
        y;

        // using group.create to create sprites for the group
        while (i < len) {

            //x = 32 + Math.random() * (game.world.width - 64);
            //y = 32 + Math.random() * (game.world.height - 64);

            sprite = blocks.create(0, 0, 'block');
            sprite.name = 'block-' + i;
            sprite.frame = Math.floor(Math.random() * 3);

            sprite.data = new SpriteDat();

            /*
            sprite.data = {
            startX: x,
            startY: y,
            deltaX: 0,
            deltaY: 0,
            tick: 0,
            per: 0,
            tickCount: 10,

            clamped: function (per) {

            per = per === undefined ? this.per : per;

            return {

            x: Phaser.Math.wrap(this.startX + this.deltaX * per, -32, game.world.width + 32),
            y: Phaser.Math.wrap(this.startY + this.deltaY * per, -32, game.world.height + 32)

            }

            },

            onTick: function () {}

            };
             */
            sprite.x = sprite.data.startX;
            sprite.y = sprite.data.startY;

            i += 1;
        }

        // every second
        game.time.events.loop(2000, function () {

            // run through each sprite
            blocks.forEach(function (sprite) {

                var dat = sprite.data,
                newPos = dat.clamped(1);

                // new start pos is now the old startPos plus full deltas
                dat.startX = newPos.x;
                dat.startY = newPos.y;

                dat.newDeltas();

                /*
                dat.tick = 0;
                dat.tickCount = Math.floor(10 + 40 * Math.random());
                dat.deltaX = Math.random() * 50 - 25;
                dat.deltaY = Math.random() * 50 - 25;
                 */
            });

        });

    },

    update: function () {

        // grab blocks using getByName
        var blocks = game.world.getByName('blocks');

        // Group.forEach method example
        blocks.forEach(function (sprite) {

            // get ref to data object,
            // and find current percentage done
            // of transition from start point to
            // start point plus delta
            var dat = sprite.data;

            dat.per = dat.tick / dat.tickCount;

            // sprite position set from starting point
            // plus current percentage of deltas
            sprite.x = Phaser.Math.wrap(dat.startX + dat.deltaX * dat.per, -32, game.world.width + 32);
            sprite.y = Phaser.Math.wrap(dat.startY + dat.deltaY * dat.per, -32, game.world.height + 32);

            // step next tick
            if (dat.tick < dat.tickCount) {
                dat.tick += 1;
            }

        });

    }

});

game.state.start('example-1');
