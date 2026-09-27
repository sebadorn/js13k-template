/**
 * Add two vectors and return the result as a new one.
 * @param {Vector2D} a
 * @param {Vector2D} b
 * @returns {Vector2D}
 */
export function vec2add( a, b ) {
	return {
		x: a.x + b.x,
		y: a.y + b.y,
	};
};


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
	return vec2len( vec2sub( b, a ) );
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
 * Multiple a vector with a number and return the result as a new one.
 * @param {Vector2D} v
 * @param {number} m
 * @returns {Vector2D}
 */
export function vec2mul( v, m ) {
	return {
		x: v.x * m,
		y: v.y * m,
	};
};


/**
 * Normalizes a 2D vector. Does not modify the input vector.
 * @param {Vector2D} v The vector to normalize.
 * @returns {Vector2D} The normalized vector.
 */
export function vec2normalize( v ) {
	const length = vec2len( v ) || 1;

	return {
		x: v.x / length,
		y: v.y / length,
	};
};


/**
 * Subtract vector b from a and return the result as a new one.
 * @param {Vector2D} a
 * @param {Vector2D} b
 * @returns {Vector2D}
 */
export function vec2sub( a, b ) {
	return {
		x: a.x - b.x,
		y: a.y - b.y,
	};
};


/**
 * Add two vectors and return the result as a new one.
 * @param {Vector3D} a
 * @param {Vector3D} b
 * @returns {Vector3D}
 */
export function vec3add( a, b ) {
	return {
		x: a.x + b.x,
		y: a.y + b.y,
		z: a.z + b.z,
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
	return vec3len( vec3sub( b, a ) );
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
 * Multiple a vector with a number and return the result as a new one.
 * @param {Vector3D} v
 * @param {number} m
 * @returns {Vector3D}
 */
export function vec3mul( v, m ) {
	return {
		x: v.x * m,
		y: v.y * m,
		z: v.z * m,
	};
};


/**
 * Normalizes a 3D vector. Does not modify the input vector.
 * @param {Vector3D} v The vector to normalize.
 * @returns {Vector3D} The normalized vector.
 */
export function vec3normalize( v ) {
	const length = vec3len( v ) || 1;

	return {
		x: v.x / length,
		y: v.y / length,
		z: v.z / length,
	};
};


/**
 * Subtract vector b from a and return the result as a new one.
 * @param {Vector3D} a
 * @param {Vector3D} b
 * @returns {Vector3D}
 */
export function vec3sub( a, b ) {
	return {
		x: a.x - b.x,
		y: a.y - b.y,
		z: a.z - b.z,
	};
};
