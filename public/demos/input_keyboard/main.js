
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

            console.log('keyboard');
            console.log(Phaser.Keyboard.LEFT);

            /*
            game.input.keyboard.onPressCallback = function(key,e){

            if(key === 'a'){

            sprite.x -= 1;

            }

            };
             */

        },

        update : (function () {

            var f = 0,
            lt = new Date(),
            rate = 1000 / 12,

            // walk animation
            walk = function (sprite) {

                sprite.frame = f + 2;

                if (new Date() - lt > rate) {

                    f += 1;
                    if (f == 2) {

                        f = 0;

                    }

                    lt = new Date();

                }

            };

            console.log('yeah');
            console.log('S'.charCodeAt(0));

            return function () {

                var sprite = game.world.children[0],
                k = game.input.keyboard,
                w = false;
                //pt = game.input.activePointer;

                // A
                if (k.isDown(65)) {

                    sprite.x -= 1;
                    w = true;

                }

                // D
                if (k.isDown(68)) {

                    sprite.x += 1;
                    w = true;
                }

                // W
                if (k.isDown(87)) {

                    sprite.y -= 1;
                    w = true;
                }

                // S
                if (k.isDown(83)) {

                    sprite.y += 1;
                    w = true;

                }

                // default sprite to frame 0
                sprite.frame = 0;

                if (w) {

                    walk(sprite);

                }

            };

        }
            ())

    }, false, false);
