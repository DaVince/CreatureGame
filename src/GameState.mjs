import { Prim } from 'sphere-runtime';
import { Creature } from './Creature';
import {mapSys} from "./main";

const mouse = Mouse.Default;
const red = Color.Red;
const black = Color.Black;

export class GameState
{
  constructor()
  {
    this.time = Date.now();
    this.lasttick = 0;
    this.ticks = 0;
    mouse.clearQueue();
    this.wallNum = 0;
    this.clicking = false;
  }
  
  update(map)
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

      //scale hitbox for current size
      const polygons = [];
      for (const poly of Creature.currenthitboxes)
      {
        polygons.push({
          type : poly.type,
          x : poly.x + map.x + Creature.x,
          y : poly.y + map.y + Creature.y,
          w : poly.w,
          h : poly.h
        })
      }
      // collision method can count collisions multiple times :()
      // so have to remove duplicates afterwards
      const cols = mapSys.CEngine.collide(-1, 0, Creature.x + map.x, Creature.y + map.y, 0, 0, polygons, true);
      const handled = [];
      for (let i = 0, length = cols.length; i < length; ++i)
      {
        const current = cols[i].ref;
        if (handled.indexOf(current) === -1)
        {
          handled.push (current);
          const entity = mapSys.SEngine.entities[current];
          print(`Collided with ${entity.id}`);
          //handle collision here - entity = the person object
          //use entity.queueMove to change its direction or destroy it
          //see SEngine.mjs for more info
        }
      }
    }

    //mouse click make a "wall" - used boingers sprite as wall placeholder
    //if/else is to not allow one click to make multiple
    if (this.clicking === false)
    {
      const event = mouse.getEvent();
      if (event !== null)
      {
        this.clicking = true;
        mapSys.createCharacter(`wall  ${this.wallNum}`, "sprites/boingers.ses", event.x + map.x, event.y + map.y, 0);
        ++this.wallNum;
      }
    }
    else
    {
      if (mouse.isPressed(MouseKey.Left) === false)
      {
        mouse.clearQueue();
        this.clicking = false;
      }
    }
  }

  render()
  {
    Creature.render();

    //draw a mouse
    Prim.drawSolidRectangle(Surface.Screen, mouse.x - 5, mouse.y - 5, 10, 10, black);

    if (this.ticks%2==0)
    {
      Prim.drawSolidRectangle(Surface.Screen, 1280-60, 10, 20, 20, red);
    }
  }
}
