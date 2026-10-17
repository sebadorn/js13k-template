import { devPath } from '../config.js';
import { Achievements } from '../data/Achievements.js';
import { MemoryStorage } from '../data/storage.js';
import { GamepadInput } from '../input/Gamepad.js';
import { inputOnKeyUp, KeyboardInput } from '../input/Keyboard.js';
import { MouseInput } from '../input/Mouse.js';
import { EffectShake } from '../renderer/effects.js';
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
				onUpdate: dt => this.update( dt ),
				onDraw: ctx => this.draw( ctx ),
			}
		);

		Achievements.setup( [] );

		GamepadInput.setup();

		KeyboardInput.setup();
		inputOnKeyUp( 'Escape', _ev => {
			this.renderer.togglePause();
		} );

		MouseInput.setup( this.renderer, ['click', 'mousemove'] );
		MouseInput.on( 'click', ( _ev, pos ) => {
			if( this.level ) {
				this.level.onClick?.( pos );

				const clickEffect = new RippleClickEffect( this.level, 1 );
				clickEffect.pos = pos;

				const shakeEffect = new EffectShake( this.level, 0.2 );
				shakeEffect.strength = 5;

				this.level.effects.push( clickEffect, shakeEffect );
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
