export default class Defeat extends Phaser.Scene {
    constructor() {
       // key of the scene
           // the key will be used to start the scene by other scenes
           super("defeat");
       }
   
       init() {
           // this is called before the scene is created
           // init variables
           // take data passed from other scenes
           // data object param {}
       }
   
       preload() {
           // load assets
       }
   
       create() {
           // create game objects
           this.add.text = this.add.text(180, 250, "Perdiste", {
               fontSize: "80px",
               
           });
       };
   
   
   
   
       update() {
           // update game objects
       }
   }