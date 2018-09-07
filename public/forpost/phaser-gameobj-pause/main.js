var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('boot', {
	
	create : function(){
		
		
		
		game.state.start('demo');
		
	}
	
	
});


game.state.add('demo', {
	
	create : function(){
		
		
		
	}
	
});


game.state.start('boot');