var color = require('cli-color');
var fs = require('fs');

var clear = function(){
  	process.stdout.write('\033c');
};

function Game(size,rowSize){
	var cell = [];
	this.size = size;
	this.rowSize = rowSize ? rowSize : size;

	this.init = function(random, type){
		console.log(type);
		if(random){
			for(var i=0; i < size; i++){
				cell[i] = [];
				for(var j=0; j < rowSize; j++){
					cell[i][j] = {"alive": Math.round(Math.random())};
				}
			}
		}
		else if(type){
			switch(type){
				case 'oscillators':{
					cell = getGridFromFile(type);
					console.log("size: "+ size);
					console.log(cell);
					break;
				}
				default:{

				}
			}
		}
		else{

		}
	};

	this.run = function(){
	  	clear();
	  	console.log('\t\t\t~~~~~~~~~~~~Conway\'s game of life~~~~~~~~~~~~\n');
	  	display();
	};

	this.update = function(){
		var generationCount = 0;
		setInterval(function(){
			update(generationCount); 
			generationCount++;
		}, 500);
	};

	getGridFromFile = function(type){
		switch(type){
			case 'oscillators':{
				var obj = JSON.parse(fs.readFileSync('./'+type+'.json', 'utf8'));
				return parseGridData(obj);
			}
			default:{

			}
		}
	};

	parseGridData = function(data){
		size = data.length;
		rowSize = data[0].length;
		console.log(rowSize);
		return data;
	};

	countNeighbors = function(x,y){
		var amount = 0;
		//check for alive cells around current cell
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y+1 > rowSize-1 ? 0 : y+1].alive)amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y+1 > rowSize-1 ? 0 : y+1].alive)amount++;
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y-1 < 0 ? rowSize-1 : y-1].alive)amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y-1 < 0 ? rowSize-1 : y-1].alive)amount++;	
		if(cell[x+1 > size-1 ? 0 : x+1] && cell[x+1 > size-1 ? 0 : x+1][y].alive)amount++;
		if(cell[x-1 < 0 ? size-1 : x-1] && cell[x-1 < 0 ? size-1 : x-1][y].alive)amount++;
		if(cell[x] && cell[x][y+1 > rowSize-1 ? 0 : y+1].alive)amount++;
		if(cell[x] && cell[x][y-1 < 0 ? rowSize-1 : y-1].alive)amount++;

		return amount;
	};

	display = function(){
		for(var i=0; i < size; i++){
			var line = '';
			for(var j=0; j< rowSize; j++){
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

	  	var nextGenGrid = [];

	  	for(var x = 0; x < size; x++){
	  		nextGenGrid[x] = [];
	  		for(var y = 0; y < rowSize; y++){
	  			var count = countNeighbors(x,y);
	  			var alive = 0;
	  			if(cell[x][y].alive){
		  			//loneliness or overcrowding
		  			if(count < 2 || count > 3){
		  				alive = 0;
		  			}
		  			//reproduction or stasis
		  			if(count === 3 || count === 2){
		  				alive = 1;
		  			}
	  			}
	  			else{
	  				if(count === 3){
	  					alive = 1;
	  				}
	  			}

	  			nextGenGrid[x][y] = {"alive": alive};
	  		}
	  	}

	  	cell = nextGenGrid;
	  	display();
	};

}

module.exports = Game;