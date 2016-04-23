var game = new Phaser.Game(360,700,Phaser.AUTO);

game.state.add('Preloader',Preloader);
game.state.add('Game',Game);
game.state.start('Preloader');
