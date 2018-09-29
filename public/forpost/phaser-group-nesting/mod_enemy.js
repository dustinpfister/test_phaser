// Enemy Class to be used With the Wave Class
var Enemy = function (opt) {

    opt = opt || {};

    this.game = opt.game || game;

    // ref to the sprite to use
    this.sprite = opt.sprite || {};

    // default deltas to zero

    this.startPos = opt.startPos || new Phaser.Point(0, 0);
    this.targetPos = opt.targetPos || new Phaser.Point(0, 0);

    this.overFrames = opt.overFrames || 50 + Math.floor(Math.random() * 100);
    this.frame = 0;
    this.per = 0;
    this.active = false;

    this.sprite.x = this.startPos.x;
    this.sprite.y = this.startPos.y;

};

// what to do on each tick
Enemy.prototype.tick = function () {

    // if the enemy is set active
    if (this.active) {

        this.per = this.frame / this.overFrames;

        var angle = Phaser.Point.angle(this.startPos, this.targetPos),
        dist = Phaser.Point.distance(this.startPos, this.targetPos);

        this.sprite.x = this.startPos.x + Math.cos(angle) * dist * this.per;
        this.sprite.y = this.startPos.y - Math.sin(angle) * dist * this.per;

        this.frame += 1;

    }

    // make sure frame does not exceed overFrame
    if (this.frame >= this.overFrames) {

        this.frame = this.overFrames;

    }

}
