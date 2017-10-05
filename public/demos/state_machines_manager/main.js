
/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea',{

// create method
create : function () {

// game.state is a reference to the State Manager in phaser
console.log(game.state); // the state manager object

// game.state.states is where state objects are stored
// including this one
console.log(game.state.states.default); // this state object

// this is a reference to this very function
console.log(game.state.states.default.create); // this function

}

}

);
 */

/*
// I did not give a default State
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');


// I can add one with StateManager.add
game.state.add('default',

{

// create method
create : function () {

// game.state is a reference to the State Manager in phaser
console.log(game.state); // the state manager object

// game.state.states is where state objects are stored
// including this one
console.log(game.state.states.default); // this state object

// this is a reference to this very function
console.log(game.state.states.default.create); // this function

}

}

);

// start the default State
game.state.start('default');
 */

/*
var Boot = {

// create method
create : function () {

console.log('Boot state');

game.state.start('title');

}

},

// A Title State
Title = {

// create method
create : function () {

console.log('Title state');

},

update : function () {

// add some code that is a condition
// that will lead to  starting game
game.state.start('game');

}

},

// A Game State
Game = {

// create method
create : function () {

console.log('Game state');

},

update : function () {}

};

// Make the Phaser Game instnace, and define some State Objects
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// I can add one with StateManager.add
game.state.add('default', Boot);
game.state.add('title', Title);
game.state.add('game', Game);

// start With default
game.state.start('default');

 */

/*
console.log('yeah');
console.log(new Phaser.State());
 */

/*
var state = new Phaser.State();

console.log(state);
 */

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO,'gamearea');

game.state.add('func', function(){

console.log('yes I am just a function');

},true);

console.log(game.state.states.func);

//game.state.start('default');
 */

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('setup',

(function () {

var box = {},
cr;

// return the state object
return {

// an init method with a param object
init : function (param) {

console.log(param);

box = {

sx : param.x === undefined ? 0 : param.x,
sy : param.y === undefined ? 0 : param.y,
dx : param.dx === undefined ? 1 : param.dx,
dy : param.dy === undefined ? 0 : param.dy

};

box.x = box.sx;
box.y = box.sy;

},

create : function () {

cr = game.add.graphics(box.x, box.y);

cr.beginFill(0x00ff00);
cr.drawCircle(50, 50, 100);
cr.endFill();

},

// a core update method
update : function () {

// move box x, by its delta
box.x += box.dx;
box.y += box.dy;

cr.x = box.x;
cr.y = box.y;

// set some conditions for the circle to come back home
if (box.x > 1000 || box.x < -1000 || box.y > 1000 || box.y < -1000) {

box.x = box.sx;
box.y = box.sy;

}

}

};

}
()));

// staring moveCircle with  a param object
game.state.start('setup', true, false, {

x : 100,
y : 60,
dx : 5,
dy : -1

});
 */

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('default',{

        create : function () {

            console.log('hello world!');

        }

    },true);
*/

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('foo',{

        create : function () {

            console.log('foo!');

            // starting foo
            game.state.start('bar');

        }

    });

game.state.add('bar',{

        create : function () {

            console.log('bar!');

        }

    });

game.state.start('foo'); // foo! bar!