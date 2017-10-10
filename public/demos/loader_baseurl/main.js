/*
// th Boot State
var Boot = {

preload : function () {

game.load.image('loadingbar', '/img/loadingbar.png');

},

// create method
create : function () {

game.state.add('load', Load);
game.state.start('load');

}

};

// the load state
var Load = {

preload : function () {

// add a sprite that uses my loadingbar asset,
// that was quickly loaded during the Boot Sate
var loadSprite = game.add.sprite(0, 0, 'loadingbar');
loadSprite.width = 0;
loadSprite.x = game.world.centerX - loadSprite.width / 2;
loadSprite.y = game.world.centerY - 16;

// what to do when a file as completed downloading
game.load.onFileComplete.add(function (progress, key, success, loaded, total) {

loadSprite.width = game.width * (progress / 100);
loadSprite.x = game.world.centerX - loadSprite.width / 2;

console.log('progress: ' + progress);
console.log('key: ' + key);
console.log('success: ' + success);
console.log('loaded: ' + loaded + '\/' + total);
console.log('**********');

}, this);

// start loading the asset files
game.load.image('test1', '/img/test1.png');
game.load.image('test2', '/img/test2.png');
game.load.image('test3', '/img/test3.png');

},

// when done create will be called
create : function () {

console.log('ready to rock!');
game.state.add('game', Game);
game.state.start('game');

}

};

// the actual Game state once everything is loaded
var Game = {

create : function () {

game.add.sprite(0, 0, 'test1');

},

update : function () {}

};
 */

// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea',

        // here
    {

        preload : function () {

            game.load.baseURL = '/img/';

            // start loading the asset files
            /*
            game.load.image('test1', '/img/test1.png');
            game.load.image('test2', '/img/test2.png');
            game.load.image('test3', '/img/test3.png');
             */

            game.load.image('test1', 'test1.png');
            game.load.image('test2', 'test2.png');
            game.load.image('test3', 'test3.png');
        },

        create : function () {

            game.add.sprite(0, 0, 'test1');

        }

    });
