import { devPath } from '../config.js';
import { Achievements } from '../data/Achievements.js';
import { MemoryStorage } from '../data/storage.js';
import { GamepadInput } from '../input/Gamepad.js';
import { inputOnKeyUp, KeyboardInput } from '../input/Keyboard.js';
import { MouseInput } from '../input/Mouse.js';
import { EffectShake } from '../renderer/effects.js';
import { eventTypeDraw, eventTypeUpdate } from '../renderer/EventClass.js';
import { FPSCounter } from '../renderer/FPSCounter.js';
import { Renderer } from '../renderer/Renderer.js';
import { loadImage } from '../utils/file.js';

import { LevelIndex } from './levels/LevelIndex.js';
import { Pause } from './levels/Pause.js';
import { RippleClickEffect } from './my-effects.js';


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
			}
		);
		this.renderer.addListener( eventTypeUpdate, dt => this.update( dt ) );
		this.renderer.addListener( eventTypeDraw, ctx => this.draw( ctx ) );

		Achievements.setup( [] );

		const gi = new GamepadInput( this.renderer );
		gi.addListener( 'gp_connected', ev => {
			console.debug( ev );
		} );

		KeyboardInput.setup();
		inputOnKeyUp( 'Escape', _ev => {
			this.renderer.togglePause();
		} );

		const mi = new MouseInput( this.renderer, ['click', 'mousemove'] );
		mi.addListener( 'click', pos => {
			if( !this.renderer.isPaused && this.level ) {
				this.level.onClick?.( pos );

				const clickEffect = new RippleClickEffect();
				clickEffect.pos = pos;
				clickEffect.applyTo( this.level, 1 );

				const shakeEffect = new EffectShake();
				shakeEffect.applyTo( this.level, 0.2 );
			}
		} );

		loadImage( `${devPath}tiles.png` ).then( img => {
			MemoryStorage.put( 'tiles', img );
			this.level = new LevelIndex( this.renderer );
			this.renderer.mainLoop();
		} );
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
