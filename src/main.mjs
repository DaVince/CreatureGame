import MapEngine from './lib/map-engine';
import { GameState } from './GameState';

export const mapSys = new MapEngine();
mapSys.addInput(Key.Escape, Sphere.shutDown);
mapSys.addInput(Key.Hyphen, () => mapSys.camera.zoom += 0.1);
mapSys.addInput(Key.Equals, () => mapSys.camera.zoom -= 0.1);
mapSys.start("@/maps/mainmap.mem", { x: 128*16, y: 128*16});

const music = new Sound("@/music/creature growth.ogg")
music.repeat = true;
music.play(Mixer.Default);

export const gameState = new GameState();


//Old test
/*
import { Thread } from 'sphere-runtime';
import { HUDSystem } from './lib/HUDSystem'

export default
class MyGame extends Thread
{
  constructor()
  {
    super(); // call the superclass constructor
    this.creatureimg = new Texture("@/images/creature02.png");
    this.creatureTransform = new Transform();
    this.creatureShape = HUDSystem.render(this.creatureimg, 0, 0, 1280, 720);
  }
  on_update()
  {
    //this.creatureTransform.identity();
    this.creatureTransform.scale(1, 1);
    //this.creatureTransform.translate(1, 1);
  }
  on_render()
  {
    this.creatureShape.draw(Surface.Screen, this.creatureTransform);
  }
}
*/
