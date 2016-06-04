Game = function(game){
    
}

Game.prototype = {
    create:function(){
        this.sky = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
        
        this.sky.tileScale.y = 2;
        
        this.sea = this.game.add.tileSprite(
            0,this.game.height-30,this.game.width,
            30,'water');
        
        this.sea.autoScroll(-20,0);
        this.sky.autoScroll(-20,0);
        
        //this.floorGroup = this.game.add.group();
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);  
        
        this.game.physics.arcade.gravity.y = 1000;
        
        /*for(var i = 0;i<5;i++){
            var floor = this.game.add.sprite(0,0,'floor');
            floor.x = floor.width * i;
            floor.y = this.game.height - floor.height;
            this.game.physics.arcade.enable(floor);
            floor.body.allowGravity = false;
            floor.body.immovable = true;
            this.floorGroup.add(floor);
        }*/
        this.platformGroup = this.game.add.group();
        this.platform = new Platform(game,10,0,250);
        this.platformGroup.add(this.platform);
        this.hero = new Hero(game);
        this.loadLevel();
    },
    update:function(){
        this.platformGroup.forEach(function(platform){
            this.game.physics.arcade.collide(this.hero,platform);
        },this);
        if(this.platform.length 
            && this.platform.children[this.platform.length-1].right  
            < this.game.world.width){
            this.createPlafform();
        }
    },

    loadLevel:function(){
        this.currIndex = 0;
        this.levelData = {
            platform:[
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
                }
            ]
        }
        this.createPlafform();
    },
    createPlafform:function(){
        var next = this.levelData.platform[this.currIndex];
        if(next){
            this.platform = new Platform(this.game,next.numTiles,
                this.game.world.width + next.separation,next.y);
            this.platformGroup.add(this.platform);
            this.currIndex++;
            if(this.currIndex == this.levelData.platform.length){
                this.currIndex = 0;
            }
        }
    }
}