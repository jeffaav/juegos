Game = function (game) {
    
}

Game.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'track');
        this.background.tileScale.y = 2;
        this.background.autoScroll(0, 40);
        
        this.game.carKey = localStorage.carKey;
        this.elapsed = 0;
        
        this.tiempo = this.game.add.text(5, 5, '00:00:00', {
           fontSize: '14px', fill: '#000'
        });
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.elapsedTime = 0;
        this.tiempoTranscurrido = '';
        
        for (var i = this.game.usableCarKeys.length - 1; i > -1; i--) {
            if (this.game.usableCarKeys[i] == this.carKey) {
                this.game.usableCarKeys.splice(i, 1);
                break;
            }
        }
        
        this.enemies = this.game.add.group();
        
        this.car = new Car(this, this.game.width / 2, this.game.height - 100, this.game.carKey);
        this.createCar();
    },
    update: function () {
        this.elapsed += this.game.time.elapsed;
        this.elapsedTime += this.game.time.elapsed;
        this.velocityTime += this.game.time.elapsed;
        
        this.showTime();
        
        if (this.elapsed >= 5000) {
            this.createCar();
            this.elapsed = 0;
        }
        
        this.game.physics.arcade.collide(this.car, this.enemies, null, function (car, enemy) {
            car.kill();
            this.game.state.start('GameOver', true, false, this.tiempoTranscurrido);
        }, this);
        
        if (this.velocityTime >= 60000) {
            this.enemies.forEach(function (enemy) {
                if (enemy.body.velocity.y <= 350) {
                    enemy.body.velocity.y += 20;   
                }
            }, this);
            this.velocityTime = 0;
        }
    },
    showTime: function () {
        if (this.elapsedTime >= 1000) {
            this.elapsedTime = 0;
            this.seconds++;
            
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes++;
                
                if (this.minutes >= 60) {
                    this.minutes = 0;
                    this.hours++;
                }
            }
        }
        this.tiempoTranscurrido = (this.hours >= 10 ? this.hours : ('0' + this.hours))
            + ':' + (this.minutes >= 10 ? this.minutes : ('0' + this.minutes))
            + ':' + (this.seconds >= 10 ? this.seconds : ('0' + this.seconds));
            
        this.tiempo.text = this.tiempoTranscurrido;
    },
    createCar: function () {
        var x = this.game.rnd.between(100, this.game.width - 100);
        var i = this.game.rnd.between(0, this.game.usableCarKeys.length);
        
        var enemy = new Enemy(this, x, 0, this.game.usableCarKeys[i]);
        this.enemies.add(enemy);
    }
}