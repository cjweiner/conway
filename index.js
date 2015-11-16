var readline = require('readline');
var Game = require('./game',32);

var main = function(){
	var game = new Game(64);
	game.init();
	game.run();
	game.update();
};

main();