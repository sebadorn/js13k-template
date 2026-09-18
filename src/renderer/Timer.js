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
	 *
	 * @returns {boolean}
	 */
	elapsed() {
		return this.level.timeSteps > this.timeEnd;
	}


	/**
	 * Get how much time is left.
	 * @returns {number} The remaining time in seconds.
	 */
	left() {
		return this.timeEnd - this.level.timeSteps;
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
	 * Reset the timer to a new duration.
	 * @param {number} duration Duration in game seconds.
	 */
	set( duration ) {
		this.duration = duration * this.level.renderer.targetFPS;
		this.timeEnd = this.level.timeSteps + this.duration;
	}


};
