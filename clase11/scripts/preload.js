Preload = function (game) {
    
}

Preload.prototype = {
    preload: function () {
        this.game.load.image('gameTiles', 'assets/tiles_spritesheet.png');
        this.game.load.image('slime', 'assets/slime.png');
        this.game.load.image('goal', 'assets/goal.png');
        this.game.load.tilemap('demo','maps/demo-level.json',null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level1','maps/level1.json',null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level2','maps/level2.json',null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('player', 'assets/player_spritesheet.png', 28,30,5,1,1);
    },
    create: function () {
        this.game.state.start('Game');
    },
}