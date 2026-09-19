import { Level } from '../../renderer/Level.js';


export class LevelIndex extends Level {


	/**
	 * 
	 * @param {import('../../renderer/Renderer.js').Renderer} renderer
	 */
	constructor( renderer ) {
		super( renderer );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.font = '500 26px monospace';
		ctx.fillText( 'Hello, World!', this.renderer.width / 2, this.renderer.height / 2 );

		ctx.fillStyle = '#f00';
		ctx.fillRect( 100, 100, 200, 200 );
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		super.update( dt );
	}


};
