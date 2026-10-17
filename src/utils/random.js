/**
 * Return a random (rounded) number from the interval [start, end].
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 * @param {number} start An integer as minimum value.
 * @param {number} end An integer as maximum value.
 * @returns {number}
 */
export function randInt( start, end ) {
	const diff = end - start + 1;

	return Math.floor( Math.random() * diff + start );
};


/**
 * A string-based seed generation function.
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions - Public Domain / MIT
 * @param {string} str
 * @returns {Function} A generator function that returns the next seed number with each call.
 */
export function xmur3( str ) {
	let h = 1779033703 ^ str.length;

	for( let i = 0; i < str.length; i++ ) {
		h = Math.imul( h ^ str.charCodeAt( i ), 3432918353 );
		h = h << 13 | h >>> 19;
	}

	return () => {
		h = Math.imul( h ^ h >>> 16, 2246822507 ),
		h = Math.imul( h ^ h >>> 13, 3266489909 );

		return ( h ^= h >>> 16 ) >>> 0;
	};
};


/**
 * "Simple Fast Counter" (32-bit) seeded pseudo-random number generator.
 * @see https://pracrand.sourceforge.net/ - Public Domain
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#sfc32 - Public Domain / MIT
 * @see https://stackoverflow.com/a/47593316 - Same as previous, but with some more explanation
 */
export class Sfc32 {


	/**
	 *
	 * @param {string} seedStr Text that will be used for seed generation.
	 */
	constructor( seedStr ) {
		const seed = xmur3( seedStr );

		this.a = seed() | 0;
		this.b = seed() | 0;
		this.c = seed() | 0;
		this.counter = seed() | 0;

		for( let i = 0; i < 8; i++ ) {
			this.next();
		}
	}


	/**
	 * Get the next pseudo random number.
	 * @returns {number} [0, 1]
	 */
	next() {
		const tmp = ( this.a + this.b | 0 ) + this.counter | 0;
		this.counter = this.counter + 1 | 0;

		this.a = this.b ^ ( this.b >>> 9 );
		this.b = this.c + ( this.c << 3 ) | 0;
		this.c = ( this.c << 21 ) | ( this.c >>> 11 );
		this.c = this.c + tmp | 0;

		return ( tmp >>> 0 ) / 4294967296; // 4294967296 = 2 ** 32
	}


};
