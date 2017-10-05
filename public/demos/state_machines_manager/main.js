
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

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('setup',

    (function () {

        var box = {};

        // return the state object
        return {

            // an init method with a param object
            init : function (param) {

                console.log(param);

                box = {

                    x : param.x || 0,
                    y : param.y || 0,
                    dx : param.dx || 1,
                    dy : param.dy || 0

                }

            },

            // a core update method
            update : function () {

                box.x += box.dx;
                box.y += box.dy;

            }

        };

    }
        ()));

game.state.start('setup', true, false, {

    foo : 'bar'

})
