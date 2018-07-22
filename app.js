let express = require('express'),

app = express();

app.set('port', process.env.PORT || process.argv[2] || 8080);

app.use('/', express.static('./public'));

app.listen(app.get('port'), function () {

    console.log('test_phaser is up on port ' + app.get('port'));

});
