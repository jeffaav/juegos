var Preload = function (game) {
	
}

Preload.prototype = {
	preload: function () {
		this.game.load.image('car', 'car.png');
		this.game.load.image('numbers', 'numbers.png');
		this.game.load.image('obstacle', 'obstacle.png');
		this.game.load.image('road', 'road.png');
		this.game.load.image('target', 'target.png');

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	},
	create: function () {
		this.game.state.start('Game');
	}
}