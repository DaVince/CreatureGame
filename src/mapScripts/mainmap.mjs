import { Creature } from '@/bin/Creature';
import { gameState } from '@/bin/main';



export const mapScripts =
{
	onExit (runTime, map)
  {
  },
  onEnter (runTime, map)
  {
  },
  onUpdate (runTime, map)
  {
    gameState.update(map);
  },
  onRender (runTime, map)
  {
    gameState.render();
  }
}
