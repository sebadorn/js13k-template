/**
 * Store data in a simple non-persistent/memory-only key-value storage to make it everywhere available.
 */
export const MemoryStorage = {


	data: {},


	/**
	 * Get a value from storage.
	 * @param {string|number} key
	 * @returns {any}
	 */
	get( key ) {
		return this.data[String( key )];
	},


	/**
	 * Put a value into the storage.
	 * @param {string|number} key
	 * @param {any} value
	 */
	put( key, value ) {
		this.data[String( key )] = value;
	},


};
