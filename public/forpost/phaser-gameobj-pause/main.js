
var createSheet = function () {

    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = '#8f0000';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);

    ctx.fill();
    ctx.stroke();

    this.game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 1, 0, 0);

};

// create sprites helper
var createSprites = function () {
    var i = 0,
    count = 10,
    obj;
    // create sprites
    while (i < count) {
        obj = this.game.add.sprite(0, 0, 'sheet');
        obj.name = 'block' + i;
        i += 1;
    }

    obj = game.add.text(game.world.centerX, game.world.centerY, '', {
            fill: 'white'
        });
    obj.name = 'text';
    obj.anchor.set(0.5, 0.5);

};

// move sprites helper
var moveSprites = function () {

    var per = this.game.data.i / 120,
    r = Math.PI * 2 * per,
    i = 0,
    count = 10,
    sprite;

    // move sprites around
    while (i < count) {

        a = Math.PI * 2 * (i / 10);

        sprite = this.game.world.getByName('block' + i);
        sprite.x = game.world.centerX - 16 + Math.cos(r + a) * 50;
        sprite.y = game.world.centerY - 16 + Math.sin(r + a) * 50;
        i += 1;

    }

    this.game.data.i += 1;
    this.game.data.i %= 120;

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {

    create: function () {

        createSheet.call(this);

        game.state.start('demo');

    }

});

game.state.add('demo', {

    create: function () {

        createSprites.call(this);

        this.game.data = {
            i: 0
        };

        this.game.input.onDown.add(function () {

            this.game.paused = !this.game.paused;

        });

    },

    // this will fire once when the game is paused
    paused: function () {

        // display paused message
        this.game.world.getByName('text').text = 'paused';

    },

    // update will run if the game is not paused
    update: function () {

        moveSprites.call(this);

        // display nothing if update is running
        this.game.world.getByName('text').text = '';

    }

});

game.state.start('boot');
