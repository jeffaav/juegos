var Game = function (game) {
}

Game.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        
        this.enemyElapsed = 0;
        this.enemySeconds = 5;
        this.sunElapsed = 0;
        this.sunSeconds = 10;
        this.reduceElapsed = 0;
        this.reduceSeconds = 30;
        
        this.factorTime = 500;
        
        this.background = this.game.add.sprite(0, 0, 'background');
        
        this.plant = new Plant(this, 40, 50);
        
        this.enemiesData = [
            { isSpriteSheet: true, life:1, points: 10, key: 'zombie',  frames: [0,1,2,1], fps: 6, loop: true },
            { isSpriteSheet: false, life:2, points: 20 , key: 'chilli' },
            { isSpriteSheet: true, life:3, points: 30, key: 'chicken',  frames: [0,1,2,1], fps: 6, loop: true }
        ];
        this.enemySpeed = -100;
        this.enemies = this.game.add.group();
        
        this.suns = this.game.add.group();
    },
    update: function () {
        if (this.plant.isDead) {
            this.gameOver();
        } else {
            this.enemyElapsed += this.game.time.elapsed;
            this.sunElapsed += this.game.time.elapsed;
            this.reduceElapsed += this.game.time.elapsed;
            
            if (this.enemyElapsed >= this.enemySeconds * this.factorTime) {
                this.enemyElapsed = 0;
                this.createEnemy();
            } 
            
            if (this.sunElapsed >= this.sunSeconds * this.factorTime) {
                this.sunElapsed = 0;
                this.createSun();
            }
            
            if (this.reduceElapsed >= this.reduceSeconds * this.factorTime && this.enemySeconds >= 2) {
                this.enemySeconds--;
            }
            
            this.game.physics.arcade.overlap(this.plant.bullets, this.enemies, this.collisionBulletEnemy, null, this);
            this.game.physics.arcade.collide(this.enemies, this.plant, null, this.collisionEnemiesPlant, this);
        }
    },
    createEnemy: function () {
        var index = this.game.rnd.between(0, 2),
            posY = this.game.rnd.between(50, this.game.world.height - 50);
            data = this.enemiesData[index],
            enemy;
        
        var enemy = this.game.add.sprite(this.game.world.width - 100, posY, data.key);
        enemy.life = data.life;
        enemy.points = data.points;
        enemy.anchor.setTo(0.5);
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        
        enemy.events.onOutOfBounds.add(function (enemy) {
            enemy.kill();
            this.plant.reduceLife();
        }, this);
        
        if (data.isSpriteSheet) {
            
        }
        
        this.game.physics.arcade.enable(enemy);
        enemy.body.velocity.x = this.enemySpeed;
        this.enemies.add(enemy);
    },
    collisionBulletEnemy: function (bullet, enemy) {
        bullet.kill();
        enemy.life--;
        if (enemy.life == 0) {
            this.plant.points += enemy.points;
            this.plant.updatePointsText();
            enemy.kill();
            
            console.log(this.plant.points);
        }
    },
    createSun: function () {
        var sun = new Sun(this);
        this.suns.add(sun);
    },
    collisionEnemiesPlant: function (enemy, plant) {
        enemy.kill();
        this.plant.reduceLife();
    },
    gameOver: function () {
            this.game.state.start('GameOver');
    }
}