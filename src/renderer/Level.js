import { EventClass, eventTypeAfterDraw, eventTypeBeforeDraw, eventTypeUpdate } from './EventClass.js';


export class Level extends EventClass {


	timeSteps = 0;


	/**
	 *
	 * @param {import('./Renderer').Renderer} renderer The renderer this level is used in.
	 */
	constructor( renderer ) {
		super();
		this.renderer = renderer;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	beforeDraw( ctx ) {
		this.trigger( eventTypeBeforeDraw, ctx );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		// this.preDraw( ctx );
		// ...
		// this.postDraw( ctx );
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
		this.timeSteps += dt;
		this.trigger( eventTypeUpdate, dt );
	}


};
