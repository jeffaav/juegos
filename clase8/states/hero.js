Hero = function (game) {
    Phaser.Sprite.call(this, game, 100, 150, 'player', 4);
    game.add.existing(this);
    game.physics.arcade.enable(this);
    
    this.game = game;
    
    this.x = 10;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.animations.add('running',[0,1,2,3,2,1],15,true);
    this.anchor.setTo(0.5);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.isJumping = false;
    this.jumpPeaked = false;
    this.startY = 0;
    this.maxJumpDistance = 250;
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.update = function () {
    this.body.velocity.x = 0;
    this.jump();
    
    if(this.cursors.left.isDown){
    	this.body.velocity.x = -200;
    	this.scale.setTo(-1,1);
    	this.animations.play('running');
    }
    else if(this.cursors.right.isDown){
    	this.body.velocity.x = 200;
    	this.scale.setTo(1);
    	this.animations.play('running');
    }else{
    	this.frame = 0;
    }
}

Hero.prototype.jump = function () {
    if (this.cursors.up.isUp || this.game.input.activePointer.isUp) {
        this.isJumping = false;
    }
    if(this.body.touching.down) {
        if (this.cursors.up.isDown || this.game.input.activePointer.isDown) {
            this.startY = this.y;
            this.body.velocity.y = -400;   
            this.isJumping = true;
            this.jumpPeaked = false;
        }
    } else if (this.isJumping && !this.jumpPeaked){
        var distance = this.startY - this.y;
        console.log(distance);
        if (distance <= this.maxJumpDistance) {
            this.body.velocity.y = -400;
        } else {
            this.jumpPeaked = true;
        }
        //this.body.velocity.y = -300;
    }
}