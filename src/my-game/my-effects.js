import { Effect } from '../renderer/effects.js';
import { circle } from '../utils/canvas.js';


export class RippleClickEffect extends Effect {


	/** @type {Vector2D} */
	pos;


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	postDraw( ctx ) {
		const progress = this.timer.progress();
		const r = progress * 40;

		ctx.globalAlpha = 1 - progress;
		ctx.lineWidth = progress * 10;
		ctx.strokeStyle = '#f90';
		circle( ctx, this.pos.x - r, this.pos.y - r, r );
		ctx.stroke();
		ctx.globalAlpha = 1;
	}


};
