import { isNumber } from '../utils/compare.js';
import { LocalStorage } from './storage.js';


/**
 * Achievement tracker.
 */
export const Achievements = {


	_callbacks: {
		/** @type {achievementUpdateCallback[]} */
		done: [],
		/** @type {achievementUpdateCallback[]} */
		update: [],
	},

	/** @type {boolean} */
	_useLocalStorage: true,


	/** @type {Object.<string, Achievement>} */
	achievements: {},


	/**
	 *
	 * @param {string} id
	 * @returns {Achievement?}
	 */
	get( id ) {
		return this.achievements[id];
	},


	/**
	 * Add an event listener.
	 * @param {AchievementEventType} eventType 
	 * @param {achievementUpdateCallback} cb 
	 */
	on( eventType, cb ) {
		this._callbacks[eventType].push( cb );
	},


	/**
	 * Add the given achievements. Calling this function again
	 * will add any new ones and override any with the same Id.
	 * @param {Achievement[]} list
	 * @param {boolean} [useLocalStorage = true]
	 */
	setup( list, useLocalStorage = true ) {
		this._useLocalStorage = useLocalStorage;

		list.forEach( a => {
			this.achievements[a.id] = a;

			if( this._useLocalStorage ) {
				const progress = LocalStorage.get( `ach:${a.id}` );

				if( isNumber( progress ) ) {
					a.progress = progress;
				}
			}
		} );
	},


	/**
	 * Update the progress of an achievement and trigger the registered callbacks.
	 * @param {string} id Id of the achievement to update.
	 * @param {number} progress Progress to set on the achievement.
	 * @returns {Achievement?} The updated achievement or null if none with the given Id exists.
	 */
	update( id, progress ) {
		const a = this.get( id );

		// Only update if the progress actually changed. And once
		// an achievement is done do not allow further updates.
		if( a?.progress != progress && a?.progress < 100 ) {
			a.progress = progress;

			this._callbacks.update.forEach( cb => cb( 'update', a ) );

			if( a.progress == 100 ) {
				this._callbacks.done.forEach( cb => cb( 'done', a ) );
			}

			if( this._useLocalStorage ) {
				LocalStorage.set( `ach:${id}`, progress );
			}
		}

		return a;
	},


};


export class Achievement {


	/**
	 * Progress of the achievement:
	 * - 0: none
	 * - 1-99: optional in-between progress, e.g. counting collected items as percent
	 * - 100: done
	 * @type {number}
	 */
	progress = 0;


	/**
	 *
	 * @param {string} id A unique Id for internal usage as key.
	 * @param {any} data
	 *     Any data that may be needed for the UI. Could be an Object
	 *     with entries for title, description, image etc.
	 */
	constructor( id, data ) {
		this.id = id;
		this.data = data;
	}


};


/**
 * @typedef {"update"|"done"} AchievementEventType
 */

/**
 * @callback achievementUpdateCallback
 * @param {AchievementEventType} type
 * @param {Achievement} achievement
 */
