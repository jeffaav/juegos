Hero = function(game){
    Phaser.Sprite.call(this,game,
                    100,150,'player');
    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.game = game;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.animations.add('running',[2,3,4,3],15,true);
    this.anchor.setTo(0.5);
    this.isJumping = false;
    this.jumpPeaked = false;
    this.startY = 0;
    this.maxJumpDistance = 120;
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.update = function(){
	this.body.velocity.x = 0;
    if(this.cursors.up.isDown 
                || this.game.input.activePointer.isDown){
        this.jump();
    }
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

Hero.prototype.jump = function(){
	if(this.cursors.up.isUp || this.game.input.activePointer.isUp){
		isJumping = false;
	}
	if(this.body.touching.down) {
		this.startY = this.y;
		this.body.velocity.y = -300;		
		this.isJumping = true;
		this.jumpPeaked = false;
	}else if(this.isJumping && !this.jumpPeaked){
		var distance = this.startY - this.y;
		if(distance<= this.maxJumpDistance){
			this.body.velocity.y = -300;	
		}else{
			this.jumpPeaked = true;
		}
		
	}
}