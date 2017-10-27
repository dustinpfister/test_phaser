
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            var one = game.add.graphics(game.world.centerX, game.world.centerY),
            text = game.add.text(0, 0, '', {
                    fill : '#ffffff',
                    font : '15px courier'
                });

            one.beginFill(0xff0000);
            one.drawCircle(0, 0, 25);
            one.endFill();

            var two = game.add.graphics(100, 50);
            two.beginFill(0x00ff00);
            two.drawCircle(0, 0, 25);
            two.endFill();

            two.data = {

                dx : 0,
                dy : 0,
                heading : 1,
                headingDelta : 0,

                // no mathematical modulo?
                modulo : function (x, m) {

                    return (x % m + m) % m;

                },

                // how about an array of conditions
                // and what happens if the condition is true
                actions : [{

                        condition : function () {

                            var roll = Math.random();

                            return roll > .5;

                        },

                        run : function () {

                            this.headingDelta += .001;

                        }

                    },
                    {

                        condition : function () {

                            var roll = Math.random();

                            return roll > .5;

                        },

                        run : function () {

                            this.headingDelta -= .001;

                        }

                    }

                ],

                update : function (gra) {

                    var self = this;

                    this.actions.forEach(function (action) {

                        if (action.condition()) {

                            action.run.call(self);

                        }

                    });

                    this.heading += this.headingDelta;

                    this.dx = Math.cos(this.heading) * 1;
                    this.dy = Math.sin(this.heading) * 1;

                    gra.x += this.dx;
                    gra.y += this.dy;

                    gra.x = this.modulo(gra.x, game.world.width);
                    gra.y = this.modulo(gra.y, game.world.height);

                }

            };

            console.log(Phaser.Math);

            //console.log(Phaser.Math.distance(one.x, one.y, two.x, two.y));

        },

        // the update method will be called on each tick
        update : function () {

            var text = game.world.children[1],
            one = game.world.children[0],
            two = game.world.children[2];

            two.data.update(two);

            text.text = 'distance: ' + Phaser.Math.distance(one.x, one.y, two.x, two.y).toFixed(2);

        }

    });
