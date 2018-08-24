var Blocks = {

    blocks: [],

    // this is to be called in the create method of the game state
    setup: function (opt) {

        opt = opt || {};

        this.game = opt.game || game;
        this.sheetKey = 'blocks';
        this.gridWidth = 8;
        this.gridHeight = 4;
        this.blockWidth = 32;
        this.blockHeight = 8;
        this.sx = 32;
        this.sy = 32;

        this.blocks = [];

        this.createBlockPool(this.sheetKey, this.gridWidth * this.gridHeight);

    },

    // create a block pool with the given sheet key
    createBlockPool: function (sheetKey, count) {

        var i = 0,
        x,
        y,
        sprite;

        // for total block count
        while (i < count) {

            x = i % this.gridWidth * this.blockWidth;
            y = Math.floor(i / this.gridWidth) * this.blockHeight;

            // create sprite for block
            sprite = this.game.add.sprite(0, 0, 'blocks', 2);
            sprite.name = 'block-' + i;
            sprite.x = this.sx + x;
            sprite.y = this.sy + y;

            // physics
            game.physics.enable(sprite);
            sprite.body.immovable = true;

            sprite.body.onCollide = new Phaser.Signal();
            sprite.body.onCollide.add(this.onCollide, sprite);

            // push to blocks array
            this.blocks.push(sprite);

            i += 1;
        }

        this.setupDataObjects();

    },

    // set up data block objects
    setupDataObjects: function () {

        var count = this.blocks.length,
        sprite,
        i = 0;
        while (i < count) {

            sprite = this.blocks[i];

            sprite.data.hp = 1;
            sprite.frame = 0;
            sprite.body.enable = true;
            sprite.alpha = 1

            i += 1;

        }

    },

    onCollide: function () {

        // the block sprite should be this
        var sprite = this;

        sprite.data.hp -= 1;

        if (sprite.data.hp <= 0) {

            sprite.data.hp = 0;
            sprite.body.enable = false;
            sprite.alpha = 0

        } else {

            sprite.frame = sprite.data.hp - 1;

        }

    }

};
