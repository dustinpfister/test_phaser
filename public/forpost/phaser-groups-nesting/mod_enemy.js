// Enemy Class to be used With the Wave Class
var Enemy = function (opt) {

    opt = opt || {};

    this.game = opt.game || game;

    // ref to the sprite to use
    this.sprite = opt.sprite || {};

    // default deltas to zero

    this.startPost = opt.startPos || new Phaser.Point(0, 0);
    this.targetPost = opt.startPos || new Phaser.Point(0, 0);

    this.overFrames = opt.overFrames || 50;
    this.frame = 0;

};
