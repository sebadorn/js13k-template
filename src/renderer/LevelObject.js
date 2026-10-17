import { offscreenCreate } from '../utils/canvas.js';


export class LevelObject {


	/** @type {OffscreenCanvas} */
	canvas;

	/** @type {CanvasRenderingContext2D} */
	ctx;

	/** @type {import('./effects').Effect[]} */
	effects = [];


	/**
	 *
	 * @param {import('./Level').Level} level
	 * @param {Rectangle} rect
	 */
	constructor( level, rect ) {
		this.level = level;
		this.x = rect.x;
		this.y = rect.y;
		this.w = rect.w;
		this.h = rect.h;

		[this.canvas, this.ctx] = offscreenCreate( this.w, this.h );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	preDraw( ctx ) {
		this.effects.forEach( effect => effect.preDraw( ctx ) );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		ctx.drawImage( this.canvas, this.x, this.y, this.w, this.h );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	postDraw( ctx ) {
		this.effects.forEach( effect => effect.postDraw( ctx ) );
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.effects.forEach( effect => effect.update( dt ) );
	}


};
