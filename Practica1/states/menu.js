var Menu = function (game) {
    
}

Menu.prototype = {
    create:function () {
        this.game.add.image(0, 0, 'menu');
        this.button = this.game.add.sprite(0, 0, 'numberButtons');
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(function () {
            this.game.state.start('Game');
        });
    }
}