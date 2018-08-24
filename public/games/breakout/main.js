// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
game.global = {

    frameData: {}

};

game.state.add('boot', {

    create: function () {

        // scale settings
        var scale = this.game.scale;

        scale.compatibility.scrollTo = false;
        scale.pageAlignHorizontally = true;
        scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        scale.width = document.getElementById(game.parent).scrollWidth;
        scale.height = document.getElementById(game.parent).scrollHeight;

        // disable antialias
        game.antialias = false;

        game.state.start('mksheets');

    }

});

// sheet from canvas helper
var sheetFromCanvas = function (opt) {

    var f,
    fd, // frame data
    sx,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    opt = opt || {};
    opt.name = opt.name || 'sheet';
    opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.forFrame = opt.forFrame || function () {};
    opt.game = opt.game || {};

    canvas.width = opt.frameWidth * opt.frames;
    canvas.height = opt.frameHeight;

    // to store frame data
    opt.game.global = opt.game.global || {};
    opt.game.global.frameData = opt.game.frameData || {};

    fd = opt.game.global.frameData[opt.name] = [];

    f = 0;
    // for each frame
    while (f < opt.frames) {

        // find current percent
        per = f / opt.frames;
        sx = opt.frameWidth * f + 0.5;

        // push frame index to frame data
        fd.push(f);

        // call forFrame with api set to the value
        // of 'this' inside the forFrame function
        ctx.save();
        ctx.translate(sx, 0);
        opt.forFrame.call({
            f: f,
            p: Math.PI,
            p2: Math.PI * 2,
            hw: opt.frameWidth / 2,
            hh: opt.frameHeight / 2,
            sx: sx,
            per: per,
            canvas: canvas,
            ctx: ctx
        }, ctx);
        ctx.restore();

        // next frame
        f += 1;

    }

    // add a new sheet to cache if we have a game
    if (opt.game) {

        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);

    }

    //document.body.appendChild(canvas);

    // return the canvas
    return canvas;

};

game.state.add('mksheets', {

    create: function () {

        // ball sheet
        sheetFromCanvas({
            name: 'ball',
            game: game,
            frames: 10,
            frameWidth: 12,
            frameHeight: 12,
            forFrame: function (ctx) {

                var x,
                y,
                lw = 2,
                hlw = lw / 2,
                r;

                ctx.fillStyle = '#00a0f0';
                ctx.strokeStyle = '#c0c0c0';
                ctx.lineWidth = lw;
                //ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // outer circle
                ctx.beginPath();
                ctx.arc(this.hw, this.hh, this.hw - hlw, 0, this.p2);
                ctx.closePath();
                ctx.fill();
                //ctx.stroke();

                // inner circle
                ctx.fillStyle = '#c0c0c0';
                ctx.beginPath();

                r = Math.PI * 2 * this.per;
                x = Math.cos(r) * (this.hw - lw * 2) + this.hw;
                y = Math.sin(r) * (this.hw - lw * 2) + this.hh;

                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill()

            }

        });

        // paddle sheet
        sheetFromCanvas({
            name: 'paddle',
            game: game,
            frames: 1,
            frameWidth: 128,
            frameHeight: 8,
            forFrame: function (ctx) {

                ctx.fillStyle = '#0000ff';
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            }

        });

        game.state.start('game');

    }

});

game.state.add('game', {

    create: function () {

        var ball = game.add.sprite(0, 0, 'ball', 0),
        fd = game.global.frameData['ball'];

        ball.name = 'ball';
        ball.animations.add('roll', fd, 20, true);
        ball.animations.play('roll');

        // paddle
        var paddle = game.add.sprite(0, 0, 'paddle', 0);
        paddle.name = 'paddle';
        paddle.x = game.world.centerX;
        paddle.y = game.world.height - 16;
        paddle.anchor.set(0.5, 1);
        paddle.data = {
            velocity: 0,
            delta: 0
        };

        // keyboard
        var right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        right.onDown.add(function (a) {

            console.log('hello');
            console.log(a);
            paddle.body.drag = new Phaser.Point(100, 100);

            paddle.body.velocity.set(150, 0)

        }, this);
        right.onUp.add(function () {


            paddle.body.velocity.set(0, 0)

        }, this);

        var left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        left.onDown.add(function () {


            paddle.body.velocity.set(-150, 0)

        }, this);
        left.onUp.add(function () {


            paddle.body.velocity.set(0, 0)

        }, this);

        // physics

        // will be using Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable([ball, paddle]);

        ball.body.collideWorldBounds = true;
        ball.body.bounce.set(1);
        ball.body.velocity.set(150, 150);

        paddle.body.immovable = true;
        //paddle.body.drag = new Phaser.Point(1, 1);
        //paddle.body.friction = new Phaser.Point(1, 1);
        //paddle.body.collideWorldBounds = true;
        //paddle.body.bounce.set(1);
        //paddle.body.velocity.set(0, 0);

        ball.body.onCollide = new Phaser.Signal();

        ball.body.onCollide.add(function () {

            console.log('foo');

        })

        //game.physics.enable(paddle, Phaser.Physics.ARCADE);
        //paddle.body.bounce.set(1);
        //paddle.body.velocity.set(150, 150);
        //paddle.body.immovable = true;

    },

    update: function () {

        var ball = game.world.getByName('ball'),
        paddle = game.world.getByName('paddle');

        paddle.data.velocity += paddle.data.delta;
        paddle.data.velocity = Phaser.Math.clamp(paddle.data.velocity, -150, 150);

        //paddle.body.velocity.set(paddle.data.velocity, 0);

        game.physics.arcade.collide(ball, paddle);

    }

});

game.state.start('boot');
