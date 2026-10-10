export const KeyboardInput = {


	_onKeyDown: {},
	_onKeyUp: {},

	keystate: {},


	/**
	 * Initialize the input handler.
	 */
	setup() {
		document.body.addEventListener( 'keydown', ev => {
			if( ev.altKey || ev.ctrlKey || ev.metaKey ) {
				return;
			}

			const ks = this.keystate[ev.code];

			if( !ks || !ks.waitForReset ) {
				this.keystate[ev.code] = {
					time: Date.now()
				};

				if( this._onKeyDown[ev.code] ) {
					ev.preventDefault();
					this._onKeyDown[ev.code].forEach( cb => cb( ev ) );
				}
			}
		} );

		document.body.addEventListener( 'keyup', ev => {
			if( ev.altKey || ev.ctrlKey || ev.metaKey ) {
				return;
			}

			this.keystate[ev.code] = {
				time: 0
			};

			if( this._onKeyUp[ev.code] ) {
				ev.preventDefault();
				this._onKeyUp[ev.code].forEach( cb => cb( ev ) );
			}
		} );
	},


};


/**
 * Requires `KeyboardInput.setup()` to have been called first.
 * @param {string[]} keys
 * @param {boolean?} forget
 * @returns {boolean}
 */
export function inputIsPressedOneOfKeys( keys, forget ) {
	for( const key of keys ) {
		if( inputIsPressedKey( key, forget ) ) {
			return true;
		}
	}

	return false;
};


/**
 * Check if a key is currently being pressed.
 * Requires `KeyboardInput.setup()` to have been called first.
 * @param {number}  code   - Key code.
 * @param {boolean} forget
 * @returns {boolean}
 */
export function inputIsPressedKey( code, forget ) {
	const ks = KeyboardInput.keystate[code];

	if( ks?.time ) {
		if( forget ) {
			ks.time = 0;
			ks.waitForReset = true;
		}

		return true;
	}

	return false;
};


/**
 * Add a listener for the keydown event.
 * Requires `KeyboardInput.setup()` to have been called first.
 * @param {string|string[]} codes - Key code(s).
 * @param {Function}        cb    - Callback.
 */
export function inputOnKeyDown( codes, cb ) {
	codes = !Array.isArray( codes ) ? [codes] : codes;

	codes.forEach( code => {
		const list = KeyboardInput._onKeyDown[code] || [];
		list.push( cb );
		KeyboardInput._onKeyDown[code] = list;
	} );
};


/**
 * Add a listener for the keyup event.
 * Requires `KeyboardInput.setup()` to have been called first.
 * @param {string|string[]} codes - Key code(s).
 * @param {Function}        cb    - Callback.
 */
export function inputOnKeyUp( codes, cb ) {
	codes = !Array.isArray( codes ) ? [codes] : codes;

	codes.forEach( code => {
		const list = KeyboardInput._onKeyUp[code] || [];
		list.push( cb );
		KeyboardInput._onKeyUp[code] = list;
	} );
};
