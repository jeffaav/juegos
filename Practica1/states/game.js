var Game = function (game) {
    
}

Game.prototype = {
    create:function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 500;
        this.game.world.setBounds(0, 0, 1024, 512);
        this.elapsed = 0;
        this.game.add.image(0, 0, 'game');
        this.velocidad = 600;
        
        var numero = this.rnd.integerInRange(1, 3);
        this.player = this.game.add.sprite(0, 0, 'p' + numero + '_walk01');
        this.player.y = this.game.height - (this.player.height / 2);
        this.player.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.inmovable = true;
        this.player.vidas = 4;
        this.player.puntos = 0;
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.s = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        this.enemigos = [];
        this.enemigosCreados = this.game.add.group();
        this.cargarEnemigos();
        
        
        this.vida = document.getElementById('vidaNumero');
        this.puntos = document.getElementById('puntosNumero');
    },
    crearFlechas: function () {
        if(this.cursors.left.isDown){
            //this.player.x -=2;
            this.player.body.velocity.x = -this.velocidad;
            this.player.scale.setTo(-1,1);
        }else if(this.cursors.right.isDown){
            //this.player.x +=2;
            this.player.body.velocity.x = this.velocidad;
            this.player.scale.setTo(1,1);
        }else{
            this.player.body.velocity.x = 0;
        }
    },
    cargarEnemigos: function () {
        this.enemigos.push({ key: 'creamVanilla', bloque: 1 });
        this.enemigos.push({ key: 'cupCake', bloque: 1 });
        this.enemigos.push({ key: 'gummyWormRedHead', bloque: 1 });
        this.enemigos.push({ key: 'heart', bloque: 2 });
        this.enemigos.push({ key: 'lollipopFruitYellow', bloque: 2 });
        this.enemigos.push({ key: 'lollipopGreen', bloque: 2 });
        this.enemigos.push({ key: 'medalBronze', bloque: 3 });
        this.enemigos.push({ key: 'medalGold', bloque: 3 });
        this.enemigos.push({ key: 'medalSilver', bloque: 3 });
    },
    choque: function (player, enemigo) {
        if (enemigo.bloque == 1 && this.w.isDown) {
            this.player.puntos += 20;
        } else if (enemigo.bloque == 2 && this.s.isDown) {
            this.player.puntos += 25;
        } else if (enemigo.bloque == 3 && this.d.isDown) {
            this.player.puntos += 15;
        } else {
            this.player.vidas -= 1;
        }
        
        if (this.player.vidas == 0) {
            this.game.state.start('GameOver');
        }
    
        enemigo.kill();
    },
    crearEnemigo: function () {
        var id = this.rnd.integerInRange(0, 8),
            ejeX = this.rnd.integerInRange(0, 950);
            enemigo = this.enemigos[id],
            sprite = this.game.add.sprite(ejeX, 0, enemigo.key);
            
        sprite.bloque = enemigo.bloque;
        sprite.checkWorldBounds = true;
        sprite.outOfBoundsKill = true;
        this.game.physics.arcade.enable(sprite);
        this.enemigosCreados.add(sprite);
    },
    update:function () {
        this.elapsed += this.game.time.elapsed;   

        if (this.elapsed >= 2000) {
            this.elapsed = 0;
            this.crearEnemigo(this);
        }
        
        this.game.physics.arcade.collide(this.player, this.enemigosCreados, this.choque, null, this);        
        this.crearFlechas();
        
        this.vida.textContent = this.player.vidas;
        this.puntos.textContent = this.player.puntos;
        
        console.log(this.s.isDown);
    }
}
