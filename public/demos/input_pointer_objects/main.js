

/*
document.body.addEventListener('touchstart', function (e) {

// vanilla js touch event
console.log(e);

});

document.body.addEventListener('mousedown', function (e) {

// vanilla js mouse event
console.log(e);

});
 */
/*
var activePointer = {

x : 0,
y : 0
},

pointerEvent = function (e) {

var bx = e.target.getBoundingClientRect(),
x,
y;

if (typeof e.clientX === 'undefined') {

console.log('touch');

x = e.touches[0].clientX;
y = e.touches[0].clientY;

} else {

console.log('mouse');

x = e.clientX;
y = e.clientY;

}

// set latest values for the pointer
activePointer = {

x : x - bx.left, // container relative
y : y - bx.top,
clientX : x, // window relative
clientY : y

};

};

document.body.addEventListener('touchstart', pointerEvent);
document.body.addEventListener('touchmove', pointerEvent);
document.body.addEventListener('mousedown', pointerEvent);
document.body.addEventListener('mousemove', pointerEvent);

var loop = function () {

setTimeout(loop, 33);

document.body.innerHTML = JSON.stringify(activePointer);

};

loop();
 */

var game = (function () {

    var disp;

    return new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {

        create : function () {

            disp = game.add.text(10, 10, '', {
                    fill : 'white'
                });

        },

        update : function () {

            // the active pointer
            var pt = game.input.activePointer;

            // uncomment for the mouse pointer
            //var pt = game.input.mousePointer;

            // uncomment for touch pointer1
            //var pt = game.input.pointer1;

            // uncomment for touch pointer2
            //var pt = game.input.pointer2;

            disp.text = pt.x + ',' + pt.y;

        }

    });

}
    ());

/*
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {

create : function () {

game.input.onDown.add(function (pt) {

console.log(pt.x + ',' + pt.y);

});

}

});
*/
