import { vec2sub } from './vector.js';


/**
 * Get the bounds of a circle as rectangle.
 * @param {Circle} c
 * @returns {Rectangle}
 */
export function circleBounds( c ) {
	return {
		x: c.x - c.r,
		y: c.y - c.r,
		w: c.r + c.r,
		h: c.r + c.r,
	};
};


/**
 * Check if two circles overlap.
 * @param  {Circle} c1
 * @param  {Circle} c2
 * @return {boolean}
 */
export function circleOverlap( c1, c2 ) {
	const sub = vec2sub( c1, c2 );
	const sqCenterDistance = sub.x * sub.x + sub.y * sub.y;
	const sqRadiusSum = ( c1.r + c2.r ) * ( c1.r + c2.r );

	return sqCenterDistance < sqRadiusSum;
};


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
 * Convert degrees to radians.
 * @param {number} degrees
 * @returns {number}
 */
export function degToRad( degrees ) {
	return degrees * Math.PI / 180;
};


/**
 * Check if a position is inside a circle.
 * @param {Vector2D} pos The position.
 * @param {Circle} c The circle.
 * @returns {boolean} True if pos is inside, false otherwise.
 */
export function isInsideCircle( pos, c ) {
	// Short version:
	// return vec2euclidDistance( pos, c ) <= c.r;

	// Version without `Math.sqrt()`:
	const diff = vec2sub( pos, c );
	const sqDist = diff.x * diff.x + diff.y * diff.y;

	return sqDist <= c.r * c.r;
};


/**
 * Check if a position is inside an axis-aligned bounding box.
 * @param {Vector2D} pos The position.
 * @param {Rectangle} rect The axis-aligned bounding box.
 * @returns {boolean} True if pos is inside, false otherwise.
 */
export function isInsideRect( pos, rect ) {
	return pos.x >= rect.x &&
		pos.x <= rect.x + rect.w &&
		pos.y >= rect.y &&
		pos.y <= rect.y + rect.h;
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
 * Convert radians to degrees.
 * @param {number} radians
 * @returns {number}
 */
export function radToDeg( radians ) {
	return radians * 180 / Math.PI;
};


/**
 * Get the center of a rectangle.
 * @param {Rectangle} r
 * @returns {Vector2D}
 */
export function rectCenter( r ) {
	return {
		x: r.x + r.w * 0.5,
		y: r.y + r.h * 0.5,
	};
};


/**
 * Check if two axis-aligned bounding boxes overlap.
 * @param {Rectangle} a
 * @param {Rectangle} b
 * @return {boolean}
 */
export function rectOverlap( a, b ) {
	const [overlapX, overlapY] = rectOverlapSize( a, b );

	return overlapX * overlapY > Number.EPSILON;
};


/**
 * Calculate the overlapping areas on the x and y axes.
 * @param {Rectangle} a
 * @param {Rectangle} b
 * @return {[number, number]}
 */
export function rectOverlapSize( a, b ) {
	let overlapX = Math.min( a.x + a.w, b.x + b.w ) - Math.max( a.x, b.x );
	overlapX = ( overlapX < 0 ) ? 0 : overlapX;

	let overlapY = Math.min( a.y + a.h, b.y + b.h ) - Math.max( a.y, b.y );
	overlapY = ( overlapY < 0 ) ? 0 : overlapY;

	return [overlapX, overlapY];
};
