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

      this.physics.add.collider(this.player,this.plataforms);

      this.shapeGroup= this.physics.add.group();
   
      this.physics.add.collider(this.shapeGroup,this.plataforms);

      this.physics.add.overlap(this.player,this.shapeGroup,this.collectShape,null,this);

      this.cursors = this.input.keyboard.createCursorKeys();

      this.time.addEvent({
        delay: SHAPE_DELAY,
        callback: this.addShape,
        callbackScope: this,
        loop: true,
      });
      };
  
      
    
  
    update() {
      
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
    }

    addShape() {
      

      const randomShape = Phaser.Math.RND.pick(SHAPES);
      console.log(randomShape);

      const randomX = Phaser.Math.RND.between(0, 800);
      console.log (randomX, randomShape);

      this.shapeGroup.create(randomX, 0, randomShape);
    }
  }