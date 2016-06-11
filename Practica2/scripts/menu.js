Menu = function (game) {
    
}

Menu.prototype = {
    create: function () {
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'track');
        this.background.tileScale.y = 2;
        this.background.autoScroll(0, 20);
        
        this.titulo = this.game.add.text(this.game.width/2, 300, 'PC2', {
           fontSize: '35px', fill: '#fff'
        });
        
        this.empezar = this.game.add.text(this.game.width/2, 400, 'Empezar', {
           fontSize: '20px', fill: '#fff'
        });
        
        this.titulo.anchor.setTo(0.5);
        this.empezar.anchor.setTo(0.5);
        
        this.empezar.inputEnabled = true;
        this.empezar.events.onInputDown.add(this.irMenu, this);
    },
    irMenu: function () {
        this.game.state.start('ChooseCar');
    }
}