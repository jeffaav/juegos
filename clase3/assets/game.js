var Game = function (game) {
	
}

Game.prototype = {
	create: function () {
		this.elapsed = 0;
		this.bg = this.game.add.sprite(0,0,'road');
		this.cars = [];
		this.colors = [0xff0000,0x0000ff];
		this.carGroup = this.game.add.group();
		this.enemiesGroup = this.game.add.group();

		for (var i = 0; i < 2; i++) {
			var car = this.game.add.sprite(0,this.game.world.height-80,'car');
			car.anchor.setTo(0.5);
			car.tint = this.colors[i];
			car.positions = [this.game.width*(i*4+1)/8, this.game.width*(i*4+3)/8];
			car.side = i;
			car.x = car.positions[i];
			car.canMove = true;
			this.game.physics.enable(car,Phaser.Physics.ARCADE);
			this.carGroup.add(car);

			this.cars.push(car);
		}

		this.game.input.onDown.add(this.move, this);
	},
	move: function (e) {
		var position = Math.floor(e.position.x / (this.game.width/2));
		var car = this.cars[position];

		if (car.canMove) {
			car.canMove = posFinal;

			var steerTween = this.game.add.tween(car)
				.to({angle: 20-40 * car.side}, 250, null, true);

			steerTween.onComplete.add(function () {
				this.game.add.tween(car).to({angle: 0}, 250, null, true);
			});

			car.side = 1 - car.side;

			var posFinal = car.positions[car.side];
			var moveTween = this.game.add.tween(car)
				.to({ x: posFinal}, 500, null, true);

			moveTween.onComplete.add(function () {
				car.canMove = true;
			});
		}
		
	},
	update: function () {
		if (this.elapsed < this.game.time.now) {
			this.elapsed = this.game.time.now + 1200;
			this.generateObstacles();
		}

		this.game.physics.arcade.overlap(this.carGroup, this.enemiesGroup, function (car, enemy) {
			if (enemy.key = 'obstacle') {
				enemy.kill();
			}
			
		}, null, this);
	},
	generateObstacles: function () {
		for (var i = 0; i < 2; i++) {
			var enemy;
			if (this.game.rnd.between(0,1) == 1) {
				enemy = this.game.add.sprite(0,0,'target');
			} else {
				enemy = this.game.add.sprite(0,0,'obstacle');
			}
			var position = this.game.rnd.between(0,1) + 2 * i;
			enemy.y = -20;
			enemy.x = this.game.width * (position * 2 +1) / 8;
			enemy.tint = this.colors[Math.floor(position/2)];
			enemy.anchor.setTo(0.5);
			this.game.physics.enable(enemy,Phaser.Physics.ARCADE);
			enemy.body.velocity.y = 100;

			this.enemiesGroup.add(enemy);
		}
	}
}