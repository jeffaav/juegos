var Preload = function (game) {
}

Preload.prototype = {
    preload: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //this.game.load.image('', '');
    },
    create: function () {
        this.game.state.start('Game');
    }
}