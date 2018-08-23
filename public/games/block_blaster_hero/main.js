// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// variables that are global across all game states
game.global = {

    block_pool_size: 20, // block sprite pool size
    block_spawn_rate: 3000, // time between spawns
    block_delta: .5, // used to set block deltaX, and deltaY
    block_spawn_last_time: new Date(),
    player: {},
    kill_cap: 1000, // number of kills that will result in max game level
    centerPoint: null

};

// Block module, for all things block related
var Block = {

    // create the block pool
    createBlockPool: function () {

        var i = 0,
        len = game.global.block_pool_size,
        sprite;
        while (i < len) {

            sprite = game.add.sprite(-32, -32, 'sheet-block', 0);
            sprite.name = 'block-' + i;
            sprite.data = {
                state: 'inactive',
                heading: 0,
                dx: 1,
                dy: 0,
                hp: 1,
                i: 0
            };

            sprite.inputEnabled = true;

            // if a block is clicked
            sprite.events.onInputDown.add(Block.onClick);

            i += 1;

        }

    },

    // what to do if a block is clicked
    onClick: function (block) {

        block.data.hp -= 1;

        if (block.data.hp <= 0) {

            block.data.state = 'dead';

        }

    },

    // check if it is time to spawn a new block
    spawnCheck: function () {

        var now = new Date(),
        time = now - game.global.block_spawn_last_time;

        if (time > game.global.block_spawn_rate) {
            game.global.block_spawn_last_time = new Date();
            return true;
        }

        return false;

    },

    // set values based on current progress
    setLevel: function () {

        var kills = game.global.player.kills,
        per = 0;

        kills = Phaser.Math.clamp(kills, 0, game.global.kill_cap);
        per = kills / game.global.kill_cap;

        game.global.block_delta = 0.5 + 2.5 * per;

    },

    // update methods for each block state
    updateStates: {

        // the block is inactive, and outside the world
        inactive: function (sprite) {

            sprite.alpha = 1;
            sprite.frame = 0;
            a = Math.PI * 2 * Math.random();

            // if spawn check
            if (Block.spawnCheck()) {

                // set inbound

                sprite.data.state = 'inbound';

                var spawnPt = new Phaser.Point(
                        Math.cos(a) * (game.world.width) + game.world.centerX - sprite.width / 2,
                        Math.sin(a) * (game.world.height) + game.world.centerY - sprite.height / 2);

                sprite.x = spawnPt.x;
                sprite.y = spawnPt.y;

                sprite.data.heading = spawnPt.angle(game.global.centerPoint);
                sprite.data.dx = Math.cos(sprite.data.heading) * game.global.block_delta;
                sprite.data.dy = Math.sin(sprite.data.heading) * game.global.block_delta;

            }

        },

        // the block is inbound from outside the world, into the world
        inbound: function (sprite) {

            sprite.x += sprite.data.dx;
            sprite.y += sprite.data.dy;

            var d = game.global.centerPoint.distance(sprite);

            // if close to the center set active
            if (d < 100) {

                sprite.data.state = 'active';

            }

        },

        // the block is actively moving
        active: function (sprite) {

            sprite.x += sprite.data.dx;
            sprite.y += sprite.data.dy;

            // make sure block is in the game area
            sprite.x = Phaser.Math.wrap(sprite.x, -32, game.world.width + 32);
            sprite.y = Phaser.Math.wrap(sprite.y, -32, game.world.height + 32);

        },

        // the block is dead, at this time a death animation just plays
        dead: function (sprite) {

            sprite.alpha = (100 - sprite.data.i) / 100;
            sprite.frame = 1;

            if (sprite.data.i >= 100) {

                // step kills
                game.global.player.kills += 1;

                Block.setLevel();

                // save progress via local storage
                localStorage.setItem('block_blaster_hero', JSON.stringify(game.global.player));

                sprite.data.i = 0;
                sprite.data.state = 'inactive';
                sprite.x = -32;
                sprite.y = -32;
                sprite.data.dx = 0;
                sprite.data.dy = 0;

            }

            sprite.data.i += 1;

        }

    }

};

// the boot state of the game, this state will be stared first
// when everything is ready
game.state.add('boot', {

    create: function () {

        // scale settings
        game.scale.compatibility.scrollTo = false;
        game.scale.pageAlignHorizontally = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.width = document.getElementById(game.parent).scrollWidth;
        game.scale.height = document.getElementById(game.parent).scrollHeight;

        // set center point
        game.global.centerPoint = new Phaser.Point(game.world.centerX, game.world.centerY);

        // check local storage
        var store = localStorage.getItem('block_blaster_hero');

        if (store) {
            game.global.player = JSON.parse(store);
            Block.setLevel();
        } else {
            game.global.player = {
                kills: 0
            };
        }

        // make the sprite sheet
        game.state.start('gen-block-sheet');

    }

});

// generate
game.state.add('gen-block-sheet', {

    create: function () {

        // sprite sheet generated by canvas
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 32;

        // blue frame
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(0, 0, 32, 32);

        // red frame
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(32, 0, 32, 32);

        game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, 2, 0, 0);

        game.state.start('game');

    }

});

// the game state
game.state.add('game', {

    create: function () {

        // create blocks
        Block.createBlockPool();

        // kill display
        var text_kill = game.add.text(5, 5, '', {
                fill: '#ffffff',
                font: '10px courier'
            });
        text_kill.name = 'text_kill';

    },

    update: function () {

        var i = 0,
        len = game.global.block_pool_size,
        a,
        sprite;

        // loop all blocks
        while (i < len) {

            // grab sprite
            sprite = game.world.getByName('block-' + i);

            // call update methods for current state
            Block.updateStates[sprite.data.state](sprite);

            i += 1;
        }

        game.world.getByName('text_kill').text = 'kills: ' + game.global.player.kills +
            '; delta ' + game.global.block_delta.toFixed(2) +
            '; spawn rate ' + game.global.block_spawn_rate;

    }

});

game.state.start('boot');
