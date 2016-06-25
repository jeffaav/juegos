Board = function(state,data){
	this.state = state;
	this.game = this.state.game;
	this.rows = data.rows;
	this.cols = data.cols;
	this.numCells = this.rows* this.cols;
	this.tileSize = data.tileSize;
	this.mapItems = state.mapItems;
	this.levelData = data.levelData;
	this.coefs = this.levelData.coefs;

	var tile;
	for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			tile = new Phaser.Sprite(this.game,j*this.tileSize,
					i*this.tileSize,'rockTile');
			tile.row = i;
			tile.col = j;
			tile.inputEnabled = true;
			/*tile.events.onInputDown.add(function(tile){
				//tile.alpha = 0.5;
			},
				this);*/
			this.state.backgroundTiles.add(tile);
		}
	}
}

Board.prototype.getSurrounding = function(tile){
	var adjacentTiles = [];
	var relativePositions = [
		{r:1,c:-1},
		{r:1,c:0},
		{r:1,c:1},
		{r:0,c:-1},
		{r:0,c:1},
		{r:-1,c:-1},
		{r:-1,c:0},
		{r:-1,c:1},
	];

	var relRow, relCol;
	relativePositions.forEach(function(relPos){
		relRow = tile.row + relPos.r;
		relCol = tile.col + relPos.c;
		if(relRow >= 0 && relRow < this.rows && 
				relCol >= 0 && relCol < this.cols
		){
			adjacentTiles.push({row:relRow,col:relCol});
		}
	},this);
	return adjacentTiles;
}

Board.prototype.getXYFromRowCell = function(tile){
	return{
		x:tile.col *this.tileSize + this.tileSize/2,
		y:tile.row *this.tileSize + this.tileSize/2
	}
}

Board.prototype.getFreeCell = function(){
	var freeCell = false, foundCell = false;
	var row, col ,i;
	var len = this.mapItems.length;
	
	while(!freeCell){
		foundCell = false;
		row = this.game.rnd.integerInRange(0,this.rows);
		col = this.game.rnd.integerInRange(0,this.cols);
		
		for (i = 0; i < len; i++) {
			var element = this.mapItems.children[i];
			if(element.alive &&
				element.row == row && element.col == col
			){
				foundCell = true;
				break;
			}
		}
		if(!foundCell){
			freeCell = {row:row,col:col};
		}
	}
	return freeCell;
}

Board.prototype.initLevel = function(){
	this.initItems();
	this.initEnemies();
}

Board.prototype.randomBetween = function(min, max){
	var numBetween = min + Math.random() * (max - min);
	return numBetween;
}

Board.prototype.initItems = function(){
	var numItems = Math.round(this.numCells * this.coefs.itemOccupation * 
	this.randomBetween(1-this.coefs.itemVariation,1+this.coefs.itemVariation));
	var i = 0;
	var type;
	var itemData, newItem, cell;
	while(i<numItems){
		type = this.game.rnd.integerInRange(0,this.levelData.itemTypes.length-1);	
		itemData = Object.create(this.levelData.itemTypes[type]);
		//itemData.board = this;
		itemData.health = itemData.health || 0;
		itemData.attack = itemData.attack || 0;
		itemData.defense = itemData.defense || 0;
		itemData.gold = itemData.gold || 0;
		cell = this.getFreeCell();
		itemData.row = cell.row;
		itemData.col = cell.col;
		newItem = new Item(this.state,itemData);
		this.mapItems.add(newItem);
		i++;
	}
}

Board.prototype.initEnemies = function(){
	var numItems = Math.round(this.numCells * this.coefs.enemyOccupation * 
	this.randomBetween(1-this.coefs.itemVariation,1+this.coefs.itemVariation));
	var i = 0;
	var type;
	var enemyData, newEnemy, cell;
	
	while(i<numItems){
		type = this.game.rnd.integerInRange(0,this.levelData.enemyTypes.length-1);	
		enemyData = Object.create(this.levelData.enemyTypes[type]);
		//itemData.board = this;
		enemyData.health = enemyData.health || 0;
		enemyData.attack = enemyData.attack || 0;
		enemyData.defense = enemyData.defense || 0;
		enemyData.gold = enemyData.gold || 0;
		cell = this.getFreeCell();
		enemyData.row = cell.row;
		enemyData.col = cell.col;
		newEnemy = new Enemy(this.state,enemyData);
		this.mapItems.add(newEnemy);
		i++;
	}
	
	
}

Board.prototype.generateExit = function(){
	var cell = this.getFreeCell();
	var exit = new Item(this.state, {
		asset:'exit',
		row: cell.row,
		col: cell.col,
		type: 'exit'
	});
	this.mapItems.add(exit);
}