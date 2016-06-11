Game = function (game) {
    
}
Game.prototype = {
    init: function (level) {
        this.level = level || 0;
        this.levelMap = 'demo';
        
        if (this.level > 0) {
            this.levelMap = 'level'+level;
        }
    },
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    
        this.loadLevel();
        this.createPlayer();
        this.createEnemies();
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    loadLevel: function () {
        this.map = this.game.add.tilemap(this.levelMap);
        this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.collisionLayer = this.map.createLayer('collisionLayer');
        
        this.map.setCollisionBetween(1,156, true, 'collisionLayer');
        this.collisionLayer.resizeWorld();
    },
    changeLevel: function () {
        if (this.changeNextLevel) {
            this.changeNextLevel = false;
            this.level++;
            this.game.state.start('Game', true, false, this.level);
            console.log('change level');
        }
    },
    update: function () {
        this.game.physics.arcade.collide(this.player, this.collisionLayer);
        this.game.physics.arcade.collide(this.enemies, this.collisionLayer);
        this.game.physics.arcade.collide(this.goals, this.collisionLayer);
        this.game.physics.arcade.overlap(this.player, this.goals, this.changeLevel, null, this);
        
        
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.body.velocity.y -= 600; 
        }
        
        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 280;
            this.player.animations.play('walk');
            this.player.scale.setTo(-1,1);
        } else if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -280;
            this.player.animations.play('walk');
            this.player.scale.setTo(1,1);
        } else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 3;
        }
    },
    findObjectsByType: function(targetType, tilemap, layer){
        var result = [];
        tilemap.objects[layer].forEach(function(element){
            if(element.properties.type == targetType) {
                element.y -= tilemap.tileHeight; 
                result.push(element);
            }
        }, this);
        return result;
    },
    
    
    // Player
    createPlayer: function () {
        var playerData = this.findObjectsByType('player',this.map, 'objectsLayer')[0];
        
        this.player = this.game.add.sprite(playerData.x, playerData.y, 'player', 3);
        this.player.animations.add('walk', [0,1,2,1], 6, true);
        
        this.game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds = true;
        
        this.game.camera.follow(this.player);
    },
    
    // Enemies
    createEnemies: function () {
        var enemiesData = this.findObjectsByType('enemy', this.map, 'objectsLayer');
        
        this.enemies = this.game.add.group();
        
        enemiesData.forEach(function (data) {
            var enemy = new Enemy(this.game, data.x, data.y, 'slime');
            //var enemy = this.game.add.sprite(enemiesData[i].x, enemiesData[i].y, 'slime');
            this.enemies.add(enemy);
        }, this);
        
        this.goals = this.game.add.group();
        var goalData = this.findObjectsByType('goal', this.map, 'objectsLayer');
        
        enemiesData.forEach(function (data) {
            var goal = new Goal(this.game, data.x, data.y, 'goal');
            this.goals.add(goal);
        }, this);
    }
}