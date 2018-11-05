
var points = [];

points.push( new Phaser.Point(100,0));
points.push( new Phaser.Point(200,0));

var centroid = Phaser.Point.centroid(points);

console.log( centroid.x, centroid.y); // 150 0
