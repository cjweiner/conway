
var clear = function(){
  	process.stdout.write('\033c');
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
	  	clear();
	  	console.log('\t\t\t~~~~~~~~~~~~Conway\'s game of life~~~~~~~~~~~~\n');
	  	display();
	};

	countNeighbors = function(x,y){
		var amount = 0;

		//check for alive cells around current cell
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y+1 > size-1 ? 0 : y+1].alive)amount++;
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y-1 < 0 ? size-1 : y-1].alive)amount++;
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y].alive)amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y+1 > size-1 ? 0 : y+1].alive)amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y-1 < 0 ? size-1 : y-1].alive)amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y].alive)amount++;
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
			console.log(line);
		}
	};

	update = function(generationCount){
		clear();
	  	console.log('\t\t\t~~~~~~~~~~~~Conway\'s game of life Generation: '+generationCount+'~~~~~~~~~~~~\n');
	  	for(var x = 0; x < size; x++){
	  		for(var y = 0; y < size; y++){
	  			var count = countNeighbors(x,y);
	  			//loneliness or overcrowding
	  			if(count < 2 || count > 3){
	  				cell[x][y].alive = 0;
	  				continue;
	  			}
	  			//reproduction or stasis
	  			if(count === 3 || count === 2){
	  				cell[x][y].alive = 1;
	  				continue;
	  			}
	  		}
	  	}

	  	display();
	};

	this.update = function(){
		var generationCount = 0;
		setInterval(function(){update(generationCount); generationCount++;}, 1000);
	};

}

module.exports = Game;