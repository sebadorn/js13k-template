import { FPSCounter } from '../renderer/FPSCounter.js';
import { Renderer } from '../renderer/Renderer.js';
import { KeyboardInput } from '../input/Keyboard.js';
import { LevelIndex } from './levels/LevelIndex.js';
import { GamepadInput } from '../input/Gamepad.js';
import { MouseInput } from '../input/Mouse.js';
import { Pause } from './levels/Pause.js';


/**
 * A tech demo and test application, not necessarily a
 * game and not intending to keep the 13 kB limit.
 */
export class MyGame {


	/**
	 *
	 */
	constructor() {
		this.renderer = new Renderer( 1920, 1080 );
		this.renderer.setup(
			document.body,
			{
				targetFPS: 60,
				targetRatio: 16 / 9,
				fpsCounter: new FPSCounter(),
				pauseHandler: new Pause( this ),
				onUpdate: dt => this.update( dt ),
				onDraw: ctx => this.draw( ctx ),
			}
		).mainLoop();

		GamepadInput.setup();

		KeyboardInput.setup();
		KeyboardInput.onKeyUp( 'Escape', _ev => {
			this.renderer.togglePause();
		} );

		MouseInput.setup( this.renderer, ['click', 'mousemove'] );

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
