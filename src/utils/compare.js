/**
 * Check if a given value is an actual number and also not NaN.
 * It might still be (-/+)Infinity.
 * @param {any} v The value to check.
 * @returns {boolean} True if number and not NaN, false otherwise.
 */
export function isNumber( v ) {
	// Favorite JavaScript weirdness: NaN ("Not a Number") is considered a number.
	return typeof v === 'number' && !isNaN( v );
};


/**
 * Check if a given value is an Object and not null.
 * But usually it is better to just use optional chaining (`?.`) or nullish coalescing (`??`).
 * @param {any} v The value to check.
 * @returns {boolean}
 */
export function isObject( v ) {
	return typeof v === 'object' && v !== null;
};
