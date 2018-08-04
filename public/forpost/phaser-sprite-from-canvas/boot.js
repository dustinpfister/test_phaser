
// start out on basic
game.state.start('basic');

$('#state-select').on('change', function (evnt) {

    game.state.start(evnt.target.value);

});
