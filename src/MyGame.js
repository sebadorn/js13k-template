import { Level } from './Level.js';
import { FPSCounter } from './renderer/FPSCounter.js';
import { Renderer } from './renderer/Renderer.js';


export class MyGame {


	/**
	 *
	 */
	constructor() {
		this.renderer = new Renderer( 1920, 1080 );
		this.renderer.setup(
			document.body,
			{
				targetRatio: 16 / 9,
				fpsCounter: new FPSCounter(),
				onUpdate: dt => this.update( dt ),
				onDraw: ctx => this.draw( ctx ),
			}
		).mainLoop();

		this.level = new Level();
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		this.level?.draw( ctx );
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.level?.update( dt );
	}


};
