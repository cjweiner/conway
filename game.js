var color = require('cli-color');
var fs = require('fs');
var _ = require('underscore');

var clear = function(){
  	process.stdout.write('\033c');
};

function Game(colSize,rowSize){
	var cell = [];
	this.colSize = colSize;
	this.rowSize = rowSize ? rowSize : colSize;

	this.init = function(random, type){
		console.log("init rowSize:" + this.rowSize);
		console.log("random:" + random);
		if(random){
			console.log('hitting random seed loop');
			for(var i=0; i < this.colSize; i++){
				cell[i] = [];
				for(var j=0; j < this.rowSize; j++){
					console.log("colSize:"+this.colSize);
					cell[i][j] = {"alive": Math.round(Math.random())};
				}
			}
		}
		else if(type){
            cell = this.getGridFromFile(type);
		}
		else{

		}
	};

	this.run = function(){
	  	clear();
	  	console.log('\t\t\t~~~~~~~~~~~~Conway\'s game of life~~~~~~~~~~~~\n');
	  	console.log("run colSize,rowSize:" +this.colSize +','+this.rowSize);
	  	this.display();
	};

	this.update = function(){
		var generationCount = 0;
		var timerId = setInterval(function(obj){
            var exit = obj.updateGrid(generationCount);
            if (exit) {
                clear();
                console.log('All cells are dead stopping simulation...');
                clearInterval(timerId);
                return;
            }
			generationCount++;
        }, 500, this);
	};

	this.getGridFromFile = function(type){
		if(type){
			var obj = JSON.parse(fs.readFileSync('./'+type+'.json', 'utf8'));
			return this.parseGridData(obj);
		}
	};

	this.parseGridData = function(data){
		this.colSize = data.length;
		this.rowSize = data[0].length;
		return data;
	};

	this.countNeighbors = function(x,y){
		var amount = 0;
		var rowSize = this.rowSize;
		var size = this.colSize;
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

	this.display = function(){
		console.log("display func colSize,rowSize:"+this.colSize+','+this.rowSize);
		for(var i=0; i < this.colSize; i++){
			var line = '';
			for(var j=0; j< this.rowSize; j++){
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

	this.updateGrid = function(generationCount){
		clear();
	  	console.log('\t\t\t~~~~~~~~~~~~Conway\'s game of life Generation: '+generationCount+'~~~~~~~~~~~~\n');

	  	var nextGenGrid = [];

	  	for(var x = 0; x < this.colSize; x++){
	  		nextGenGrid[x] = [];
	  		for(var y = 0; y < this.rowSize; y++){
	  			var count = this.countNeighbors(x,y);
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
        if (_.isEqual(cell,nextGenGrid)) {
            return true;
        }
	  	cell = nextGenGrid;
	  	this.display();
	};

}

module.exports = Game;