import { generatePinkNoise } from '../../audio/sounds.js';
import { eventTypeDone } from '../../renderer/EventClass.js';
import { Level } from '../../renderer/Level.js';
import { Timer } from '../../renderer/Timer.js';
import { circle } from '../../utils/canvas.js';
import { isInsideRect } from '../../utils/math.js';
import { splitTextForWidth, Typewriter } from '../../utils/text.js';
import { MyObjectFigure } from '../objects.js';


export class LevelIndex extends Level {


	/**
	 * 
	 * @param {import('../../renderer/Renderer.js').Renderer} renderer
	 */
	constructor( renderer ) {
		super( renderer );
		this.timer = new Timer( this, 60 );

		const figure = new MyObjectFigure( this );
		figure.addTo( this );

		this.typeWriter = new Typewriter(
			{ x: renderer.width / 2, y: renderer.height / 2 + 100, w: 500, h: 1 },
			{
				color: '#fff',
				font: '500 26px monospace',
				lineHeight: 30,
			}
		);
		this.typeWriter.setLines( splitTextForWidth(
			this.typeWriter.ctx,
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid-idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul-lamco laboris nisi ut aliquip ex ea commodo consequat.',
			this.typeWriter.w,
		) );
		this.typeWriter.addTo( this );

		this.typeWriter.addListener( eventTypeDone, () => this.typeWriter.start() );
		this.typeWriter.start();
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw( ctx ) {
		this.beforeDraw( ctx );

		const centerX = this.renderer.width / 2;
		const centerY = this.renderer.height / 2;

		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.font = '500 26px monospace';
		ctx.fillText( 'Hello, World!', centerX, centerY );

		ctx.lineWidth = 2;
		ctx.strokeStyle = '#6a2';
		ctx.strokeRect( centerX, centerY + 100, this.typeWriter.w, this.typeWriter.h );

		ctx.fillStyle = '#f00';
		circle( ctx, 100, 100, 100 );
		ctx.fill();

		ctx.strokeStyle = '#fa09';
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.moveTo( 100, 300 );
		ctx.lineTo( 300, 600 );
		ctx.stroke();

		ctx.fillStyle = '#fff';
		const timeLeft = this.timer.left() / this.renderer.targetFPS;
		ctx.fillText( timeLeft.toFixed( 0 ) + 's', this.renderer.width / 2, 100 );

		this.afterDraw( ctx );
	}


	/**
	 *
	 * @param {Vector2D} pos
	 */
	onClick( pos ) {
		if( isInsideRect( pos, { x: 100, y: 100, w: 200, h: 200 } ) ) {
			generatePinkNoise( { duration: 3 } );
		}

		if( this.timer.paused ) {
			this.timer.unpause();
		}
		else {
			this.timer.pause();
		}
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		super.update( dt );
	}


};
