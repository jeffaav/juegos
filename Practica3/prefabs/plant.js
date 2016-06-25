Plant = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'plant', 0);
    game.add.existing(this);
    game.physics.arcade.enable(this);
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game = game;
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.speed = 400;
    this.bulletCount = 30;
    this.bullets = this.game.add.group();
    this.points = 0;
    this.canShoot = true;
    this.shootingElapsed = 0;
    this.shootingTime = 100;
    this.isDead = false;
    this.lifes = this.game.add.group();
    
    var size = 20;
    for (var i = 0; i < 3; i++) {
        var life = this.game.add.sprite(i * (size + 5)  + 5, 5, 'plant');
        life.width = size;
        life.height = size;
        this.lifes.add(life);
    }
    
    this.life = this.lifes.length;
    
    console.log(this.lifes.length);
    
    //this.animations.add('move',[1,2,1],6,true);
    //this.animations.play('move');
    
    this.bulletText = this.game.add.text(this.game.world.width-100, 5, 'balas: ' + this.bulletCount, {
        font: '20px pixel',
        fill: '#fff'
    });
    
    this.pointsText = this.game.add.text(this.game.world.width-210, 5, 'puntos: ' + this.points, {
        font: '20px pixel',
        fill: '#fff'
    }); 
}

Plant.prototype = Object.create(Phaser.Sprite.prototype);
Plant.prototype.constructor = Plant;

Plant.prototype.update = function () {
    if(this.cursors.up.isDown){
    	this.body.velocity.y = -this.speed;
    }
    else if(this.cursors.down.isDown){
    	this.body.velocity.y = this.speed;
    } else {
        this.body.velocity.y = 0;
    }
    
    if (this.spaceBar.isDown && this.bulletCount > 0 && this.canShoot) {
        this.createBullet();
    }
    
    if (!this.canShoot) {
        this.shootingElapsed += this.game.time.elapsed;
    }
    
    if (this.shootingElapsed >= this.shootingTime) {
        this.shootingElapsed = 0;
        this.canShoot = true;
    }
}

Plant.prototype.createBullet = function () {
    var bullet = this.bullets.getFirstDead();
    
    if (!bullet) {
        bullet = this.game.add.sprite(this.x, this. y, 'bullet');
        bullet.anchor.setTo(0.5);
        this.game.physics.arcade.enable(bullet);
        this.bullets.add(bullet);
    } else {
        bullet.reset(this.x, this.y);
        bullet.body.velocity.x = 100;
    }
    
    this.bulletCount--;
    this.canShoot = false;  
    this.updateBulletText();
}

Plant.prototype.updateBulletText = function () {
    this.bulletText.text = 'balas: ' + this.bulletCount;    
}

Plant.prototype.updatePointsText = function () {
    this.pointsText.text = 'puntos: ' + this.points;    
}

Plant.prototype.reduceLife = function () {
    if (this.life >= 1) {
        this.life--;
        this.lifes.children[this.life].kill();
    }

    if (this.life < 1) {
        this.isDead = true;
    }
}

