import { targetFPS } from '../config.js';
import { canvasCreate } from '../utils/canvas.js';


export class Renderer {


	/** @type {HTMLCanvasElement} */
	canvas;

	/** @type {CanvasRenderingContext2D} */
	ctx;

	/**
	 * Elapsed game time in milliseconds.
	 */
	gameTime = 0;

	/**
	 * Offset to the window borders, assuming a centered canvas.
	 * @type {Vector2D}
	 */
	offset = { x: 0, y: 0 };

	scale = 1;

	_isPaused = false;


	/**
	 *
	 * @param {number} width
	 * @param {number} height
	 */
	constructor( width, height ) {
		[this.canvas, this.ctx] = canvasCreate( width, height );
		this.originalWidth = width;
		this.originalHeight = height;
	}


	/**
	 * Start the main loop. Update logic, render to the canvas.
	 * @param {number} [timestamp = 0]
	 */
	mainLoop( timestamp = 0 ) {
		if( timestamp && this.last ) {
			const timeElapsed = timestamp - this.last; // Time that passed between frames. [ms]

			// Target speed of 60 FPS (=> 1000 / 60 ~= 16.667 [ms]).
			const dt = timeElapsed / ( 1000 / targetFPS );

			if( this._isPaused ) {
				return; // Stop the loop.
			}

			this.gameTime += dt;

			this.onUpdate?.( dt );
			this.onDraw?.( this.ctx );

			this.fpsCounter?.update( dt );
		}

		this.last = timestamp;

		requestAnimationFrame( t => this.mainLoop( t ) );
	}


	/**
	 *
	 */
	pause() {
		this._isPaused = true;
	}


	/**
	 * Resize the canvas as needed.
	 */
	resize() {
		let width = this.canvas.width;
		let height = this.canvas.height;

		if(
			// Fill available window while keeping target ratio.
			this.targetRatio ||
			// Only adjust to window if it becomes too small.
			height > innerHeight ||
			width > innerWidth
		) {
			const ratio = this.targetRatio || ( this.originalWidth / this.originalHeight );

			height = innerHeight;
			width = Math.round( height * ratio );

			if( width > innerWidth ) {
				width = innerWidth;
				height = width / ratio;
			}

			this.scale = height / this.originalHeight;

			this.canvas.width = width;
			this.canvas.height = height;
		}

		this.offset.x = ( innerWidth - width ) * 0.5;
		this.offset.y = ( innerHeight - height ) * 0.5;
	}


	/**
	 *
	 * @param {HTMLElement} domParent
	 * @param {Object} options
	 * @param {import('./FPSCounter').FPSCounter?} options.fpsCounter
	 * @param {drawFunction} options.onDraw
	 * @param {updateFunction} options.onUpdate
	 * @param {number?} options.targetRatio A target ratio to keep for the canvas size, e.g. `16 / 9`, `4 / 3` etc.
	 *     Setting a ratio will change the originally set width and height to fit the window.
	 * @returns {Renderer}
	 */
	setup( domParent, options ) {
		domParent.append( this.canvas );

		this.fpsCounter = options.fpsCounter;
		this.onDraw = options.onDraw;
		this.onUpdate = options.onUpdate;
		this.targetRatio = options.targetRatio > 0 ? options.targetRatio : 0;

		this.resize();
		addEventListener( 'resize', _ev => this.resize() );

		return this;
	}


	/**
	 *
	 */
	togglePause() {
		this._isPaused ? this.unpause() : this.pause();
	}


	/**
	 *
	 */
	unpause() {
		if( this._isPaused ) {
			this._isPaused = false;
			this.mainLoop();
		}
	}


};


/**
 * @callback drawFunction
 * @param {CanvasRenderingContext2D} ctx
 */

/**
 * @callback updateFunction
 * @param {number} dt
 */
