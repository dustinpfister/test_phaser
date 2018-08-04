
// start out on basic
game.state.start('bitmap-only');

$('#state-select').on('change', function (evnt) {

    game.state.start(evnt.target.value);

});
