/**
 * Clamp a value to a given range.
 * @param {number} value Value to clamp.
 * @param {number} min Minimum value.
 * @param {number} max Maximum value.
 * @returns {number} Value limited to the range [min, max];
 */
export function clamp( value, min, max ) {
	return Math.max( min, Math.min( max, value ) );
};


/**
 * Check if a position is inside an axis-aligned bounding box.
 * @param {Vector2D} pos The position.
 * @param {AABB} aabb The axis-aligned bounding box.
 * @returns {boolean} True if pos is inside, false otherwise.
 */
export function isInside( pos, aabb ) {
	return pos.x >= aabb.x &&
		pos.x <= aabb.x + aabb.w &&
		pos.y >= aabb.y &&
		pos.y <= aabb.y + aabb.h;
};


/**
 * Linearly interpolate between two values.
 * @param {number} a Start value.
 * @param {number} b End value.
 * @param {number} progress Progress as interval [0, 1].
 * @returns {number}
 */
export function lerp( a, b, progress ) {
	return progress * b + ( 1 - progress ) * a;
};


/**
 * Return a number as string with leading sign.
 * @param {number} v
 * @returns {string}
 */
export function numAsSignedStr( v ) {
	return ( v < 0 ? '' : '+' ) + v;
};


/**
 * Return a random (rounded) number from the interval [start, end].
 * @param {number} start
 * @param {number} end
 * @returns {number}
 */
export function randInt( start, end ) {
	const diff = end - start;

	return Math.round( Math.random() * diff + start );
};
