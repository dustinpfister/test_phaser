class Boot extends Phaser.Scene {
    constructor (config) {
        super(config);
        this.key = 'Boot';
    }
    create () {
        const scene = this;
        const game = scene.game;
        const scenePlugin = scene.scene;
        const sceneManager = scenePlugin.manager;
        
        console.log('so far so good with this new rom_load project!');
        
    }
};



const config = {
    parent: 'container_flr',
    //canvas: canvas,
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#000000',
    scene: Boot,
    zoom: 1,
    render: { pixelArt: true  },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x:0 }
        }
    }
};
const game = window.game = new Phaser.Game(config);
