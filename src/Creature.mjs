import { gameState } from './main';
import { HUDSystem } from '@/bin/lib/HUDSystem';


export class TheCreature
{
	constructor()
	{
		this.x = 0;
		this.y = 0;
		this.width = 40; //the starting width of the sprite.
		this.height = 20;
		this.aspect = 1;
		this.scalefactor = 4;
		this.bpm = 0;
		this.pictures = [
			{ time: 0, image: "creature01.png", hitbox: [] },
			{ time: 8, image: "creature02.png", hitbox: [] },
			{ time: 16, image: "creature03.png", hitbox: [] },
			{ time: 24, image: "creature04.png", hitbox: [] },
			{ time: 32, image: "creature05.png", hitbox: [] },
			{ time: 40, image: "creature06.png", hitbox: [] },
			{ time: 48, image: "creature07.png", hitbox: [] },
			{ time: 56, image: "creature08.png", hitbox: [] },
		];

		this.reloadpic();
		this.scale();
	}

	update()
	{
		//TODO: Take care of extra little scaling bits here for a more animated look
	}

	tick() {
		if (this.pictures.length > 0)
		{
			if (this.bpm >= this.pictures[0].time)
			{
				this.reloadpic();
				this.scale();
				this.pictures.shift();
				SSj.log("Switch to image: " + this.currentpic + " at bpm " + this.bpm);
			}
		}

		this.width+=this.scalefactor;
    this.height = this.width*this.aspect;
    this.creatureTransform.identity();
    //SSj.log(Creature.width/currentpic.width, Creature.height/currentpic.height);
    this.scale();
		
		this.bpm++;
	}

	scale()
	{
		this.creatureTransform.scale(this.width/this.currentpic.width, this.height/this.currentpic.height);
    this.creatureTransform.translate(640-(this.width/2), 360-(this.height/2));
	}

	/* Load in the new image and set the values. */
	reloadpic()
	{
		if (this.pictures.length == 0) return;
		this.currentpic = new Texture("@/images/" + this.pictures[0].image);
		this.currenthitboxes = this.pictures[0].hitbox;
		this.creatureTransform = new Transform();
		this.aspect = this.currentpic.height/this.currentpic.width;
		this.height = this.width*this.aspect;
		this.creatureShape = HUDSystem.render(this.currentpic, 0, 0, this.currentpic.width, this.currentpic.height);
	}

	scaleAnimate() {
		//TODO: animated scaling effect. (pudding-like effect?)
	}

	render()
	{
		this.creatureShape.draw(Surface.Screen, this.creatureTransform);
	}
}


export let Creature = new TheCreature();
