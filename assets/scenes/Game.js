import { PLAYER_MOVEMENTS, SHAPE_DELAY, SHAPES, CUADRADO, TRIANGULO, ROMBO } from "../../config.js";
export default class Game extends Phaser.Scene {
    constructor() {
     
      super("game");
    }
  
    init() {
      this.shapeRecolect = {
        ["Triangulo"]: {count: 0, score: 10},
        ["Cuadrado"]: {count: 0, score: 20},
        ["Rombo"]: {count: 0, score: 30},
      };

      this.isWinner= false;
      this.isGameOver= false;
      this.isTimer= 30; 
    }
  
    preload() {
      this.load.image("sky","./assets/images/Cielo.png");
      this.load.image("Personaje","./assets/images/Ninja.png");
      this.load.image("plataforma","./assets/images/platform.png");
      this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
      this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
      this.load.image(ROMBO, "./assets/images/Rombo.png");
    }
  
    create() {
      this.add.image(400, 300,"sky").setScale(0.555);
    
      this.player= this.physics.add.sprite(500,200,"Personaje");

      this.plataforms = this.physics.add.staticGroup();
      this.plataforms.create(400,570,"plataforma").setScale(2).refreshBody();
      this.plataforms.create(200, 400,"plataforma").setScale(0.4).refreshBody();
      this.plataforms.create(700, 290,"plataforma").setScale(0.8).refreshBody();

      this.physics.add.collider(this.player,this.plataforms);

      this.shapeGroup= this.physics.add.group();
   
      this.physics.add.collider(this.shapeGroup,this.plataforms,);

      this.physics.add.overlap(this.player,this.shapeGroup,this.collectShape,null,this);

      this.cursors = this.input.keyboard.createCursorKeys();

      this.time.addEvent({
        delay: SHAPE_DELAY,
        callback: this.addShape,
        callbackScope: this,
        loop: true,
      });

      this.scoreText=this.add.text(16, 16,"T: 0 / C: 0 / R: 0", {
        fontSize: "20px",
        fill: "#270",
      });

      this.time.addEvent({
        delay: 1000,
        callback: this.updateTimer ,
        callbackScope: this,
        loop: true,
      })
      this.time = this.add.text(700,16, "tiempo: "+ this.isTimer,)
      };
  
      
    
  
    update() {

      if (this.isWinner) {
        this.scene.start("winner");
     }
     if (this.isGameOver) {
      this.scence.start("GameOver");
     }

      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(PLAYER_MOVEMENTS.x) 
      } else {
        this.player.setVelocityX(0)
      }

      if (this.cursors.up.isDown && this.player.body.touching.down)
      this.player.setVelocityY(-PLAYER_MOVEMENTS.y)
        if (this.cursors.down.isDown) {
          this.player.setVelocityY(160)
        

      }
    }
    collectShape(player, shape){
      console.log("Figura recolectada");
      shape.disableBody(true,true)

      const shapeName = shape.texture.key;
      console.log("Recolectamos un ",shapeName, "!!!");
      this.shapeRecolect[shapeName].count++;
      console.log(this.shapeRecolect);

      this.scoreText.setText(
        "T: "+ this.shapeRecolect[TRIANGULO].count + " / C: " + this.shapeRecolect[CUADRADO].count + " / R: "+ this.shapeRecolect[ROMBO].count
      );
        if (
          this.shapeRecolect[ROMBO].count >= 2 &&
          this.shapeRecolect[TRIANGULO].count >= 2 &&
          this.shapeRecolect[CUADRADO].count >= 2 
        ) {
          this.isWinner= true;
        };

    }

    addShape() {
      

      const randomShape = Phaser.Math.RND.pick(SHAPES);
      console.log(randomShape);

      const randomX = Phaser.Math.RND.between(0, 800);
      console.log (randomX, randomShape);

      this.shapeGroup.create(randomX, 0, randomShape);
    }
    updateTimer() {
      this.isTimer--
      this.time.setText(
        "Tiempo: "+ this.isTimer
      )
      if (this.isTimer == 0) {
        this.isGameOver = true;
      }
    }

  }