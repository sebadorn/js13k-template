import { eventTypeRendererUpdate } from './EventClass.js';


/**
 * The FPSCounter class is supposed to help while developing and not to be a part of the final game.
 * Therefore the UI is not configurable and size is of no concern.
 */
export class FPSCounter {


	static historyLimit = 20;


	/** @type {number[]} */
	_history = [];

	_time = 0;


	/**
	 *
	 * @param {import('./Renderer').Renderer} renderer
	 */
	constructor( renderer ) {
		const node = document.createElement( 'div' );
		node.style.background = '#fff';
		node.style.color = '#000';
		node.style.font = '11px monospace';
		node.style.left = '10px';
		node.style.pointerEvents = 'none';
		node.style.position = 'absolute';
		node.style.top = '10px';
		node.style.userSelect = 'none';
		node.style.zIndex = 100;

		this.node = node;

		document.body.append( this.node );

		this._targetFPS = renderer.targetFPS;

		renderer.addListener(
			eventTypeRendererUpdate,
			dt => this._update( dt, renderer.scale )
		);
	}


	/**
	 *
	 * @param {number} dt
	 * @param {number} scale
	 */
	_update( dt, scale ) {
		this._time += dt;
		this._history.push( this._targetFPS / dt );

		// Update the text every second
		if( this._time > this._targetFPS * 0.5 ) {
			const overLimit = this._history.length - FPSCounter.historyLimit;

			if( overLimit > 0 ) {
				this._history.splice( 0, overLimit );
			}

			this.node.textContent = `${this.average.toString().padStart( 3, '0' )} FPS / ${scale * devicePixelRatio}`;
			this._time = 0;
		}
	}


	/**
	 *
	 * @returns {number}
	 */
	get average() {
		const sum = this._history.reduce( ( prev, current ) => prev + current, 0 );

		return Math.round( sum / FPSCounter.historyLimit );
	}


};
