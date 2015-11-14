var readline = require('readline');
var clear = function(){
  	if(/^win/.test(process.platform))
  		process.stdout.write('\033c'); 
  	else{
  		process.stdout.write('\033[2J');
  	}
};

function Game(size){
	var cell = [];
	this.size = size;

	this.init = function(){
		for(var i=0; i < size; i++){
			cell[i] = [];
			for(var j=0; j < size; j++){
				cell[i][j] = {"alive": Math.round(Math.random())};
			}
		}
	};

	this.run = function(){
	  	readline.cursorTo(0);
	  	clear();
	  	console.log('\t\t~~~~~~Conway\'s game of life~~~~~~\n');
	  	display();
	};

	display = function(){
		for(var i=0; i < size; i++){
			var line = '';
			for(var j=0; j< size; j++){
				if(cell[i][j].alive){
					line = line + 'o ' ;
				}
				else{
					line = line + '. ' ;
				}
			}
			console.log(line);
		}
	};

	this.update = function(){
	  	readline.cursorTo(0);
	  	clear();
	  	console.log('\t\t~~~~~~Updating~~~~~~\n');
	  	display();
	};

}

module.exports = Game;