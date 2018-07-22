
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {

        // create method
        create: function () {

            var data = this.game.data = {};

            data.gfx = this.game.add.graphics(0, 0);

            data.gfx.beginFill(0xff0000);
            data.gfx.drawCircle(
                this.game.world.centerX,
                this.game.world.centerY, 10);
            data.gfx.endFill();

            var textStyle = {
                font: '10px arial',
                fill: '#ffffff'
            };
            data.tx_adv = game.add.text(20, 20, '', textStyle);
            data.tx_fps = game.add.text(20, 30, '', textStyle);

            this.game.time.advancedTiming = true;

        },

        update: function () {

            this.game.data.tx_adv.text = 'advaced timeing: ' + this.game.time.advancedTiming;
            this.game.data.tx_fps.text = 'fps: ' + this.game.time.fps;

        }

    });
