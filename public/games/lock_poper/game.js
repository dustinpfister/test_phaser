// the actual Game state once everything is loaded
var Game = (function () {

    var pt,
    i = 0,
    maxI = 70,
    tickRate = 12,
    lastTick = new Date();

    return {

        create : function () {

            //game.add.sprite(0, 0, 'phaser');

            pt = game.add.graphics(0, 0);
            pt.beginFill(0x00ff00);
            pt.drawCircle(0, 0, game.world.width / 16);
            pt.endFill();

        },

        update : function () {

            var r = Math.PI * 2 / maxI * i,
            now = new Date();

            pt.x = game.world.centerX + Math.cos(r) * (game.world.width / 4);
            pt.y = game.world.centerY + Math.sin(r) * (game.world.width / 4);

            if (now - lastTick >= tickRate) {
                i += 1;
                i = i % maxI;
                lastTick = now;
            }

        }

    };

}
    ());
