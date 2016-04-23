var Game = function (game) {
    
}

Game.prototype = {
    create: function () {
        this.GRAVITY = 400;
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.background.autoScroll(-200, 0);
        this.player = this.game.add.sprite(0, 0, 'player');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.gravity.y = this.GRAVITY
        this.player.body.inmovable = true;
        this.game.input.onDown.add(this.flap, this);
        this.elapsed = 0;
        this.walls = this.game.add.group();
    },
    flap: function () {
        this.player.body.velocity.y = -250;
    },
    update: function () {
        this.elapsed += this.game.time.elapsed;
        if (this.elapsed >= 3000) {
            this.elapsed = 0;
            this.spanWalls();
        }
        
        this.game.physics.arcade.collide(this.player, this.walls, null, function () {
            if (this.gameOver) {
                this.gameOver = true;
            }
        }, this);
    },
    spanWalls: function () {
        var wallY = this.game.rnd.integerInRange(this.game.height * .3, this.game.height * .7);
        var botWall = this.generateWall(wallY);
        var topWall = this.generateWall(wallY, true);
    },
    generateWall: function (wallY, flipped) {
        var posY;
        var opening = 200;
        if (flipped) {
            wallY = wallY - (opening/2);
        } else {
            wallY = wallY + (opening/2);
        }
        
        var wall = this.game.add.sprite(this.game.width, wallY, 'wall');
        this.game.physics.arcade.enable(wall);
        wall.body.velocity.x = -200;
        if (flipped) {
            wall.scale.y = -1;
            wall.body.offset.y = -wall.body.height;
        }
        wall.body.inmovable = true;
        wall.body.allowGravity = false;
        this.walls.add(wall);
    }
}