import { removeItem } from '../utils/array.js';
import { randInt } from '../utils/random.js';
import { Timer } from './Timer.js';


export class Effect {


	isDone = false;

	/** @type {Function[]} */
	onDone = [];


	/**
	 *
	 * @param {import('./LevelObject').LevelObject | import('./Level').Level} levelObjectOrLevel
	 * @param {number} duration
	 * @param {Object?} options
	 * @param {boolean} [options.loop = false]
	 * @param {boolean} [options.removeWhenDone = true]
	 */
	constructor(
		levelObjectOrLevel,
		duration,
		{
			loop = false,
			removeWhenDone = true,
		} = {}
	) {
		this.l = levelObjectOrLevel;
		this.timer = new Timer(
			levelObjectOrLevel.level || levelObjectOrLevel,
			duration
		);
		this.loop = loop;
		this.removeWhenDone = removeWhenDone;
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	preDraw( ctx ) {}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	postDraw( ctx ) {}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		if( !this.isDone && this.timer.elapsed() ) {
			this.onDone.forEach( cb => cb() );

			if( this.loop ) {
				this.timer.restart();
			}
			else {
				this.isDone = true;

				if( this.removeWhenDone ) {
					removeItem( this.l.effects, this );
				}
			}
		}
	}


};


export class EffectShake extends Effect {


	strength = 10;


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	preDraw( ctx ) {
		this._x = randInt( -this.strength, this.strength );
		this._y = randInt( -this.strength, this.strength );

		ctx.translate( this._x, this._y );
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	postDraw( ctx ) {
		ctx.translate( -this._x, -this._y );
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
		effect.onDone.push( () => next.timer.restart() );
	}
};
