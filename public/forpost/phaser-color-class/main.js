
//getWebRGB
console.log('getWebRGB');

console.log(Phaser.Color.getWebRGB(0x00ff00)); // 'rgba(0,255,0,1)';

console.log(Phaser.Color.getWebRGB(0xff00)); // 'rgba(0,255,0,1)';

console.log(Phaser.Color.getWebRGB(65280)); // 'rgba(0,255,0,1)';


// webToColor
console.log('webToColor');

var webRGB = 'rgba(0,255,0,1)',

colorObj = Phaser.Color.webToColor(webRGB);

console.log(colorObj.r); // 0
console.log(colorObj.g); // 255
console.log(colorObj.b); // 0
console.log(colorObj.a); // 1

// vanilla
var colorObj = {},
colorArr = webRGB.replace(/rgba\(/, '').replace(/\)/, '').split(',');

colorObj.r = colorArr[0];
colorObj.g = colorArr[1];
colorObj.b = colorArr[2];
colorObj.a = colorArr[3];

console.log(colorObj.r); // 0
console.log(colorObj.g); // 255
console.log(colorObj.b); // 0
console.log(colorObj.a); // 1



// NOT WORKING

// hexToRGB - does not work correctly
/*
console.log('hexToRGB');

var n = Phaser.Color.hexToRGB('#00ff00');

console.log(Phaser.Color.getWebRGB(n)); // rgba(0,255,0,0.00392156862745098)
*/
