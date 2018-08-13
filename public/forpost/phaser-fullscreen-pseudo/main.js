
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('resize', {

    create: function () {

        // just a circle
        var bx = game.add.graphics(160, 120);
        bx.beginFill(0x008f00);
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

        // setFiex to be called when toggling to pseudo full screen
        // or when the window is resized
        var setFixed = function () {
            game.scale.width = window.innerWidth;
            game.scale.height = window.innerHeight;
            fixDiv.style.width = game.scale.width + 'px';
            fixDiv.style.Height = game.scale.height + 'px';
        };

        // call setFixed on window resize
        window.addEventListener('resize', function () {setFixed();});

        // append to body
        document.body.appendChild(fixDiv);

        // on input down toggle full screen
        game.input.onDown.add(function () {

            // IF scale mode is NO_SCALE then toggle to SHOW_ALL
            if (game.scale.scaleMode === Phaser.ScaleManager.NO_SCALE) {

                // set window constraints to 'visual' for both right, and bottom
                game.scale.windowConstraints.bottom = 'visual';

                // I will want the scaled canvas to align horizontally/Vertically
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;

                // set
                setFixed();

                // remove from dom
                Phaser.Canvas.removeFromDOM(game.canvas);

                // append to fixDIV
                fixDiv.appendChild(game.canvas);

                // set scale mode to 'SHOW_ALL'
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            } else {

                // ELSE if scale mode is not NO_SCALE toggle back

                // set window constraints back to default
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

    }

});

game.state.start('resize');
