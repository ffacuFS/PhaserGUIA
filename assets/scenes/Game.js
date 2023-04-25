import { PLAYER_MOVEMENTS } from "../../config.js";
export default class Game extends Phaser.Scene {
    constructor() {
     
      super("game");
    }
  
    init() {
      let recoleccion = [
        {type: "Triangulo", count: 0},
       {type: "Cuadrado", count: 0}, 
      {type: "Rombo", count: 0}
      
    ];
    }
  
    preload() {
      this.load.image("sky","./assets/images/Cielo.png");
      this.load.image("Personaje","./assets/images/Ninja.png");
      this.load.image("plataforma","./assets/images/platform.png");
      this.load.image("Triangulo","./assets/images/Triangulo.png");
      this.load.image("Cuadrado","./assets/images/Cuadrado.png");
      this.load.image("Rombo","./assets/images/Rombo.png")
    }
  
    create() {
      this.add.image(400, 300,"sky").setScale(0.555);
    
      this.player= this.physics.add.sprite(500,200,"Personaje");

      this.plataforms = this.physics.add.staticGroup();
      this.plataforms.create(400,570,"plataforma").setScale(2).refreshBody();

      this.physics.add.collider(this.player,this.plataforms);

      this.shapeGroup= this.physics.add.group();
      this.shapeGroup.create(400,0,"Triangulo").setScale(0.5);
      this.shapeGroup.create(100,0,"Cuadrado").setScale(0.5);
      this.shapeGroup.create(500,0,"Rombo").setScale(0.5);

      this.physics.add.collider(this.shapeGroup,this.plataforms);

      this.physics.add.overlap(this.player,this.shapeGroup,this.collectShape,null,this);

      this.cursors = this.input.keyboard.createCursorKeys();

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
    }
  }