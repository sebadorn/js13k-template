import { offscreenCreate } from '../utils/canvas.js';
import { EventClass, eventTypeAfterDraw, eventTypeBeforeDraw, eventTypeUpdate } from './EventClass.js';


export class LevelObject extends EventClass {


	/** @type {OffscreenCanvas} */
	canvas;

	/** @type {CanvasRenderingContext2D} */
	ctx;


	/**
	 *
	 * @param {import('./Level').Level} level
	 * @param {Rectangle} rect
	 */
	constructor( rect ) {
		super();

		this.x = rect.x;
		this.y = rect.y;
		this.w = rect.w;
		this.h = rect.h;

		[this.canvas, this.ctx] = offscreenCreate( this.w, this.h );
	}


	/**
	 * Add this LevelObject to a level. Calling it again will remove it from the previous level.
	 * @param {import('./Level').Level} level
	 */
	addTo( level ) {
		if( this.level ) {
			this.remove();
		}

		this.level = level;

		this._cbUpdate = level.addListener( eventTypeUpdate, dt => this.update( dt ) );
		this._cbAfterDraw = level.addListener( eventTypeAfterDraw, ctx => this.draw( ctx ) );
	}


	/**
	 *
	 */
	remove() {
		this.level.removeListener( eventTypeUpdate, this._cbUpdate );
		this.level.removeListener( eventTypeAfterDraw, this._cbAfterDraw );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	beforeDraw( ctx ) {
		this.ctx.clearRect( 0, 0, this.w, this.h );
		this.trigger( eventTypeBeforeDraw, ctx );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		this.beforeDraw( ctx );
		ctx.drawImage( this.canvas, this.x, this.y, this.w, this.h );
		this.afterDraw( ctx );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	afterDraw( ctx ) {
		this.trigger( eventTypeAfterDraw, ctx );
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.trigger( eventTypeUpdate, dt );
	}


};
