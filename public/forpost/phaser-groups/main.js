var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// SpriteDat Class to be used with Sprite data objects
var SpriteDat = function (opt) {

    opt = opt || {};

    // will used the Phaser.Game instance given via the
    // options object, or assume a game variable exists at the global space
    this.game = opt.game || game;

    // ref to the sprite
    this.sprite = opt.sprite || {};

    // default percent done to zero
    this.per = 0;

    // default deltas to zero
    this.deltaX = 0;
    this.deltaY = 0;

    // full reset
    // this will set a new starting position,
    // along with deltas, and all other values
    this.reset();

};

// call to fully reset
SpriteDat.prototype.reset = function () {

    // first starting options
    this.startX = 32 + Math.random() * (game.world.width - 64);
    this.startY = 32 + Math.random() * (game.world.height - 64);

    // new deltas
    this.newDeltas();

};

// new starting position and deltas
SpriteDat.prototype.newDeltas = function () {

    this.startX += this.deltaX * this.per;
    this.startY += this.deltaY * this.per;

    // deltas (amount of change)
    this.deltaX = Math.random() * 50 - 25;
    this.deltaY = Math.random() * 50 - 25;

    // current tick, percent done, and tick count
    this.tick = 0;
    this.per = 0;
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

SpriteDat.prototype.tick = function (per) {};

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
        sprite;

        // using group.create to create sprites for the group
        while (i < len) {

            sprite = blocks.create(0, 0, 'block');
            sprite.name = 'block-' + i;
            sprite.frame = Math.floor(Math.random() * 3);

            sprite.data = new SpriteDat({
                    game: this.game,
                    sprite: sprite
                });

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

                dat.newDeltas();

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

            var curPos = dat.clamped();
            sprite.x = curPos.x;
            sprite.y = curPos.y;

            // step next tick
            if (dat.tick < dat.tickCount) {
                dat.tick += 1;
            }

        });

    }

});

game.state.start('example-1');
