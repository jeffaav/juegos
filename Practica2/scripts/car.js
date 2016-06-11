Car = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    game.add.existing(this);
    
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.anchor.setTo(0.5);
    this.canMove = true;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.body.collideWorldBounds = true;
    this.width = 100;
    this.height = 100;
}

Car.prototype = Object.create(Phaser.Sprite.prototype);
Car.prototype.constructor = Car;

Car.prototype.update = function () {
    if(this.cursors.left.isDown){
    	this.body.velocity.x = -550;
    }
    else if(this.cursors.right.isDown){
    	this.body.velocity.x = 550;
    } else {
        this.body.velocity.x = 0;
    }
}