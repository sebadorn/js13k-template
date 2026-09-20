/**
 *
 * @param {Color} c
 * @returns {string} The color has 8 character hex value, e.g. "#a0550cef".
 */
export function colorToHex( c ) {
	const r = Math.round( c.r * 255 ).toString( 16 ).padStart( 2, '0' );
	const g = Math.round( c.g * 255 ).toString( 16 ).padStart( 2, '0' );
	const b = Math.round( c.b * 255 ).toString( 16 ).padStart( 2, '0' );
	const a = Math.round( c.a * 255 ).toString( 16 ).padStart( 2, '0' );

	return `#${r}${g}${b}${a}`;
};


/**
 *
 * @param {string} c
 * @returns {Color}
 */
export function hexToColor( c ) {
	if( c[0] === '#' ) {
		c = c.slice( 1 );
	}

	const len = c.length < 5 ? 1 : 2;
	const hasAlpha = c.length === 4 || c.length === 8;
	let pos = 0;

	return {
		r: Math.round( parseInt( c.substring( pos, pos += len ), 16 ) / 2.55 ) / 100,
		g: Math.round( parseInt( c.substring( pos, pos += len ), 16 ) / 2.55 ) / 100,
		b: Math.round( parseInt( c.substring( pos, pos += len ), 16 ) / 2.55 ) / 100,
		a: hasAlpha ? Math.round( parseInt( c.substring( pos, pos + len ), 16 ) / 2.55 ) / 100 : 1,
	};
};


/**
 * @typedef {Object} Color
 * @property {number} r Red value as [0, 1].
 * @property {number} g Green value as [0, 1].
 * @property {number} b Blue value as [0, 1].
 * @property {number} a Alpha value as [0, 1].
 */
