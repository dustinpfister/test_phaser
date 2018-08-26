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

// start the nextTick
SpriteDat.prototype.nextTick = function (per) {

    this.per = this.tick / this.tickCount;

    var curPos = this.clamped();

    this.sprite.x = curPos.x;
    this.sprite.y = curPos.y;

    // step next tick
    if (this.tick < this.tickCount) {
        this.tick += 1;
    }

};

// Sprite Group - The name should say it all
var SpriteGroup = function (opt) {

    opt = opt || {};

    // will used the Phaser.Game instance given via the
    // options object, or assume a game variable exists at the global space
    this.game = opt.game || game;

    // the key of the sprite sheet to use
    this.sheetKey = opt.sheetKey || '';

    this.group = this.game.add.group();
    this.group.name = opt.name || '';

    var i = 0,
    len = 32,
    sprite;

    // using group.create to create sprites for the group
    while (i < len) {

        sprite = this.group.create(0, 0, this.sheetKey);
        sprite.name = this.group.name + '-sprite-' + i;
        sprite.frame = Math.floor(Math.random() * 3);

        sprite.data = new SpriteDat({
                game: this.game,
                sprite: sprite
            });

        sprite.x = sprite.data.startX;
        sprite.y = sprite.data.startY;

        i += 1;
    }

};

SpriteGroup.prototype.newDeltas = function () {

    this.group.forEach(function (sprite) {

        // new deltas for all
        sprite.data.newDeltas();

    });

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic-1', {

    create: function () {

        var textGroup = game.add.group(),
        font = {
            fill: 'red',
            font: '15px courier'
        };

        textGroup.name = 'text-group';

        var i = 0,
        len = 5;
        while (i < len) {
            var text = game.add.text(0, i * 15, '', font);

            textGroup.add(text);
            text.name = 'text-' + i;
            i += 1;
        }

        //console.log(game.world.getByName('text-group'));
        //console.log(game.world.getByName('text-group').getByName('text-0'));


        //console.log(others);

    },

    update: function () {

        // I can use getByName to grab a ref to the group
        // if I am using names rather than a global variable
        // or property of an object appended to the state or
        // game objects
        var textGroup = game.world.getByName('text-group'),
        text;

        // If I set names for the children of the group I can use
        // that to get a certain child element
        text = textGroup.getByName('text-0');
        text.text = 'Roll: ' + Math.round(Math.random() * 6);

        // or I can use one of the many Phaser.Group Class Methods
        // such as filter
        textGroup.filter(function (child, index) {

            return index > 0;

        }).list.forEach(function (child, i) {

            var exp = child.data.exp = child.data.exp || 1,
            base = 2 + i;

            child.text = base + '^' + exp + ' = ' + Math.pow(base, exp);

            exp += 1;
            exp %= 25;
            child.data.exp = exp;

        });

    }

});

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

        // making the sprite Group
        var sg = new SpriteGroup({
                game: this.game,
                sheetKey: 'block',
                name: 'blocks'
            });

        // I can set up a timer for new deltas
        // I just need to make sure the context is the
        // instance of SpriteGroup
        game.time.events.loop(2000, sg.newDeltas, sg);

    },

    update: function () {

        // I can also grab the group by using getByName
        var blocks = game.world.getByName('blocks');

        // Group.forEach method example
        blocks.forEach(function (sprite) {

            // call next tick for each sprite in the group
            sprite.data.nextTick();

        });

    }

});

game.state.start('basic-1');
//game.state.start('example-1');
