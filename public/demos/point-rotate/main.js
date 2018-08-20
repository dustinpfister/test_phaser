
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('static', {

    create: function () {

        // objects for centerPoint, and a thing that
        // I want to rotate around it.
        var thing = {
            x: 100,
            y: 100
        },
        center = {
            x: 0,
            y: 0
        };

        Phaser.Point.rotate(thing, center.x, center.y, 45, true, 100);

        console.log(Math.floor(thing.x), Math.floor(thing.y));

    }

});

game.state.add('proto', {

    create: function () {

        // objects for centerPoint, and a thing that
        // I want to rotate around it.
        var thing = new Phaser.Point(100, 100),
        center = new Phaser.Point(0, 0);

        thing.rotate(center.x, center.y, 45, true, 100);

        console.log(Math.floor(thing.x), Math.floor(thing.y));

    }

});

// make a sprite sheet, and start sprites state
game.state.add('boot', {

    create: function () {

        // sprite sheet generated by canvas
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 32;

        // blue frame
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(0, 0, 32, 32);

        // red frame
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(32, 0, 32, 32);

        game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, 2, 0, 0);

        game.state.start('sprites');

    }

});

game.state.add('sprites', {

    create: function () {

        var sprite,
        x,
        y,
        cx = game.world.centerX,
        cy = game.world.centerY;

        // thing
        x = cx + 100 - 16;
        y = cy - 16;
        sprite = game.add.sprite(x, y, 'sheet-block', 0);
        sprite.name = 'thing';

        // center
        x = cx - 16;
        y = cy - 16;
        sprite = game.add.sprite(x, y, 'sheet-block', 1);
        sprite.name = 'center';

    },

    update: function () {

        var thing = game.world.getByName('thing'),
        center = game.world.getByName('center');
		
		Phaser.Point.rotate(thing,center.x,center.y,1,true,100);

    }

});

game.state.start('boot');
