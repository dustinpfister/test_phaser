
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // load the sprite sheet
        preload : function () {

            game.load.spritesheet('cucco', '/img/cuccos_zelda4.png', 20, 20, 10);

        },

        // create the sprite
        create : function () {

            var sprite = game.add.sprite(160 - 40, 120 - 40, 'cucco');

            sprite.width = 80;
            sprite.height = 80;

        },

        update : (function () {

            var f = 0,
            lt = new Date(),
            rate = 1000 / 12;

            return function () {

                var sprite = game.world.children[0],
                pt = game.input.activePointer;

                if (pt.isDown) {

                    var r = Math.atan2(pt.y - sprite.y, pt.x - sprite.x);

                    sprite.x += Math.cos(r);
                    sprite.y += Math.sin(r);

                    sprite.frame = f + 2;

                    if (new Date() - lt > rate) {

                        f += 1;
                        if (f == 2) {

                            f = 0;

                        }

                        lt = new Date();

                    }

                } else {

                    // chicken is at rest state
                    sprite.frame = 0;

                }

            };

        }
            ())

    }, false, false);
