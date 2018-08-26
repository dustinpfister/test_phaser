// Enemy Class to be used With the Wave Class
var Enemy = function (opt) {

    opt = opt || {};

    this.game = opt.game || game;

    // ref to the sprite to use
    this.sprite = opt.sprite || {};

    // default deltas to zero

    this.startPos = opt.startPos || new Phaser.Point(0, 0);
    this.targetPos = opt.startPos || new Phaser.Point(0, 0);

    this.overFrames = opt.overFrames || 50;
    this.frame = 0;
    this.per = 0;

    this.sprite.x = this.startPos.x;
    this.sprite.y = this.startPos.y;

};

// what to do on each tick
Enemy.prototype.tick = function () {

    this.per = this.frame / this.overFrames;

	var angle = this.startPos.angle(this.targetPos.x,this.targetPos.y),
	dist = this.startPos.distnace(this.targetPos);

    this.sprite.x = Math.cos(angle)

    this.frame += 1;

}
