Game = function(){}

Game.prototype = {
	init:function(data){
		this.ROWS = 8;
		this.COLS = 6;
		this.TILE_SIZE = 60;
		data = data || {};
		this.currentLevel = data.currentLevel || 1;
		this.playerStats = data.playerStats || {
			health:25,
			attack:2,
			defense:1,
			gold:0,
			hasKey: false
		};
		
	},
	create:function(){
		this.backgroundTiles = this.game.add.group();
		this.mapItems = this.game.add.group();
		
		
		this.levelData = 
			JSON.parse(this.game.cache.getText("gameBaseData"));
		this.board = new Board(this,{
			rows:this.ROWS,
			cols:this.COLS,
			tileSize:this.TILE_SIZE,
			levelData: this.levelData
		});
		
		this.board.initLevel();
		
		/*this.item = new Item(this,{
			row:3,
			col:3,
			asset:"sword"
		});
		this.mapItems.add(this.item);*/
		
	
		this.initGUI();
	},
	
	initGUI:function(){
		var y = this.TILE_SIZE * this.ROWS;
		var bitmapRect = this.game.add.bitmapData(this.game.width,
							this.game.height - y);
		bitmapRect.ctx.fillStyle = "#000058";
		bitmapRect.ctx.fillRect(0,0,bitmapRect.width,
						bitmapRect.height);
		this.panel = this.game.add.sprite(0,y,bitmapRect);
			
		var style = {
	      font: '7px Prstart',
	      fill: '#fff',
	      align: 'left'
	    };
	
	    //health
	    this.healthIcon = this.add.sprite(this.game.width - 110, y -10 + this.TILE_SIZE/2, 'heart');
	    this.healthLabel = this.add.text(this.game.width - 70, y -10 + this.TILE_SIZE/2 + 5, '', style);
	
	    //attack
	    this.attackIcon = this.add.sprite(this.game.width - 110, y -10 + 2 * this.TILE_SIZE/2, 'attack');
	    this.attackLabel = this.add.text(this.game.width - 70, y -10 + 2 * this.TILE_SIZE/2 + 5, '', style);
	
	    //defense
	    this.defenseIcon = this.add.sprite(this.game.width - 110, y -10 + 3 * this.TILE_SIZE/2, 'defense');
	    this.defenseLabel = this.add.text(this.game.width - 70, y -10 + 3 * this.TILE_SIZE/2 + 5, '', style);
	
	    //gold
	    this.goldIcon = this.add.sprite(this.game.width - 110, y -10 + 4 * this.TILE_SIZE/2, 'gold');
	    this.goldLabel = this.add.text(this.game.width - 70, y -10 + 4 * this.TILE_SIZE/2 + 5, '', style);
	
	    //character image
	    this.charImage = this.add.sprite(30, y + 16, 'profile');
	
	    //level text
	    style = {
	      font: '10px Arial',
	      fill: '#fff',
	      align: 'left'
	    };
	    this.levelLabel = this.add.text(45, this.game.height - this.TILE_SIZE/2, '', style);
	    this.updatePlayerStats();
	},
	
	updatePlayerStats:function(){
		this.healthLabel.text = this.playerStats.health;
		this.attackLabel.text = this.playerStats.attack;
		this.defenseLabel.text = this.playerStats.defense;
		this.goldLabel.text = this.playerStats.gold;
		this.levelLabel.text = "Floor "+this.currentLevel;
	},

	gameOver:function(){
		this.game.state.start('Game');
	},

	nextLevel:function(){
		this.game.state.start('Game',true,false,{
			currentLevel:currentLevel + 1,
			playerStats:this.playerStats
		});
	}
}