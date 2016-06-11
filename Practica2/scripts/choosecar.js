ChooseCar = function (game) {
    
}

ChooseCar.prototype = {
    create: function () {
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'track');
        this.background.tileScale.y = 2;
        this.background.autoScroll(0, 20);
        
        this.n = 2;
        this.carsData = ['ambulance','audi','black_viper','car','mini_truck','mini_van','police','taxi','truck'];
        this.cars = this.game.add.group();
        this.usableCarKeys = [];
        
        var x = this.game.width / this.n;
        var l = 0;
        
        for (var i = 0; i < this.n; i++) {
            for (var j = 0; j < this.n; j++) {
                if (l < this.carsData.length) {
                    var car = new CarMenu(this, (x * i) + (x / 2), (x * j) + (x / 2), this.carsData[l], x);
                    this.cars.add(car);
                    this.usableCarKeys.push(this.carsData[l]);
                    l++;   
                }
            }
        }
        
        this.titulo = this.game.add.text(this.game.width/2, this.game.height - 200, 'Random', {
           fontSize: '35px', fill: '#fff'
        });
        this.titulo.anchor.setTo(0.5);
        this.titulo.inputEnabled = true;
        
        this.titulo.events.onInputDown.add(function () {
            var length = this.n * this.n;
            localStorage.carKey = this.carsData[this.game.rnd.between(0, length)];
            this.game.state.start('Game');
        }, this);
        
        this.game.usableCarKeys = this.usableCarKeys;
    }
}