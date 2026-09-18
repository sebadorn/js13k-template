export class Level {


	/**
	 *
	 * @param {import('./Renderer').Renderer} renderer The renderer this level is used in.
	 */
	constructor( renderer ) {
		this.renderer = renderer;
		this.timeSteps = 0;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} _ctx
	 */
	draw( _ctx ) {}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.timeSteps += dt;
	}


};
