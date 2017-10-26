/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

create : function () {

// making a graphics display object object
var gra = game.add.graphics(game.world.centerX, game.world.centerY),
info = game.add.text(0, 0, '', {
fill : '#ffffff'
}),

// draw method for the object
draw = function (color, size) {

color = color || 0xff0000;
size = size || 75;

gra.clear();
gra.beginFill(color);
gra.drawRect(-size / 2, -size / 2, size, size);
gra.endFill();

};

// make sure input is enabled for the object
gra.inputEnabled = true;

// we also want to enable dragging
gra.input.draggable = true;

// what to do when the drag starts
gra.events.onDragStart.add(function (gra) {

gra.data.ticks = 0;

});

// what to do as the drag moves
gra.events.onDragUpdate.add(function () {

if (typeof gra.data.ticks === 'number') {

gra.data.ticks += 1;

info.text = gra.data.ticks;

}

info.x = gra.x;
info.y = gra.y;

draw();

});

// what to do when the drag stops
gra.events.onDragStop.add(function (gra) {

gra.data.ticks = 0;
info.text = '';
draw();

});

draw();

}

});
 */

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea',{

create : function () {

// making a graphics display object object
var gra = game.add.graphics(game.world.centerX, game.world.centerY),

// draw method for the object
draw = function (color, size) {

color = color || 0xff0000;
size = size || 75;

gra.clear();
gra.beginFill(color);
gra.drawRect(-size / 2, -size / 2, size, size);
gra.endFill();

};

// make sure input is enambed for the object
gra.inputEnabled = true;

// now I can set some event handlers
gra.events.onInputDown.add(function () {

draw(0x00ff00, 150);

});

gra.events.onInputUp.add(function () {

draw();

});

draw();

console.log(gra.events);

}

});
 */

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

        over : {

            sizeLow : 40,
            sizeHi : 50,
            rate : 120,
            color : 0x008080

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

            sizeLow : 70,
            sizeHi : 80,
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

                console.log(game.input.mousePointer);
                console.log(gra);

            });

            gra.events.onInputOver.add(function (gra) {

                console.log('over');

                model.current = 'over';

            });

            gra.events.onInputOut.add(function (gra) {

                console.log('out');

                model.current = 'rest';

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
