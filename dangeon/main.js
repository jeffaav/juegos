var game = new Phaser.Game(360,640,Phaser.AUTO);

game.state.add('Preload',Preload);
game.state.add('Game',Game);
game.state.start('Preload');