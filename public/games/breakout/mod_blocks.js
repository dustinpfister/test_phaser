var Blocks = {

    // this is to be called in the create method of the game state
    setup: function (opt) {

        opt = opt || {};

        this.game = opt.game || game;
        this.sheetKey = 'blocks';
        this.gridWidth = 9;
        this.gridHeight = 4;
        this.blockWidth = 32;
        this.blockHeight = 8;
        this.sx = 16;
        this.sy = 16;

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

            sprite = this.game.add.sprite(0, 0, 'blocks', 0);
            sprite.name = 'block-' + i;
            sprite.x = this.sx + x;
            sprite.y = this.sy + y;

            i += 1;
        }

    }

};
