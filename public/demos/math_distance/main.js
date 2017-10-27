
console.log(Phaser.Math.distance(0,0,100,25));

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            var one = game.add.graphics(game.world.centerX, game.world.centerY),
            text = game.add.text(10, 10, '', {
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

                a : 0,
                aMax : 1000,
                radius : 100,

                amount : -100,
                over : 50,
                done : 0,

                // no mathematical modulo?

                modulo : function (x, m) {

                    return (x % m + m) % m;

                },

                update : function (gra) {

                    var r;

                    this.a += 1;

                    this.a = this.modulo(this.a, this.aMax);

                    r = Math.PI * 2 / this.aMax * this.a;

                    gra.x = game.world.centerX + Math.cos(r) * this.radius;
                    gra.y = game.world.centerY + Math.sin(r) * this.radius;

                    if (this.done < this.over) {

                        var delta = this.amount / this.over;

                        this.radius += delta;

                        this.done += 1;

                    } else {

                        if (this.radius <= 0) {

                            this.radius = 0;
                            this.amount = 100 * Math.random();

                        } else {

                            this.amount = -this.radius;

                        }

                        this.over = 10 + Math.floor(Math.random() * 490);
                        //this.over = Math.floor(Math.random() * 950) + 50;
                        this.done = 0;

                    }

                    //gra.x = this.modulo(gra.x, game.world.width);
                    //gra.y = this.modulo(gra.y, game.world.height);

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
