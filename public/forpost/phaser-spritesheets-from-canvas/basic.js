
// make a canvas that is a sprite sheet of a box with
// a line from it's center outwards.
var mkCanvas = function () {

    var frame = 0,
    maxFrame = 24,
    frameWidth = 64,
    frameHeight = 64,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    // set the native size of the canvas
    canvas.width = frameWidth * maxFrame;
    canvas.height = frameHeight;

    // while the current frame is less than max frames
    while (frame < maxFrame) {

        // figure startx, and percent done
        var sx = frameWidth * frame + 0.5,
        per = frame / maxFrame;

        // draw for current frame
        ctx.strokeStyle = '#00ff00';
        ctx.save();
        ctx.translate(sx + 32, 32);
        ctx.rotate(Math.PI * 2 * per);
        ctx.strokeRect(-16, -16, 32, 32);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 30);
        ctx.stroke();
        ctx.restore();

        // next frame
        frame += 1;

    }

    // add a new sheet to cache
    this.game.cache.addSpriteSheet('sheet-1', null, canvas, frameWidth, frameHeight, maxFrame, 0, 0);

};

game.state.add('basic', {

    create: function () {

        mkCanvas.call(this);

        // create a sprite with the sheet
        var sprite = game.add.sprite(0, 0, 'sheet-1', 0);
        sprite.name = 'sp1';
        sprite.x = game.world.centerX - sprite.width / 2;
        sprite.y = game.world.centerY - sprite.height / 2;

        // create an animation called 'rotate', that uses all the frames (null),\
        // plays at 12 frames per second, and loops
        sprite.animations.add('rotate', null, 12, true);

        // start the animation
        sprite.animations.play('rotate');

    }

});
