var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
	preload: preload,
	create: create,
	update: update
});

var number, 
	higher, 
	lower, 
	guest = 0,
	high = false,
	workingButtons = true,
	gameOver = false,
	gameOverScreen;

function preload() {
	game.load.image('gametitle', '/gametitle.png');
	game.load.image('gameover', '/gameover.png');
	game.load.image('higher', '/higher.png');
	game.load.image('loading', '/loading.png');
	game.load.image('lower', '/lower.png');
	game.load.spritesheet('numbers', '/numbers.png', 100, 100);
	game.load.image('pin', '/pin.png');
	game.load.image('play', '/play.png');
	game.load.image('wheel', '/wheel.png');
}

function create() {
	number = game.add.image(0,0,'numbers');

	number.anchor.setTo(0.5);
	number.x = game.world.centerX;
	number.y = game.world.centerY;
	number.frame = Math.floor(Math.random()*10);

	higher = game.add.button(0,0,'higher', callHigh);
	higher.anchor.setTo(0.5);
	higher.x = game.world.centerX;
	higher.y = higher.height;

	lower = game.add.button(0,0,'lower', callLower);
	lower.anchor.setTo(0.5);
	lower.x = game.world.centerX;
	lower.y = game.world.height - lower.height;
}

function callHigh(higher) {
	high = true;
	tryGuest();
}

function callLower(lower) {
	high = false;
	tryGuest();
}

function tryGuest() {

	if (workingButtons) {
		guest = Math.floor(Math.random()*10);
		console.log(guest);

		if (high && guest > number.frame) {
			gameOver = false;
		} else if (!high && guest < number.frame) {
			gameOver = false;
		} else {
			gameOver = true;
		}

		var tween = game.add.tween(number).to({
			x:-180
		}, 500);
		tween.start();
		tween.onComplete.add(restart);

		workingButtons = false;
	}
}

function restart() {

	if (!gameOver) {
		number.x = 1000;
	 	number.frame = Math.floor(Math.random()*10);

	 	var tween = game.add.tween(number).to({
	 		x: game.world.centerX
	 	}, 500);

	 	tween.start();
	 	tween.onComplete.add(function () {
	 		workingButtons = true;
	 	});
	}
 } 

 function callGameOver() {
 	number.kill();
 	higher.kill();
 	lower.kill();

 	gameOverScreen = game.add.sprite(0,0,'gameover');
 }

function update() {
		
}