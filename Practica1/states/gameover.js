var GameOver = function (game) {
    
}

GameOver.prototype = {
    create:function () {
        this.game.add.image(0, 0, 'gameover');
        this.button = this.game.add.sprite(0, 0, 'numberButtons');
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(function () {
            this.game.state.start('Menu');
        });
    }
}