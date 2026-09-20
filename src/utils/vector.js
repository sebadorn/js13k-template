/**
 * Dot product of two 2D vectors.
 * @param {Vector2D} a
 * @param {Vector2D} b
 * @returns {number}
 */
export function vec2dot( a, b ) {
	return a.x * b.x + a.y * b.y;
};


/**
 * Calculate the euclidean distance of two 2D vectors.
 * @param {Vector2D} a Vector a.
 * @param {Vector2D} b Vector b.
 * @returns {number} Euclidean distance between a and b.
 */
export function vec2euclidDistance( a, b ) {
	return vec2len( {
		x: b.x - a.x,
		y: b.y - a.y,
	} );
};


/**
 * Get the length of a 2D vector.
 * @param {Vector2D} v The vector.
 * @returns {number} Length of the vector.
 */
export function vec2len( v ) {
	return Math.sqrt( v.x * v.x + v.y * v.y );
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


/**
 * Dot product of two 3D vectors.
 * @param {Vector3D} a
 * @param {Vector3D} b
 * @returns {number}
 */
export function vec3dot( a, b ) {
	return a.x * b.x + a.y * b.y + a.z * b.z;
};


/**
 * Calculate the euclidean distance of two 3D vectors.
 * @param {Vector3D} a Vector a.
 * @param {Vector3D} b Vector b.
 * @returns {number} Euclidean distance between a and b.
 */
export function vec3euclidDistance( a, b ) {
	return vec3len( {
		x: b.x - a.x,
		y: b.y - a.y,
		z: b.z - a.z,
	} );
};


/**
 * Get the length of a 3D vector.
 * @param {Vector3D} v The vector.
 * @returns {number} Length of the vector.
 */
export function vec3len( v ) {
	return Math.sqrt( v.x * v.x + v.y * v.y + v.z * v.z );
};


/**
 * Normalizes a 3D vector. Does not modify the input vector.
 * @param {Vector3D} v The vector to normalize.
 * @returns {Vector3D} The normalized vector.
 */
export function vec3normalize( v ) {
	const length = vec3len( v );

	return {
		x: v.x / length,
		y: v.y / length,
		z: v.z / length,
	};
};
