var Preload = function (game) {
    
}

Preload.prototype = {
    preload: function () {
        this.game.load.image('background', '/assets/background-texture.png');
        this.game.load.image('wall', '/assets/wall.png');      
        //this.game.load.image('player', '/assets/wall.png');
        this.game.load.spritesheet('player', 'assets/player.png', 48, 48);
    },
    create: function () {
        this.game.state.start('Game');
    }
}