
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

        // inject a fixed position DIV for SCALE
        var fixDiv = document.createElement('div');
        fixDiv.style.position = 'fixed';
        fixDiv.style.top = '0px';
        fixDiv.style.left = '0px';

        document.body.appendChild(fixDiv);

        // on input down
        game.input.onDown.add(function () {

            // IF scale mode is NO_SCALE then toggle to SHOW_ALL
            if (game.scale.scaleMode === Phaser.ScaleManager.NO_SCALE) {

                // set window constraints to 'visual' for both right, and bottom
                //game.scale.windowConstraints.right = 'visual';
                game.scale.windowConstraints.bottom = 'visual';

                // I will want the scaled canvas to align horizontally/Vertically
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;

                // set
                game.scale.width = window.innerWidth;
                game.scale.height = window.innerHeight;
                fixDiv.style.width = game.scale.width + 'px';
                fixDiv.style.Height = game.scale.height + 'px';

                // remove from dom
                Phaser.Canvas.removeFromDOM(game.canvas);

                // append to fixDIV
                fixDiv.appendChild(game.canvas);

                // append to fixed div
                console.log(game.canvas);

                // set scale mode to 'SHOW_ALL'
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            } else {

                // ELSE if scale mode is not NO_SCALE toggle back

                // set window constraints back to default
                game.scale.windowConstraints.right = 'layout';
                game.scale.windowConstraints.bottom = '';

                // I will want to set these back to there defaults
                game.scale.pageAlignHorizontally = false;
                game.scale.pageAlignVertically = false;

                // remove from dom
                Phaser.Canvas.removeFromDOM(game.canvas);

                // append back to game.parent
                document.getElementById(game.parent).appendChild(game.canvas);

                // set scale back to NO_SCALE
                game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

            }

        });

        game.scale.onSizeChange.add(function (scale) {

            console.log('********** SIZE CHANGE **********');
            console.log('window constraints: ' + JSON.stringify(scale.windowConstraints));
            console.log('scale mode: ' + scale.scaleMode);
            console.log('bounds: ' + scale.bounds);
            console.log('target size: ' + scale.width + ',' + scale.height)
            console.log('canvas size (offset): ' + game.canvas.offsetWidth + ',' + game.canvas.offsetHeight);
            console.log('canvas size (native): ' + game.canvas.width + ',' + game.canvas.width);
            console.log('game size: ' + game.width + ',' + game.height);
            console.log('world size: ' + game.world.width + ',' + game.world.height);
            console.log(game);
            //console.log(scale.scaleFactor);
            console.log('********** **********');

        });

    }

});

game.state.start('resize');
