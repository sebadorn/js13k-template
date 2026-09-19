import { FPSCounter } from '../renderer/FPSCounter.js';
import { Renderer } from '../renderer/Renderer.js';
import { KeyboardInput } from '../input/Keyboard.js';
import { LevelIndex } from './levels/LevelIndex.js';


export class MyGame {


	/**
	 *
	 */
	constructor() {
		KeyboardInput.setup();
		KeyboardInput.onKeyUp( 'Escape', _ev => {
			this.renderer.togglePause();
		} );

		this.renderer = new Renderer( 1920, 1080 );
		this.renderer.setup(
			document.body,
			{
				targetFPS: 60,
				targetRatio: 16 / 9,
				fpsCounter: new FPSCounter(),
				onUpdate: dt => this.update( dt ),
				onDraw: ctx => this.draw( ctx ),
			}
		).mainLoop();

		this.level = new LevelIndex( this.renderer );
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
