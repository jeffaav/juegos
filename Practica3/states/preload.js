var Preload = function (game) {
    
}

Preload.prototype = {
    preload: function () {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('chilli', 'assets/images/chilli.png');
    
        this.game.load.spritesheet('zombie', 'assets/images/zombie_sheet.png', 30, 50, 3, 1, 2);
        this.game.load.spritesheet('plant', 'assets/images/plant_sheet.png', 24, 40, 3, 1, 2);
        this.game.load.spritesheet('sun', 'assets/images/sun_sheet.png', 30, 30, 2, 1, 2);
        this.game.load.spritesheet('chicken', 'assets/images/chicken_sheet.png', 25, 25, 3, 1, 2);
    },
    create: function () {
        this.game.state.start('Game');
    }
}