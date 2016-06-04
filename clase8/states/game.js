var Game = function (game) {
    
}

Game.prototype = {
    create:function () {
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        
        this.sky = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
        this.sky.tileScale.y = 2;
        this.sky.autoScroll(-20, 0);
        
        this.sea = this.game.add.tileSprite(0,this.game.height-30,this.game.width,30,'water');
        this.sea.autoScroll(-20, 0);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        
        this.platform = new Platform(game, 10, 0, 250);
        this.platformGroup = this.game.add.group();
        this.platformGroup.add(this.platform);
        this.hero = new Hero(game);
        this.loadLevel();
    },
    update:function () {
        
        if (this.hero.alive) {
            this.platformGroup.forEach(function (platform) {
                this.game.physics.arcade.collide(this.hero, platform);    
            }, this);
            
            if (this.platform.length && this.platform.children[this.platform.length - 1].right < this.game.world.width) {
                this.createPlatform();
            }
            
            if (this.hero.y > this.game.height) {
                this.gameOver();
            }
        }
    },
    loadLevel: function () {
        this.currIndex = 0;
        this.levelData = {
            platform: [
                {
                    separation:50,
                    y:200,
                    numTiles:4
                },
                {
                    separation:50,
                    y:250,
                    numTiles:6
                },
                {
                    separation:100,
                    y:200,
                    numTiles:3
                },
            ]
        }
        
        this.createPlatform();
    },
    createPlatform: function () {
        var next = this.levelData.platform[this.currIndex];
        if (next) {
            this.platform = new Platform(this.game, next.numTiles, this.game.world.width + next.separation, next.y);
            this.platformGroup.add(this.platform);
            this.currIndex++;
            
            if (this.currIndex == this.levelData.platform.length) {
                this.currIndex = 0;
            }
        }
    },
    gameOver: function () {
        this.hero.kill();
        this.overlay = this.game.add.bitmapData(this.game.width, this.game.height);
        this.overlay.ctx.fillStyle = '#000';
        this.overlay.ctx.fillRect(0,0, this.game.width, this.game.height);
        
        this.gameOverPanel = this.game.add.sprite(0, 0, this.overlay);
        this.gameOverPanel.alpha = 0.5;
        
        this.sea.stopScroll();
        this.sky.stopScroll();
        
        this.gameOverPanel.y = this.gameOverPanel.height;
        
        var tweenGameOver = this.game.add.tween(this.gameOverPanel).to({ y: 0 }, 500);
        tweenGameOver.onComplete.add(function () {
           
            this.game.add.text(this.game.width/2, this.game.height/2, 'GAME OVER', {
                font: '30px',
                fill: '#fff'
            }).anchor.setTo(0.5);
            
            this.game.add.text(this.game.width/2, this.game.height/2 + 120, 'Tap to restart', {
                font: '10px',
                fill: '#fff'
            }).anchor.setTo(0.5); 
            
            this.game.input.onDown.add(this.restart, this);
        }, this);
        
        tweenGameOver.start();
    
    },
    restart: function () {
        this.game.world.remove(this.sky);
        this.game.world.remove(this.sea);
        this.game.state.start('Game');
    }
}