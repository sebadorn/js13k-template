import { localStoragePrefix } from '../config.js';


/**
 * A wrapper around the localStorage API that automatically adds the prefix defined in config.js.
 *
 * As improvement it returns stored values as the initial type it was stored as instead of always a string.
 * Does not work with classes, just where `JSON.stringify()`/`JSON.parse()` works.
 */
export const LocalStorage = {


	_usedKeys: new Set(),


	/**
	 * Clear all items that were stored using this wrapper.
	 */
	clearAll() {
		this._usedKeys.forEach( key => this.remove( key ) );
	},


	/**
	 * Get a stored item.
	 * @param {string} key
	 * @returns {any}
	 */
	get( key ) {
		const value = localStorage.getItem( `${localStoragePrefix}:${key}` );

		return JSON.parse( value );
	},


	/**
	 * Remove a stored item.
	 * @param {string} key
	 */
	remove( key ) {
		localStorage.removeItem( `${localStoragePrefix}:${key}` );
	},


	/**
	 * Store an item.
	 * @param {string} key
	 * @param {any} value
	 */
	set( key, value ) {
		key = `${localStoragePrefix}:${key}`;
		this._usedKeys.add( key );

		localStorage.setItem( key, JSON.stringify( value ) );
	},


};


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
