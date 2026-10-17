export class Level {


	/** @type {import('./effects').Effect[]} */
	effects = [];

	/** @type {import('./LevelObject').LevelObject[]} */
	objects = [];

	timeSteps = 0;


	/**
	 *
	 * @param {import('./Renderer').Renderer} renderer The renderer this level is used in.
	 */
	constructor( renderer ) {
		this.renderer = renderer;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	preDraw( ctx ) {
		this.effects.forEach( effect => effect.preDraw( ctx ) );
		this.objects.forEach( o => o.preDraw( ctx ) );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		// this.preDraw( ctx );
		// this.objects.forEach( o => o.draw( ctx ) );
		// this.postDraw( ctx );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	postDraw( ctx ) {
		this.objects.forEach( o => o.postDraw( ctx ) );
		this.effects.forEach( effect => effect.postDraw( ctx ) );
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		this.timeSteps += dt;
		this.effects.forEach( effect => effect.update( dt ) );
		this.objects.forEach( o => o.update( dt ) );
	}


};
