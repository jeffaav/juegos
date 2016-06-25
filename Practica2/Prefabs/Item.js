Item = function(state,data){
	this.state = state;
	this.game = state.game;
	var position = state.board.getXYFromRowCell(data);
	this.data = data;
	this.row = data.row;
	this.col = data.col;
	Phaser.Sprite.call(this,this.game,position.x,position.y,data.asset);
	this.anchor.setTo(0.5);
	
	this.health = data.health;
	this.attack = data.attack;
	this.defense = data.defense;
	this.gold = data.gold;
	this.type = data.type;
	this.inputEnabled = true;
	this.events.onInputDown.add(this.collect,this);
};

Item.prototype = Object.create(Phaser.Sprite.prototype);
Item.prototype.constructor = Item;

Item.prototype.collect = function(){
	if(this.type == "consumable"){
		this.state.playerStats.attack+=this.attack;
		this.state.playerStats.defense+=this.defense;
		this.state.playerStats.health+=this.health;
		this.state.playerStats.gold+=this.gold;
		this.state.updatePlayerStats();
		this.kill();
	}
}