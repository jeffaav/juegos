Game = function(game){}

Game.prototype = {
  create:function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    this.game.world.setBounds(0, 0, 360, 700);
    
    this.levelData = JSON.parse(this.game.cache.getText('level'));

    this.gorilla = this.game.add.sprite(30, 40, 'gorilla');
    this.gorilla.anchor.setTo(0.5);

    this.player = this.game.add.sprite(this.levelData.playerStart.x,this.levelData.playerStart.y,'player',3);
    this.player.animations.add('walking',[0,1,2,1],6,true);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    
    this.player.customProps = {
      left: false,
      right: false,
      up: false
    };
    

    this.platformGroup = this.game.add.group();
    this.platformGroup.enableBody = true;
    this.levelData.platformData.forEach(function (element) {
      this.platformGroup.create(element.x, element.y, 'platform');
    }, this);
    this.platformGroup.setAll('body.immovable', true);
    this.platformGroup.setAll('body.allowGravity', false);
    
    this.ground = this.game.add.sprite(0, 638, 'ground');
    this.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
    
    this.barrilGroup = this.game.add.group();
    this.barrilGroup.enableBody = true;
    this.levelData.fireData.forEach(function (element) {
      
    }, this);
    this.elapsed = 0;
    this.barrilFrequency = this.levelData.barrelFrequency * 200;
    
    this.fires = this.game.add.group();
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.delay = 0;
    
    if (!this.game.device.desktop) {
      this.createControls(); 
    }
  },

  createControls: function () {
    this.leftButton = this.game.add.sprite(0,0,'arrowButton');
    this.leftButton.y = this.game.height - this.leftButton.height;
    this.leftButton.inputEnabled = true;
    this.leftButton.events.onInputDown.add(function () {
      this.player.customProps.left = true;
    }, this);
    this.leftButton.events.onInputUp.add(function () {
      this.player.customProps.left = false;
    }, this);
    
    this.rightButton = this.game.add.sprite(this.leftButton.width + 10,0,'arrowButton');
    this.rightButton.y = this.game.height - this.leftButton.height;
    this.rightButton.inputEnabled = true;
    this.rightButton.events.onInputDown.add(function () {
      this.player.customProps.right = true;
    }, this);
    this.rightButton.events.onInputUp.add(function() {
      this.player.customProps.right = false;
    }, this);
    
    this.actionButton = this.game.add.sprite(0,0,'actionButton');
    this.actionButton.y = this.game.height - this.actionButton.height;
    this.actionButton.x = this.game.width - this.actionButton.width;
    this.actionButton.inputEnabled = true;
    this.actionButton.events.onInputDown.add(function () {
      this.player.customProps.up = true;
    }, this);
    this.actionButton.events.onInputUp.add(function() {
      this.player.customProps.up = false;
    }, this);
  },

  update:function(){
    this.elapsed += this.game.time.elapsed;
    if (this.elapsed >= this.barrilFrequency) {
      this.elapsed = 0;
      this.createBarril();
    }
    
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.platformGroup);
    this.game.physics.arcade.collide(this.barrilGroup, this.platformGroup);
    this.game.physics.arcade.collide(this.barrilGroup, this.ground);
    
    this.delay += this.game.time.elapsed;
    if (this.space.isDown && this.delay >= 200) {
      this.createFire();
      this.delay = 0;
    }
    
    if(this.cursors.left.isDown || this.player.customProps.left){
      //this.player.x -=2;
      this.player.body.velocity.x = -180;
      this.player.animations.play('walking');
      this.player.scale.setTo(1,1);
    }else if(this.cursors.right.isDown || this.player.customProps.right){
      //this.player.x +=2;
      this.player.body.velocity.x = +180;
      this.player.scale.setTo(-1,1);
      this.player.animations.play('walking');
    }else{
      this.player.body.velocity.x = 0;
      this.player.animations.stop();
      this.player.frame = 3;
    }
    
    if ((this.cursors.up.isDown || this.player.customProps.up) && this.player.body.touching.down) {
      this.player.body.velocity.y = -600; 
    }
    
    this.barrilGroup.forEach(function (element) {
      if (element.x < 10 && element.y > 600) {
        element.kill();
      }
    })
  },
  
  createFire: function () {
    var fire = this.game.add.sprite(this.player.x, this.player.y, 'fire');
    
    fire.anchor.setTo(0.5);
    this.fires.add(fire);
    this.game.physics.arcade.enable(fire);
    fire.body.velocity.x = 100 * -this.player.scale.x;
    fire.body.allowGravity = false;
    fire.checkWorldBounds = true;
    fire.outOfBoundsKill = true;
  },
  
  createBarril: function () {
    var barril = this.barrilGroup.getFirstDead();
    if (!barril) {
      barril = this.game.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'barrel');
      this.barrilGroup.add(barril);  
    } else {
      barril.reset(this.levelData.goal.x, this.levelData.goal.y);
    }
    
    barril.body.velocity.x = this.levelData.barrelSpeed;
    barril.body.collideWorldBounds = true;
    barril.body.bounce.set(1,0);
  }
}
