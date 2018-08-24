var Blocks = {

    // this is to be called in the create method of the game state
    setup: function (opt) {

        opt = opt || {};

        this.game = opt.game || game;
        this.sheetKey = 'blocks';
        this.width = 4;
        this.height = 4;
        this.sx = 16;
        this.sy = 16;

        this.createBlockPool(this.sheetKey, this.width * this.height);

    },

    // create a block pool with the given sheet key
    createBlockPool: function (sheetKey, count) {

        var i = 0;
        while (i < count) {

            this.game.add.sprite(0, 0, 'blocks', 0);

            i += 1;
        }

    }

};
