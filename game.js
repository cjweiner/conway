var color = require('cli-color');


var clear = function(){
  	process.stdout.write('\033c');
};

function Game(size){
	var cell = [];
	this.size = size;

	this.init = function(random){
		if(random){
			for(var i=0; i < size; i++){
				cell[i] = [];
				for(var j=0; j < size; j++){
					cell[i][j] = {"alive": Math.round(Math.random())};
				}
			}
		}
		else{
			
			cell[0] = [],cell[1] = [],cell[2] = [],cell[3] = [],cell[4] = [],cell[5] = [];

			cell[0][0] = {"alive": 0};
			cell[1][0] = {"alive": 0};
			cell[2][0] = {"alive": 0};
			cell[3][0] = {"alive": 0};
			cell[4][0] = {"alive": 0};
			cell[5][0] = {"alive": 0};

			cell[0][1] = {"alive": 0};
			cell[1][1] = {"alive": 0};
			cell[2][1] = {"alive": 0};
			cell[3][1] = {"alive": 0};
			cell[4][1] = {"alive": 0};
			cell[5][1] = {"alive": 0};

			cell[0][2] = {"alive": 0};
			cell[1][2] = {"alive": 0};
			cell[2][2] = {"alive": 0};
			cell[3][2] = {"alive": 1};
			cell[4][2] = {"alive": 0};
			cell[5][2] = {"alive": 0};

			cell[0][3] = {"alive": 0};
			cell[1][3] = {"alive": 0};
			cell[2][3] = {"alive": 0};
			cell[3][3] = {"alive": 1};
			cell[4][3] = {"alive": 0};
			cell[5][3] = {"alive": 0};

			cell[0][4] = {"alive": 0};
			cell[1][4] = {"alive": 0};
			cell[2][4] = {"alive": 0};
			cell[3][4] = {"alive": 1};
			cell[4][4] = {"alive": 0};
			cell[5][4] = {"alive": 0};

			cell[0][5] = {"alive": 0};
			cell[1][5] = {"alive": 0};
			cell[2][5] = {"alive": 0};
			cell[3][5] = {"alive": 0};
			cell[4][5] = {"alive": 0};
			cell[5][5] = {"alive": 0};
		}
	};

	this.run = function(){
	  	clear();
	  	console.log('\t\t\t~~~~~~~~~~~~Conway\'s game of life~~~~~~~~~~~~\n');
	  	display();
	};

	countNeighbors = function(x,y){
		var amount = 0;
		debugger;
		//check for alive cells around current cell
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y+1 > size-1 ? 0 : y+1].alive)amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y+1 > size-1 ? 0 : y+1].alive)amount++;
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y-1 < 0 ? size-1 : y-1].alive)amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y-1 < 0 ? size-1 : y-1].alive)amount++;	
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y])amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y])amount++;
		if(cell[x] && cell[x][y+1 > size-1 ? 0 : y+1].alive)amount++;
		if(cell[x] && cell[x][y-1 < 0 ? size-1 : y-1].alive)amount++;

		return amount;
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
			console.log(color.white.bgBlue(line));
		}
	};

	update = function(generationCount){
		clear();
	  	console.log('\t\t\t~~~~~~~~~~~~Conway\'s game of life Generation: '+generationCount+'~~~~~~~~~~~~\n');
	  	for(var x = 0; x < size; x++){
	  		for(var y = 0; y < size; y++){
	  			var count = countNeighbors(x,y);
	  			if(cell[x][y].alive){
		  			//loneliness or overcrowding
		  			if(count < 2 || count > 3){
		  				cell[x][y].alive = 0;
		  			}
		  			//reproduction or stasis
		  			if(count === 3 || count === 2){
		  				cell[x][y].alive = 1;
		  			}
	  			}
	  			// else{
	  			// 	if(count === 3){
	  			// 		cell[x][y].alive = 1;
	  			// 	}
	  			// }
	  		}
	  	}

	  	display();
	};

	this.update = function(){
		var generationCount = 0;
		setInterval(function(){
			update(generationCount); 
			generationCount++;
		}, 300);
	};

}

module.exports = Game;