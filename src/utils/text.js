import { eventTypeDone } from '../renderer/EventClass.js';
import { LevelObject } from '../renderer/LevelObject.js';
import { Timer } from '../renderer/Timer.js';


/**
 * Split a text into lines to fit into a max width. Multiple white
 * spaces after each other will collapse into a single one.
 * @param {CanvasRenderingContext2D} ctx Context with all font values the text will be printed in already set.
 * @param {string} text The text to split.
 * @param {number} maxWidth The maximum line width.
 * @returns {string[]}
 */
export function splitTextForWidth( ctx, text, maxWidth ) {
	const metrics = ctx.measureText( text );

	if( metrics.width <= maxWidth ) {
		return [text];
	}

	// By setting a white space after a minus we
	// enable word-breaking for hyphenated words.
	text = text.replaceAll( '-', '- ' );
	const words = text.split( /\s+/ );

	const lines = [];
	let line = '';

	for( const word of words ) {
		let before = line;
		line += word + ' ';

		const metrics = ctx.measureText( line.trimEnd() );

		if( metrics.width > maxWidth ) {
			before = before.replaceAll( '- ', '-' );
			lines.push( before.trimEnd() );
			line = word + ' ';
		}
	}

	if( line.length ) {
		line = line.replaceAll( '- ', '-' );
		lines.push( line.trimEnd() );
	}

	return lines;
};


export class Typewriter extends LevelObject {


	/** @type {string[]} */
	_toDraw = [];


	/**
	 *
	 * @param {Rectangle} rect
	 * @param {Object} options
	 * @param {string} options.color
	 * @param {string} options.font
	 * @param {number} options.lineHeight
	 * @param {number} [options.speed = 0.1] Appearance speed of characters in seconds.
	 */
	constructor( rect, options ) {
		super( rect );

		this.options = options;
		this._updateFontOptions();

		this.lineHeight = options.lineHeight;
		this.speed = options.speed || 0.1;
	}


	/**
	 *
	 * @private
	 */
	_updateFontOptions() {
		this.ctx.fillStyle = this.options.color;
		this.ctx.font = this.options.font;
		this.ctx.textAlign = 'left';
		this.ctx.textBaseline = 'top';
	}


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	beforeDraw( ctx ) {
		super.beforeDraw( ctx );

		this._toDraw.forEach( ( line, i ) => {
			this.ctx.fillText( line, 0, i * this.lineHeight );
		} );
	}


	/**
	 *
	 * @returns {boolean}
	 */
	get isRunning() {
		return !this._isDone && this._timer;
	}


	/**
	 * Set the lines to type. Re-adjusts the height according to the lines and set `lineHeight`.
	 * Making sure the text fits the width is left to the user, e.g. by using `splitTextForWidth()`.
	 * @param {string[]} lines
	 */
	setLines( lines ) {
		this.lines = lines;

		this.h = lines.length * this.lineHeight;
		this.canvas.height = this.h;
		this._updateFontOptions();
	}


	/**
	 *
	 */
	start() {
		this.lineIndex = 0;
		this.characterIndex = 0;

		this._isDone = false;
		this._timer = new Timer( this.level, this.speed );
		this._toDraw = [];
	}


	/**
	 *
	 * @param {number} dt
	 */
	update( dt ) {
		super.update( dt );

		if( !this._isDone && this._timer?.elapsed() ) {
			this.characterIndex++;
			this._timer.restart();

			// Reached the end of the current line.
			if( this.characterIndex > this.lines[this.lineIndex].length ) {
				this.characterIndex = 0;
				this.lineIndex++;
			}

			// Reached the end of the text.
			if( this.lineIndex >= this.lines.length ) {
				this._isDone = true;
				this.lineIndex = this.lines.length - 1;

				this.trigger( eventTypeDone );
			}
			else {
				this._toDraw = [];

				// Add all previous lines.
				for( let i = 0; i < this.lineIndex; i++ ) {
					this._toDraw.push( this.lines[i] );
				}

				// Add the current line as far as we have come character-wise.
				const newLine = this.lines[this.lineIndex].slice( 0, this.characterIndex );
				this._toDraw.push( newLine );

				const char = this.characterIndex ? newLine[this.characterIndex - 1] : '\n';
				this.trigger( 'typechar', char );
			}
		}
	}


};
