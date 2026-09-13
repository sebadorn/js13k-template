export class Level {


	/**
	 *
	 */
	constructor() {
		this.time = 0;
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
		this.time += dt;
	}


};
