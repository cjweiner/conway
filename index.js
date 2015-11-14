var readline = require('readline');
var Game = require('./game',32);

var main = function(){
	var game = new Game(32);
	game.init();
	game.run();
	// setInterval(game.update, 300);
};

main();