var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.global = {

    per: 0,
    r: 0,
    bias: 0,
    frame: 0,
    maxFrame: 150,
    step: function () {

        this.frame += 1;
        this.frame %= this.maxFrame;

        this.per = this.frame / this.maxFrame;
        this.r = Math.PI * 2 * this.per;
        this.bias = Math.abs(this.per - 0.5) / 0.5;

    }

};
