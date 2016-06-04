Game = function (game) {
    
}
Game.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 500;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    
        this.loadLevel();
        this.createPlayer();
        this.createEnemies();
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    loadLevel: function () {
        this.map = this.game.add.tilemap('demo');
        this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.collisionLayer = this.map.createLayer('collisionLayer');
        
        this.map.setCollisionBetween(1,156, true, 'collisionLayer');
        this.collisionLayer.resizeWorld();
    },
    update: function () {
        this.movePlayer();
        this.game.physics.arcade.collide(this.player, this.collisionLayer);
        this.game.physics.arcade.collide(this.enemies, this.collisionLayer);
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
        this.player.animations.add('walk', [0,1,2,1], true);
        
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        
        this.game.camera.follow(this.player);
    },
    movePlayer: function () {
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
    
    
    // Enemies
    createEnemies: function () {
        var enemiesData = this.findObjectsByType('enemy', this.map, 'objectsLayer');
        
        this.enemies = this.game.add.group();
        
        for (var i in enemiesData){
            var enemy = this.game.add.sprite(enemiesData[i].x, enemiesData[i].y, 'slime');
            
            this.game.physics.arcade.enable(enemy);
            this.enemies.add(enemy);
        }
        
           
    }
}