console.log('main.js');
var bx, i = 0, maxI = 100;
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        create : function () {

            console.log(game.add);

            bx = game.add.graphics(0, 0);

            bx.beginFill(0x00ff00);
            bx.drawCircle(50, 50, 100);
            bx.endFill();

        },

        update : function () {

            var r = Math.PI * 2 / maxI * i;

            bx.x = game.world.centerX - 50 + Math.cos(r) * 50;
            bx.y = game.world.centerY - 50 + Math.sin(r) * 50;

            i += 1;

            if (i === maxI) {

                i = 0;

            }

        }

    });
