var wheel, 
	pin,
	canSpin = true,
	slices = 8,
	prizes = ['A KEY', '50 STARS', '500 STARS', 'BAD LUCK', '200 STARS', '100 STARTS', '150 STARTS', 'BAD LUCK'],
	prize;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
	preload: function () {
		game.load.image('pin', 'pin.png');
		game.load.image('wheel', 'wheel.png');

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	},
	create: function () {
		wheel = game.add.sprite(game.width/2, game.height/2, 'wheel');
		wheel.anchor.setTo(0.5);

		spin = game.add.sprite(game.width/2, game.height/2, 'pin');
		spin.anchor.setTo(0.5);

		game.input.onDown.add(spinWheel);
	}
});

function spinWheel() {
	if (canSpin) {
		canSpin = false;

		var rounds = game.rnd.between(2,4);
		var degress = game.rnd.between(0,360);

		prize = slices - 1 - Math.floor(degress / (360/slices));

		var spinTween = game.add.tween(wheel).to({
			angle: 360 * rounds + degress
		}, 300, null, true);

		spinTween.onComplete.add(winPrize);
	}

	
}

function winPrize() {
	canSpin = true;
	console.log(winPrize);
}