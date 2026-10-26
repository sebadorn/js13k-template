import { MemoryStorage } from '../data/storage.js';
import { LevelObject } from '../renderer/LevelObject.js';
import { fromImageToCanvas } from '../utils/canvas.js';


export class MyObjectFigure extends LevelObject {


	/**
	 *
	 */
	constructor() {
		super( { x: 400, y: 200, w: 64, h: 64 } );

		[this.canvas, this.ctx] = fromImageToCanvas(
			MemoryStorage.get( 'tiles' ),
			0, 32, 16, 16, this.w, this.h, false
		);
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage( this.canvas, this.x, this.y );
		ctx.imageSmoothingEnabled = true;
	}


};
