import { removeItem } from '../utils/array.js';


export class EventClass {


	/** @type {Object.<string, Function>} */
	_evCallbacks = {};


	/**
	 * Add an event listener callback function.
	 * @param {string} type Event type to register this callback for.
	 * @param {Function} cb
	 * @returns {Function} Same as the given `cb` parameter.
	 */
	addListener( type, cb ) {
		const list = this._evCallbacks[type] || [];

		list.push( cb );
		this._evCallbacks[type] = list;

		return cb;
	}


	/**
	 * Remove an event listener callback function.
	 * @param {string} type Event type this callback was registered for.
	 * @param {Function} cb
	 */
	removeListener( type, cb ) {
		removeItem( this._evCallbacks[type] || [], cb );
	}


	/**
	 * Trigger an event.
	 * @param {string} type The event type to trigger.
	 * @param {any[]} data Additional data to pass to the callback.
	 */
	trigger( type, ...data ) {
		( this._evCallbacks[type] || [] ).forEach( cb => cb( ...data, this ) );
	}


};


export const eventTypeAfterDraw = 'ad';
export const eventTypeDraw = 'd';
export const eventTypeBeforeDraw = 'bd';
export const eventTypeDone = 'done';
export const eventTypeUpdate = 'u';
