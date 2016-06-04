Platform = function (game, numTiles, x, y) {
    Phaser.Group.call(this, game);
    game.add.existing(this);
    
    this.tileSize = 40;
    this.game = game;
    this.speed = -100;
    this.prepare(numTiles, x, y);
}

Platform.prototype = Object.create(Phaser.Group.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.prepare = function (numTiles,x,y) {
    for (var i = 0; i < numTiles; i++) {
        var floor = new Phaser.Sprite(this.game,x + i * this.tileSize,y,'floor');
        this.game.physics.arcade.enable(floor);
        this.add(floor);
    }
    
    this.setAll('body.immovable', true);
    this.setAll('body.allowGravity', false);
    this.setAll('body.velocity.x', this.speed);
}