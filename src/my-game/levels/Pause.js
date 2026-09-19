import { fontMonospace } from '../../config.js';
import { Level } from '../../renderer/Level.js';


export class Pause extends Level {


	/**
	 *
	 * @param {import('../MyGame').MyGame} game
	 */
	constructor( game ) {
		super( game.renderer );

		this.game = game;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		// Draw the current level as background.
		// Since only `draw()` is called and not `update()` it will not progress.
		this.game.level.draw( ctx );

		ctx.fillStyle = '#000a';
		ctx.fillRect( 0, 0, this.renderer.width, this.renderer.height );

		ctx.textAlign = 'center';
		ctx.fillStyle = '#fff';
		ctx.font = `500 46px ${fontMonospace}`;
		ctx.fillText( 'PAUSED', this.renderer.width / 2, this.renderer.height / 2 - 100 );
	}


};
