var Preload = function (game) {
}

Preload.prototype = {
    preload: function () {
        this.preloading = this.game.add.sprite(0,0,'loading');
        
        this.preloading.anchor.setTo(0.5);
        this.preloading.scale.setTo(3);
        
        this.preloading.x= this.game.centerX;
        this.preloading.y= this.game.centerY;
        
        this.game.load.setPreloadSprite(this.preloading);
        
        
        
        this.game.load.image('floor', '/clase8/assets/images/floor.png');
        this.game.load.image('water', '/clase8/assets/images/water.png');
        this.game.load.image('coin', '/clase8/assets/images/coin.png');
        this.game.load.image('background', '/clase8/assets/images/background.png');
        this.game.load.spritesheet('player', '/clase8/assets/images/player_spritesheet.png', 51, 67, 5, 2, 3);
    },
    create: function () {
        this.game.state.start('Game');
    }
}