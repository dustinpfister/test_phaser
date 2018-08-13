
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('resize', {

    create: function () {

        // just a circle
        var bx = game.add.graphics(160, 120);
        bx.beginFill(0x00ff00);
        bx.drawCircle(0, 0, 240);
        bx.endFill();
        game.stage.backgroundColor = '#2a2a2a';

        // disable scrollTo
        game.scale.compatibility.scrollTo = false;
        game.scale.pageAlignHorizontally = true;
        game.input.onDown.add(function () {

            if (game.scale.scaleMode === Phaser.ScaleManager.NO_SCALE) {

                // set window constraints to 'visual' for both right, and bottom
                game.scale.windowConstraints.right = 'visual';
                game.scale.windowConstraints.bottom = 'visual';

                // set scale mode to 'SHOW_ALL'
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            } else {

                // set window constraints back to default
                game.scale.windowConstraints.right = 'layout';
                game.scale.windowConstraints.bottom = '';

                // set scale back to NO_SCALE
                game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

            }

        });

        game.scale.onSizeChange.add(function (scale) {

            console.log('********** SIZE CHANGE **********');
            console.log('window constraints: ' + JSON.stringify(game.scale.windowConstraints));
            console.log('scale mode: ' + game.scale.scaleMode);
            console.log('bounds: ' + game.scale.bounds);
            console.log('canvas size (offset): ' + game.canvas.offsetWidth + ',' + game.canvas.offsetHeight);
            console.log('canvas size (native): ' + game.canvas.width + ',' + game.canvas.width);
            console.log('game size: ' + game.width + ',' + game.height);
            console.log('world size: ' + game.world.width + ',' + game.world.height);
            //console.log(game.scale.scaleFactor);
            console.log('********** **********');

            /*
            if (scale.scaleMode === Phaser.ScaleManager.SHOW_ALL) {

            game.canvas.style.position = 'fixed';
            game.canvas.style.left = '0px';
            game.canvas.style.top = '0px';
            game.canvas.style.width = window.innerWidth + 'px';
            game.canvas.style.height = window.innerHeight + 'px';

            } else {

            game.canvas.style.position = 'static';

            }
             */

        });

    }

});

game.state.start('resize');
