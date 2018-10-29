
var titleLoger = function (text) {

    document.title = text;

};

var x = 0;

/*
var loop = function () {

requestAnimationFrame(loop);

x += 1;
titleLoger(x);

};

loop();
 */

var loop = function () {

    //setTimeout(loop,33);
    x += 1;
    titleLoger(x);

};

//loop();

setInterval(loop,33);

/*
// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');



game.state.add('demo', {

create: function () {

game.data = {
pps: 64
};

var sprite = game.data.sprite = game.add.sprite(0, 0, 'sheet-block');
sprite.y = 32;

game.stage.disableVisibilityChange = true;

var loop = function () {

requestAnimationFrame(loop);

sprite.x += game.time.elapsed / 1000 * game.data.pps;
sprite.x = Phaser.Math.wrap(sprite.x, -32, game.world.width + 32);
titleLoger(sprite.x);

};

loop();


//setInterval(function () {
//sprite.x += game.time.elapsed / 1000 * game.data.pps;
//sprite.x = Phaser.Math.wrap(sprite.x, -32, game.world.width + 32);
//titleLoger(sprite.x);
//},33);


},

update: function () {

var sprite = game.data.sprite;

}

});

game.state.start('demo');
*/
