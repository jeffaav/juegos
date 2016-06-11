Preload = function (game) {
    
}

Preload.prototype = {
    preload: function () {
        this.game.load.image('ambulance','assets/Ambulance.png');
        this.game.load.image('audi','assets/Audi.png');
        this.game.load.image('black_viper','assets/Black_viper.png');
        this.game.load.image('car','assets/Car.png');
        this.game.load.image('mini_truck','assets/Mini_truck.png');
        this.game.load.image('mini_van','assets/Mini_van.png');
        this.game.load.image('police','assets/Police.png');
        this.game.load.image('taxi','assets/taxi.png');
        this.game.load.image('track','assets/track.png');
        this.game.load.image('truck','assets/truck.png');
        
        this.game.load.audio('acceleration', 'assets/AccelerationHigh.wav');
    },
    create: function () {
        this.game.state.start('Menu');
    }
}