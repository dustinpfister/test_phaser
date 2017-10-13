
/*
// the actual App state once everything is loaded
var App = {

create : function () {

var sprite = game.add.sprite(0, 0, 'zelda');
sprite.animations.add('walk');

sprite.animations.play('walk', 50, true);

},

update : function () {}

};

// the load state
var Load = {

preload : function () {

var loadSprite = game.add.sprite(0, 0, 'loadingbar');
loadSprite.width = 0;
loadSprite.x = game.world.centerX - loadSprite.width / 2;
loadSprite.y = game.world.centerY - 16;

game.load.onLoadStart.add(function () {}, this);
game.load.onFileComplete.add(function (progress) {

loadSprite.width = game.width * (progress / 100);
loadSprite.x = game.world.centerX - loadSprite.width / 2;

}, this);
game.load.onLoadComplete.add(function () {}, this);

game.load.image('phaser', '/img/phaser.png');
game.load.spritesheet('zelda', '/img/sheet_zelda_forse1.png',20,23);


},

create : function () {

//app.state.add('title', Title);
//app.state.add('dig_run', DIG.run);
//app.state.add('dig_over', DIG.over);
//app.state.add('dig_options', DIG.options);

//app.state.start('title');

game.state.add('app', App);
game.state.start('app');

console.log('we be good man');

}

};

// the main game variable
var game = (function () {

// the main or boot state
// this is where it all starts
return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

preload : function () {

game.load.image('loadingbar', '/img/loadingbar.png');

},

// create method
create : function () {

game.state.add('load', Load);
game.state.start('load');

},

// the update method will be called on each tick
update : function () {}

});

}
());
 */

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // load the sprite sheet
        preload : function () {

            game.load.spritesheet('cucco', '/img/cuccos_zelda4.png', 20, 20, 10);

        },

        // create the sprite
        create : function () {

            game.add.sprite(0, 0, 'cucco');

        },

        update : (function () {

            var f = 0,
            lt = new Date(),
            rate = 1000 / 12;

            return function () {

                sprite = game.world.children[0];

                sprite.frame = f + 2;

                if (new Date() - lt > rate) {

                    f += 1;
                    if (f == 2) {

                        f = 0;

                    }

                    lt = new Date();

                }

            };

        }
            ())

    });
