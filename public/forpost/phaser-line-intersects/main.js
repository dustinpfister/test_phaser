var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('line', {

    create: function () {

        var line1 = new Phaser.Line(10, 50, 10, 100),
        line2 = new Phaser.Line(20, 75, 8, 75),

        intersect = Phaser.Line.intersects(line1, line2);

        console.log(intersect.x, intersect.y); // 10 75

    }

});

game.state.add('rect', {

    create: function () {

        var gfx = game.add.graphics(32, 32);
        gfx.beginFill(0xff0000);
        gfx.drawRect(0, 0, 32, 32);

        console.log(gfx.x, gfx.y, gfx.right, gfx.bottom); // 32 32 64 64

        var line = new Phaser.Line(128, 96, 0, 0);

        console.log(Phaser.Line.intersectsRectangle(line, gfx)); // true

    }

});

game.state.start('rect');
