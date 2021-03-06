Preload = function(){}

Preload.prototype = {
	preload:function(){
		this.load.image('rockTile', 'assets/images/rock-land3.png');
	    this.load.image('darkTile', 'assets/images/darkTile.png');
	    this.load.image('cherry', 'assets/images/potion.png');
	    this.load.image('sword', 'assets/images/battlehammer.png');
	    this.load.image('shield', 'assets/images/shield.png');
	    this.load.image('chest', 'assets/images/chest-gold.png');
	    this.load.image('heart', 'assets/images/heart.png');
	    this.load.image('attack', 'assets/images/attack.png');
	    this.load.image('defense', 'assets/images/defense.png');
	    this.load.image('gold', 'assets/images/gold.png');
	    this.load.image('profile', 'assets/images/profile.png');
	    this.load.image('start', 'assets/images/start.png');
	    this.load.image('exit', 'assets/images/exit.png');
	    this.load.image('key', 'assets/images/key green.png');
	    this.load.image('snake', 'assets/images/desert-snake.png');
	    this.load.image('skeleton', 'assets/images/swordskeleton.png');
	    this.load.image('mummy', 'assets/images/mummyjewel.png');
	    this.load.image('demon', 'assets/images/demon.png');
	    this.load.image('orc', 'assets/images/orc.png');
	    
	    this.load.text("gameBaseData","assets/data/gameBaseData.json");
	},
	create:function(){
		this.game.state.start('Game');
	}
}