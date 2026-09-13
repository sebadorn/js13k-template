/**
 * Remove an item from an array.
 * @param {any[]} arr The array.
 * @param {any} item The item to remove.
 * @returns {number} Index of the removed item or -1 if not found.
 */
export function removeItem( arr, item ) {
	const index = arr.indexOf( item );

	if( index > -1 ) {
		arr.splice( index, 1 );
	}

	return index;
};


/**
 * Remove all items from an array which fulfill a given check.
 * This function modifies the given array.
 * @param {any[]} arr The array to remove items from.
 * @param {arrayItemCheck} check The function to check if an item should be removed.
 * @returns {any[]} The input array.
 */
export function removeWhere( arr, check ) {
	for( let i = arr.length - 1; i >= 0; i-- ) {
		const item = arr[i];

		if( check( item, i ) ) {
			arr.splice( i, 1 );
		}
	}

	return arr;
};


/**
 * @callback arrayItemCheck
 * @param {any} item An item of the array to check if it should be removed.
 * @param {number} i Index of the item in the array.
 * @returns {boolean} True if item should be removed, false otherwise.
 */
