var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// boot state will be called first
game.state.add('boot', {

    create: function () {

        game.global = game.global || {};
        game.global.money = 0;
        game.global.taskRate = 0.25;
        game.global.upgrades = 0;
        game.global.upgradeCost = 1;

        // scale settings
        game.scale.compatibility.scrollTo = false;
        game.scale.pageAlignHorizontally = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.width = document.getElementById(game.parent).scrollWidth;
        game.scale.height = document.getElementById(game.parent).scrollHeight;

        // start buttons state
        game.state.start('gen-sheet');

    }

});

// generate a sprite sheet using canvas
game.state.add('gen-sheet', {

    create: function () {

        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

        canvas.width = 32;
        canvas.height = 32;

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';

        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        this.game.cache.addSpriteSheet('sheet-1', null, canvas, 32, 32, 1, 0, 0);

        game.state.start('example');

    }

});

// the example
game.state.add('gen-sheet', {

    create: function () {}

});

// start boot state
game.state.start('boot');
