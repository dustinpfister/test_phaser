/*
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

return function () {

var sprite = game.world.children[0],
k = game.input.keyboard,
w = false;

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

 */

/*
var game = (function () {

var f = 0,
lt = new Date(),
rate = 1000 / 12,
w = false, // walk animation bool

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

return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

// load the sprite sheet
preload : function () {

game.load.spritesheet('cucco', '/img/cuccos_zelda4.png', 20, 20, 10);

},

// create the sprite
create : function () {

var sprite = game.add.sprite(160 - 40, 120 - 40, 'cucco');

sprite.width = 80;
sprite.height = 80;

console.log();

var k = game.input.keyboard;

// A
k.addKey(65).onHoldCallback = function (key) {

sprite.x -= 1;
w = true;

};

// D
k.addKey(68).onHoldCallback = function (key) {

sprite.x += 1;
w = true;

};

k.addKey(87).onHoldCallback = function (key) {

sprite.y -= 1;
w = true;

};

k.addKey(83).onHoldCallback = function (key) {

sprite.y += 1;
w = true;

};

// set walk bool back to false on any keyup event
k.onUpCallback = function () {

w = false;

}

},

update : (function () {

return function () {

var sprite = game.world.children[0];

// default sprite to frame 0
sprite.frame = 0;

if (w) {

walk(sprite);

}

};

}
())

}, false, false);

}
());

 */

/*
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

create : function () {

var k = game.input.keyboard;

// A
var aKey = k.addKey(65);

aKey.onHoldCallback = function (key) {

console.log('holding down key: ' + key.keyCode);

};

aKey.onDown.add(function (key) {

console.log('key ' + key.keyCode + ' is now down');

});

aKey.onUp.add(function (key) {

console.log('key ' + key.keyCode + ' is now up');

});

}
});
 */

var game = (function () {

    var aKey;

    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        create : function () {

            var k = game.input.keyboard;

            // A
            aKey = k.addKey(65);

            // I can attach handlers like
            aKey.onUp.add(function (key) {

                console.log('key ' + key.keyCode + ' is up');

            });

        },

        update : function () {

            // it can also be polled in an update loop
            if (aKey.isDown) {

                console.log('key ' + aKey.keyCode + ' is down!');

            }

        }

    });

}
    ());
