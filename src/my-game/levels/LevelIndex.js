import { Level } from '../../renderer/Level.js';
import { circle } from '../../utils/canvas.js';


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
		circle( ctx, 100, 100, 100 );
		ctx.fill();

		ctx.strokeStyle = '#fa09';
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.moveTo( 100, 300 );
		ctx.lineTo( 300, 600 );
		ctx.stroke();
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		super.update( dt );
	}


};
