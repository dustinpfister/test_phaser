
// make a basic block sheet for the given game
var makeBasicBlockSheet = function (game) {

    // basic block sprite sheet, made with canvas
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0, 0, 8, 8);
    this.game.cache.addSpriteSheet('sheet-basic-block', null, canvas, 32, 32, 1, 0, 0);

};

// create blocks
var createBlocks = function (group) {

    var i = 0,
    count = 10,
    groupSize = 64,
    sprite;

    var Block = function (opt) {

        this.sprite = opt.sprite;

        this.newAngle();

    };

    Block.prototype.newAngle = function () {

        this.angle = Math.PI * 2 * Math.random();

    };

    Block.prototype.tick = function () {

        var dx = Math.cos(this.angle) * 1,
        dy = Math.sin(this.angle) * 1; ;
        this.sprite.y += dy;

        // update sprite position relative to group
        this.sprite.x = Phaser.Math.clamp(this.sprite.x + dx, 0, groupSize - 8);
        this.sprite.y = Phaser.Math.clamp(this.sprite.y + dy, 0, groupSize - 8);

        // new angle when bounds of group are hit
        if (this.sprite.x === groupSize - 8 || this.sprite.y === groupSize - 8) {
            this.newAngle();
        }
        if (this.sprite.x === 0 || this.sprite.y === 0) {
            this.newAngle();
        }

    };
    while (i < count) {

        // I can create a block using Group.create
        sprite = group.create(0, 0, 'sheet-basic-block', 0);

        // group.create returns a reference to the sprite
        // that I can then use to add soem values;
        sprite.name = 'block-' + i;
        sprite.x = Math.random() * (groupSize - 8);
        sprite.y = Math.random() * (groupSize - 8);

        sprite.data = new Block({
                sprite: sprite
            });

        i += 1;

    }

};

// make a block Group for the given game
var makeBlockGroup = function (game) {

    var group = game.add.group();
    group.name = 'block-group';
    group.width = 128;
    group.height = 128;

    createBlocks(group);

    group.data = {

        group: group,
        frame: 0,
        maxFrame: 200,
        tick: function () {

            var per = this.frame / this.maxFrame,
            bias = Math.abs(0.5 - per) / 0.5;

            this.group.x = (game.world.width - 64) * bias;

            this.frame += 1;
            this.frame %= this.maxFrame;

        }

    };
    group.x = 0;
    group.y = game.world.height / 2 - 32;

    return group;

};

// the game instance, and state object
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('example', {

    create: function () {

        game.scale.compatibility.scrollTo = false;

        makeBasicBlockSheet(this.game);

        makeBlockGroup(this.game);

    },

    update: function () {

        var blocks = game.world.getByName('block-group');

        // update children
        blocks.forEach(function (block) {
            block.data.tick();
        });

        // update group position
        //blocks.x += 1;
        blocks.data.tick();

    }

});

game.state.start('example');
