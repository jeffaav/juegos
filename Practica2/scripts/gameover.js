GameOver = function (game) {
    
}

GameOver.prototype = {
    init: function (score) {
        this.score = score;
    },
    create: function () {
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'track');
        this.background.tileScale.y = 2;
        this.background.autoScroll(0, 20);
        
        this.titulo = this.game.add.text(this.game.width/2, 300, 'Game Over', {
           fontSize: '35px', fill: '#fff'
        });
        this.titulo.anchor.setTo(0.5);
        
        this.score = this.game.add.text(this.game.width/2, 400, this.score, {
           fontSize: '20px', fill: '#fff'
        });
       
        this.game.input.onDown.add(function () {
            this.game.state.start('Menu');
        }, this);
    }
}