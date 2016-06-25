var game = new Phaser.Game(480, 320, Phaser.AUTO);

game.state.add('Preload', Preload);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);


game.state.start('Preload');