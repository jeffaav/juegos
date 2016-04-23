var Preload = function (game) {
}

Preload.prototype = {
    preload: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        
        this.game.load.image('creamVanilla', 'assets/creamVanilla.png');
        this.game.load.image('cupCake', 'assets/cupCake.png');
        this.game.load.image('game', 'assets/game.png');
        this.game.load.image('gameover', 'assets/gameover.png');
        this.game.load.image('gummyWormRedHead', 'assets/gummyWormRedHead.png');
        this.game.load.image('heart', 'assets/heart.png');
        this.game.load.image('lollipopFruitYellow', 'assets/lollipopFruitYellow.png');
        this.game.load.image('lollipopGreen', 'assets/lollipopGreen.png');
        this.game.load.image('medalBronze', 'assets/medalBronze.png');
        this.game.load.image('medalGold', 'assets/medalGold.png');
        this.game.load.image('medalSilver', 'assets/medalSilver.png');
        this.game.load.image('menu', 'assets/menu.png');
        this.game.load.spritesheet('numberButtons', 'assets/number-buttons-90x90.png', 90, 90, 2, 1, 1);
        this.game.load.image('p1_walk01', 'assets/p1_walk01.png');
        this.game.load.image('p2_walk01', 'assets/p2_walk01.png');
        this.game.load.image('p3_walk01', 'assets/p3_walk01.png');
    },
    create: function () {
        this.game.state.start('Menu');
    }
}