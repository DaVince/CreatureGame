import { Prim } from 'sphere-runtime';
import { Creature } from './Creature';

export class GameState
{
  constructor()
  {
    this.time = Date.now();
    this.lasttick = 0;
    this.ticks = 0;
  }
  
  update()
  {
    Creature.update();

    //Per bpm tick
    if (Date.now() - 500 >= this.time)
    {
      this.time += 500;
      this.ticks++;
      Creature.tick();
      /* TODO: lots of things to update per bpm tick
      Update increasing size of creature
      Check collisions (based on Creature.pictures[x].hitbox)
      Check if it's time to change the creature graphic yet (maybe have this done by the Creature itself instead)
      Check size of creature (or game time) and start displaying a flashing silhouette in a timely manner
      */
    }
  }

  render()
  {
    Creature.render();

    if (this.ticks%2==0)
    {
      Prim.drawSolidRectangle(Surface.Screen, 1280-60, 10, 20, 20, Color.Red);
    }
  }
}
