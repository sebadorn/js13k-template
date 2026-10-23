import { randInt } from '../utils/random.js';
import { EventClass, eventTypeAfterDraw, eventTypeBeforeDraw, eventTypeDone, eventTypeUpdate } from './EventClass.js';
import { Timer } from './Timer.js';


export class Effect extends EventClass {


	isDone = false;


	/**
	 *
	 * @param {Object?} options
	 * @param {boolean} [options.loop = false] Default is not to loop.
	 * @param {boolean} [options.removeWhenDone = true] Default is that a non-looping effect automatically removes itself when the duration has elapsed.
	 */
	constructor(
		{
			loop = false,
			removeWhenDone = true,
		} = {}
	) {
		super();

		this.loop = loop;
		this.removeWhenDone = removeWhenDone;
	}


	/**
	 * Apply the effect to a LevelObject or Level. An effect can only be
	 * active on one target at a time. Calling `applyTo()` again will
	 * cancel it on the previously applied target and start again on the new target.
	 * @param {import('./LevelObject').LevelObject | import('./Level').Level} target 
	 * @param {number} duration Duration of the effect in seconds.
	 */
	applyTo( target, duration ) {
		if( this.l ) {
			this.cancel();
		}

		this.l = target;
		this.timer = new Timer( target?.level || target, duration );

		this._cbUpdate = target.addListener( eventTypeUpdate, dt => this.update( dt ) );
		this._cbBeforeDraw = target.addListener( eventTypeBeforeDraw, ctx => this.beforeDraw( ctx ) );
		this._cbAfterDraw = target.addListener( eventTypeAfterDraw, ctx => this.afterDraw( ctx ) );
	}


	/**
	 * Cancel an effect and completely unregister it.
	 */
	cancel() {
		this.isDone = true;
		this.l.removeListener( eventTypeUpdate, this._cbUpdate );
		this.l.removeListener( eventTypeBeforeDraw, this._cbBeforeDraw );
		this.l.removeListener( eventTypeAfterDraw, this._cbAfterDraw );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	beforeDraw( ctx ) {}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	afterDraw( ctx ) {}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		if( !this.isDone && this.timer.elapsed() ) {
			this.trigger( eventTypeDone );

			if( this.loop ) {
				this.timer.restart();
			}
			else {
				this.isDone = true;

				if( this.removeWhenDone ) {
					this.cancel();
				}
			}
		}
	}


};


export class EffectShake extends Effect {


	strength = 5;


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	beforeDraw( ctx ) {
		ctx.translate( this._x, this._y );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	afterDraw( ctx ) {
		ctx.translate( -this._x, -this._y );
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		super.update( dt );

		this._x = randInt( -this.strength, this.strength );
		this._y = randInt( -this.strength, this.strength );
	}


};


/**
 * Chain together effects so that one starts after a previous one ended.
 * @param {...Effect} effects
 */
export function chainEffects( ...effects ) {
	for( let i = 0; i < effects.length - 1; i++ ) {
		const effect = effects[i];
		const next = effects[i + 1];

		next.timer.pause();
		effect.addListener( eventTypeDone, () => next.timer.restart() );
	}
};
