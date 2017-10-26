
var game = (function () {

    // a model
    var model = {

        // some model values
        current : 'rest',
        lastUpdate : new Date(),
        size : 45,
        deltaSize : 1,

        dragCount : 0,

        // rest state
        rest : {

            sizeLow : 40,
            sizeHi : 50,
            rate : 120,
            color : 0x808080

        },

        // down state
        down : {

            sizeLow : 50,
            sizeHi : 60,
            rate : 60,
            color : 0x008000

        },

        // drag state
        drag : {

            sizeLow : 60,
            sizeHi : 70,
            rate : 30,
            color : 0x00ff00

        },

        // update the model
        update : function () {

            var now = new Date(),
            cur = this[this.current];

            if (now - this.lastUpdate >= cur.rate) {

                this.size += this.deltaSize;

                if (this.size >= cur.sizeHi) {

                    this.size = cur.sizeHi;
                    this.deltaSize = -1;

                }

                if (this.size <= cur.sizeLow) {

                    this.size = cur.sizeLow;
                    this.deltaSize = 1;

                }

                this.lastUpdate = now;
            }

        },

        // draw the model with the given Graphics Disp Object
        draw : function (gra) {

            var cur = this[this.current];

            // main circle
            gra.clear();
            gra.beginFill(cur.color);
            gra.drawCircle(0, 0, this.size, this.size);
            gra.endFill();

        },

        checkBounds : function (gra) {

            if (gra.x < gra.width / 2) {

                gra.x = gra.width / 2;

            }

            if (gra.x > game.world.width - gra.width / 2) {

                gra.x = game.world.width - gra.width / 2;

            }

            if (gra.y < gra.height / 2) {

                gra.y = gra.height / 2;

            }

            if (gra.y > game.world.height - gra.height / 2) {

                gra.y = game.world.height - gra.height / 2;

            }

        }

    };

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create : function () {

            var gra = game.add.graphics(game.world.centerX, game.world.centerY),
            text = game.add.text(5, 5, '', {
                    fill : '#ffffff',
                    font : '15px courier'
                });

            //drawCircle(gra);

            // prevent context menu on long press, or right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            }

            // enable input for the Graphics Display Object
            // this will add an instance of inputHanddler at gra.input
            // some event handlers at gra.events will now work like
            // gra.events.onInputDown
            gra.inputEnabled = true;

            // enable draggable events like gra.events.onDragStart
            gra.input.draggable = true;
            console.log(gra.input.draggable);

            gra.events.onDragStart.add(function (gra) {

                console.log('Drag start.');

                model.current = 'down';

            });

            gra.events.onDragUpdate.add(function (gra) {

                console.log('Drag update.');

                if (model.dragCount >= 5) {

                    model.current = 'drag';

                }
                model.dragCount += 1;

                model.checkBounds(gra);

            });

            gra.events.onDragStop.add(function (gra) {

                console.log('Drag stop.');

                //model.current = 'rest';

                model.dragCount = 0;

            });

            // add a single handler for onInputDown
            gra.events.onInputDown.add(function (gra) {

                //console.log('down');

                model.current = 'down';

            });

            // add a single handler for onInputDown
            gra.events.onInputUp.add(function (gra) {

                console.log('up');

                model.current = 'rest';

            });

            gra.events.onInputOver.add(function (gra) {

                console.log('over');

            });

            gra.events.onInputOut.add(function (gra) {

                console.log('out');

            });

        },

        // the update method will be called on each tick
        update : function () {

            var gra = game.world.children[0],
            text = game.world.children[1];

            //text.text = gra.events;


            //drawCircle(gra);

            model.draw(gra);

            model.update();

        }

    });

}
    ());
