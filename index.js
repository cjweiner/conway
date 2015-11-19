var Game = require('./game');
var program = require('commander')
	.version("1.0.0")
	.usage('[options] <values ...>')
	.option('-i, --interactive','Interactive Mode')
	.option('-s, --size <size>','size of the grid', 6)
	.option('-t, --type <type>','type of cells eg. oscillators')
	.parse(process.argv);

var promptly = require('promptly');

var lengthValidator = function (value) {
    if (value < 5) {
        throw new Error("Min length of 5");
    }
    return value;
};

var main = function(){

	INTERACTIVE_MODE = program.interactive;
	TYPE_MODE = program.type;
	var game = new Game(program.size);
    if (INTERACTIVE_MODE) {
		promptly.prompt('Column Size: ', { validator: lengthValidator, retry: true }, function(err, value){
			game.colSize = value;
            promptly.prompt('Row Size: ', { validator: lengthValidator, retry: true}, function (err, value){
                game.rowSize = value;
                game.init(true);
                game.run();
                game.update();
			});
		});

	}
	else if(TYPE_MODE){
		var type = TYPE_MODE;
		game.init(false, type);
        game.run();
        if(type !== "still")
		    game.update();
	}
	else{
		game.init(true);
		game.run();
        game.update();
	}
};

main();