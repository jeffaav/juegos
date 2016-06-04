Preload = function(game){
    
}

Preload.prototype = {
    preload:function(){
        this.preloading = this.game.add.sprite(0,0,'loading');
        this.preloading.anchor.setTo(0.5);
        
        this.preloading.x = this.game.world.centerX;
        this.preloading.y = this.game.world.centerY;
        
        this.game.load.setPreloadSprite(this.preloading);
        
        
        this.game.load.image('floor', 
        'assets/images/floor.png');
        this.game.load.image('water', 
        'assets/images/water.png');
        this.game.load.image('coin', 
        'assets/images/coin.png');
        this.game.load.image('background', 
        'assets/images/background.png');
        this.game.load.spritesheet('player', 
            'assets/images/player_spritesheet.png', 
            51, 67, 5, 2, 3);
            
    },
    create:function(){
        this.game.state.start('Game');
    }
}