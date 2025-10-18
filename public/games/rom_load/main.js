
const rom_str = 'class Rom extends Phaser.Scene { constructor (config) { super(config); this.key = \'Rom\'; } create () { console.log(\'yes this is ROM!\');}};export{Rom};';


const LoadRomString = (rom_str='') => {
    const dataUrl = `data:text/javascript,${encodeURIComponent(rom_str)}`;
    return import(dataUrl)
    .then((module)=>{
        if(!module.Rom){
            return Promise.reject('No Rom export found in given rom string.');
        }
        return module.Rom;
    });
};

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
        
        LoadRomString(rom_str)
        .then((Rom)=>{
            console.log('okay so we have a rom now');
            console.log(Rom)
        
        })
        
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
