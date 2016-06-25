Sun = function (game) {
    var posX = game.rnd.between(0, game.world.width);
    
    Phaser.Sprite.call(this, game, posX, 0, 'sun', 3);
    game.add.existing(this);
    game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5);
    this.body.velocity.y = 50;
    
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;
    
    this.inputEnabled = true;
    this.events.onInputDown.add(function (sun) {
        this.game.plant.bulletCount++;
        this.game.plant.updateBulletText();
        sun.kill();
    }, this);
}

Sun.prototype = Object.create(Phaser.Sprite.prototype);
Sun.prototype.constructor = Sun;