var GameOver = function (game) {
}

GameOver.prototype = {
    create: function () {
        this.background = this.game.add.sprite(0, 0, 'background');
        
        this.gameOverText =  this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'GAME OVER', {
            font: '30px pixel',
            fill: '#fff'    
        });
        
        this.gameOverText.anchor.setTo(0.5);
    }
}