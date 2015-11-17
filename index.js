var Game = require('./game');
var clc = require('cli-color');
var program = require('commander')
	.version("1.0.0")
	.usage('[options] <values ...>')
	.option('-i, --interactive','Interactive Mode')
	.option('-s, --size <size>','size of the grid', 6)
	.option('-t, --type <type>','type of cells eg. oscillators')
	.parse(process.argv);

var main = function(){

	INTERACTIVE_MODE = program.interactive;
	TYPE_MODE = program.type;


	var game = new Game(program.size);
	if(INTERACTIVE_MODE){
		game.init(false);
		game.run();
		game.update();
	}
	else if(TYPE_MODE){
		var type = TYPE_MODE;
		game.init(false, type);
		game.run();
		game.update();
	}
	else{
		game.init(false);
		game.run();
		game.update();
	}
};

main();