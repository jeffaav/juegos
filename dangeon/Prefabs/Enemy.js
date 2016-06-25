Enemy = function(state,data){
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
	this.events.onInputDown.add(this.fight,this);
	
	var x = 0;
	var y = -4;
	
	
	var bitmapRect = this.game.add.bitmapData(28, 32);
	bitmapRect.ctx.fillStyle = '#0000FF';
	bitmapRect.ctx.fillRect(0 ,0, 28, 32);
	
	//sprite for the enemy stats
	this.panel = new Phaser.Sprite(this.game, x -2 , y - 2, bitmapRect);
	this.panel.alpha = 0.6;
	this.addChild(this.panel);
	
	var style = {
	  font: '7px Arial',
	  fill: '#fff',
	  align: 'left'
	};
	
	this.healthIcon = new Phaser.Sprite(this.game, x, y, 'heart');
	this.healthIcon.scale.setTo(0.3);
	this.addChild(this.healthIcon);
	
	this.healthLabel = new Phaser.Text(this.game, x + 10, y, '', style);
	this.addChild(this.healthLabel);
	
	this.attackIcon = new Phaser.Sprite(this.game, x, y + 10, 'attack');
	this.attackIcon.scale.setTo(0.35);
	this.addChild(this.attackIcon);
	
	this.attackLabel = new Phaser.Text(this.game, x + 10, y + 10, '', style);
	this.addChild(this.attackLabel);
	
	this.defenseIcon = new Phaser.Sprite(this.game, x, y + 20, 'shield');
	this.defenseIcon.scale.setTo(0.2);
	this.addChild(this.defenseIcon);
	
	this.defenseLabel = new Phaser.Text(this.game, x + 10, y + 20, '', style);
	this.addChild(this.defenseLabel);

	this.updateStats();
	
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.updateStats = function(){
	this.healthLabel.text = this.data.health;
	//this.goldLabel.text = this.data.gold;
	this.attackLabel.text = this.data.attack;
	this.defenseLabel.text = this.data.defense;
	
}

Enemy.prototype.fight = function(){
	var attacker = this.state.playerStats;
	var attacked = this.data;
	
	var damageAttacked = Math.max(0.5, attacker.defense * Math.random());
	var damagePlayer = Math.max(0.5, attacked.attack * Math.random() - player.defense * Math.random());
	
	var tweenAttack = this.game.add.tween(this);
	tweenAttack.to({tint:0xFF0000},300);
	tweenAttack.start();
	tweenAttack.onComplete.add(function(){
		if (player.health <= 0) {
			this.state.gameOver();
		}
		if (attacked.health <= 0) {
			this.state.playerStats.gold += attacked.gold;
			this.kill();
		}
		this.updateStats();
		this.updatePlayerStats();
		this.tint = 0xFFFFFF;
	},this);
}