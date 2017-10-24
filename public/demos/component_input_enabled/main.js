

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        create : function () {

            var gra = game.add.graphics(160, 120),

            draw = function (gra, color) {

                color = color || 0x0000ff;

                gra.clear();
                gra.beginFill(color);
                gra.drawRect(-50, -50, 100, 100);
                gra.endFill();

            };

            // enable the input
            gra.inputEnabled = true;

            // I can now use the onInputDown event
            gra.events.onInputDown.add(function (gra, pt) {

                draw(gra, 0x00ff00);

            });

            // onInputUp also
            gra.events.onInputUp.add(function (gra, pt) {

                draw(gra, 0x0000ff);

            });

            draw(gra);
        }

    });

/*
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create });

var graphics;

function create() {

graphics = game.add.graphics(300, 200);

drawShape(0x027a71, 0x02fdeb);

graphics.inputEnabled = true;
graphics.input.useHandCursor = true;

graphics.events.onInputDown.add(onDown, this);
graphics.events.onInputUp.add(onUp, this);
graphics.events.onInputOver.add(onOver, this);
graphics.events.onInputOut.add(onOut, this);

}

function drawShape(fill, style) {

graphics.clear();

graphics.beginFill(fill);
graphics.lineStyle(4, style, 1);

graphics.moveTo(0, 0);
graphics.lineTo(250, 0);
graphics.lineTo(250, 200);
graphics.lineTo(125, 100);
graphics.lineTo(0, 200);
graphics.lineTo(0, 0);

graphics.endFill();

}

function onOver() {

drawShape(0xab3602, 0xeb6702);

}

function onDown() {

drawShape(0x717a02, 0xebfd02);

}

function onUp() {

drawShape(0x027a71, 0x02fdeb);

}

function onOut() {

drawShape(0x027a71, 0x02fdeb);

}
 */
/*
// Poly Model Example
var PM = (function () {

var api = {

pointCount : 10,

// the points
points : [],

// parallel array of delta values for the points
data : [],

// set the staring status of points
setPoints : function () {

// current point index
var pi = 0,
data;

this.points = [];

// set the values for each point
this.setData();
while (pi < this.pointCount) {

data = this.data[pi];

// push x first, then y
this.points.push(Math.floor(Math.cos(data.radian) * data.radius));
this.points.push(Math.floor(y = Math.sin(data.radian) * data.radius));

pi += 1;

}

// push first point at the end
this.points.push(this.points[0]);
this.points.push(this.points[1]);

},

forAll : function (func) {

var i = 0,
api;
while (i < this.pointCount) {

api = {

i : i,
xi : i * 2,
yi : i * 2 + 1,
data : this.data[i],
points : this.points,
pointCount : this.pointCount

};

api.x = api.points[api.xi];
api.y = api.points[api.yi];

func.call(api, api.x, api.y);

i += 1;
}

},

// set data values
setData : function () {

var i = 0;

this.data = [];
while (i < this.pointCount) {

this.data.push({

radius : 80,
radian : Math.PI * 2 / this.pointCount * i,
deltaRadius : 1 - Math.floor(Math.random() * 2) * 2,
radiusMin : 70 - Math.floor(Math.random() * 30),
radiusMax : 90 + Math.floor(Math.random() * 30),
rate : 33 + Math.floor(66 * Math.random()),
lastTime : new Date(),
prop : Math.random() * .25 + .25

});

i += 1;

}

},

// user action
userAction : function (x, y) {

console.log(x + ',' + y);

this.forAll(function (ptx, pty) {

// Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) )

var d = Math.sqrt(Math.pow(x - ptx, 2) + Math.pow(y - pty, 2));

var per = 1 - d / 150;

per = per > 1 ? 1 : per;
per = per < 0 ? 0 : per;

this.data.radius = this.data.radiusMin + (this.data.radiusMax - this.data.radiusMin) * per;
});

this.update();

},

update : function () {

var i = 0,
roll,
now,
data;
while (i < this.pointCount) {

data = this.data[i];

this.points[i * 2] = Math.cos(data.radian) * data.radius;
this.points[i * 2 + 1] = Math.sin(data.radian) * data.radius;

i += 1;

}

// splice out the last point
// and set it to the first point
this.points.splice(this.points.length - 2, 1, this.points[0]);
this.points.splice(this.points.length - 1, 1, this.points[1]);

}

};

return api;

}
());

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

// create method
create : function () {

var back = game.add.graphics(game.world.centerX, game.world.centerY),
gra,
draw;

PM.setPoints();

back.lineStyle(3, 000000, .4);

PM.forAll(function (x, y) {

back.moveTo(Math.cos(this.data.radian) * this.data.radiusMin,
Math.sin(this.data.radian) * this.data.radiusMin);
back.lineTo(

Math.cos(this.data.radian) * this.data.radiusMax,
Math.sin(this.data.radian) * this.data.radiusMax);

});

// add a graphics object to the world
gra = game.add.graphics(game.world.centerX, game.world.centerY);

draw = function () {

gra.clear();

gra.lineStyle(6, 0x000000);

gra.beginFill(0xff0000);
gra.alpha = .4;
gra.drawPolygon(PM.points);

gra.lineStyle(2, 0xffffff);

gra.drawPolygon(PM.points);
gra.endFill();

}

// enable input for the sprite gra
gra.inputEnabled = true;

// use the hand cursor it is is a mouse
gra.input.useHandCursor = true;

gra.events.onInputDown.add(function (gra, pt) {

PM.userAction(pt.x - gra.x, pt.y - gra.y);
//PM.update();
draw();

})

draw();

}

}, true);

*/
