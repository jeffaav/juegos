var game = new Phaser.Game(480, 800, Phaser.AUTO);

game.state.add('Preload',Preload);
game.state.add('Menu',Menu);
game.state.add('ChooseCar',ChooseCar);
game.state.add('Game', Game);
game.state.add('GameOver',GameOver);
game.state.start('Preload');