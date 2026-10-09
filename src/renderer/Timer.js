/**
 * Timer class to time e.g. animations.
 */
export class Timer {


	/**
	 *
	 * @param {import('./Level.js').Level} level Level to which this timer sets its time to.
	 * @param {number} [duration = 0] Duration in game seconds.
	 */
	constructor( level, duration = 0 ) {
		this.level = level;
		this.set( duration );
	}


	/**
	 * Get the internal timer time to use for calculations.
	 * @private
	 * @returns {number}
	 */
	_timerNow() {
		return this.paused || this.level.timeSteps;
	}


	/**
	 *
	 * @returns {boolean}
	 */
	elapsed() {
		return this._timerNow() > this.timeEnd;
	}


	/**
	 * Get how much time is left.
	 * @returns {number} The remaining time in time steps. Will go into the negative after end of duration.
	 */
	left() {
		return this.timeEnd - this._timerNow();
	}


	/**
	 * Pause the timer.
	 */
	pause() {
		if( !this.paused ) {
			this.paused = this.level.timeSteps;
		}
	}


	/**
	 * 
	 * @returns {number} Progress as [0, 1].
	 */
	progress() {
		return Math.min( 1, 1 - this.left() / this.duration );
	}


	/**
	 * Restart the timer with the last set duration.
	 */
	restart() {
		this.set( this.duration / this.level.renderer.targetFPS );
	}


	/**
	 * Reset the timer to a new duration. Will unpause a paused timer.
	 * @param {number} duration Duration in game seconds.
	 */
	set( duration ) {
		this.duration = duration * this.level.renderer.targetFPS;
		this.timeEnd = this.level.timeSteps + this.duration;
		this.paused = 0;
	}


	/**
	 * Unpause a paused timer.
	 */
	unpause() {
		if( this.paused ) {
			this.timeEnd += this.level.timeSteps - this.paused;
			this.paused = 0;
		}
	}


};
