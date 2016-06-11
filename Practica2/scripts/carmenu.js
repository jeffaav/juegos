CarMenu = function (game, x, y, key, size) {
    Phaser.Sprite.call(this, game, x, y, key);
    
    this.game = game;
    this.width = size;
    this.height = size;
    this.anchor.setTo(0.5);
    this.key = key;
    this.inputEnabled = true;
    this.events.onInputDown.add(this.select, this);
    
}

CarMenu.prototype = Object.create(Phaser.Sprite.prototype);
CarMenu.prototype.constructor = CarMenu;

CarMenu.prototype.select = function (car) {
    this.game.carKey = car.key;
    localStorage.carKey = car.key;
    this.game.state.start('Game');
}
