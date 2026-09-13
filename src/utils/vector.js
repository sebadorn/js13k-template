/**
 * Calculate the euclidean distance of two 2D vectors.
 * @param {Vector2D} a Vector a.
 * @param {Vector2D} b Vector b.
 * @returns {number} Euclidean distance between a and b.
 */
export function euclidDistance( a, b ) {
	const diffX = b.x - a.x;
	const diffY = b.y - a.y;

	return Math.sqrt( diffX * diffX + diffY * diffY );
};


/**
 * Get the length of 2D vector.
 * @param {Vector2D} v The vector.
 * @returns {number} Length of the vector.
 */
export function vec2len( v ) {
	return Math.sqrt( v.x * v.x + v.y + v.y );
};


/**
 * Normalizes a 2D vector. Does not modify the input vector.
 * @param {Vector2D} v The vector to normalize.
 * @returns {Vector2D} The normalized vector.
 */
export function vec2normalize( v ) {
	const length = vec2len( v );

	return {
		x: v.x / length,
		y: v.y / length,
	};
};
