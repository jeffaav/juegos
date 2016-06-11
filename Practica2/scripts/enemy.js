Enemy = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    game.add.existing(this);
    
    this.game.physics.arcade.enable(this);
    this.body.velocity.y = 200;
    this.anchor.setTo(0.5);
    this.body.outOfBoundskill = true;
    this.width = 100;
    this.height = 100;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    
}