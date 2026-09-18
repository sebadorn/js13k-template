export const GamepadInput = {


	_gpButtons: {},
	_ignoreUntilReleased: {},
	_on: {
		'gp_connect': [],
		'gp_disconnect': []
	},

	gamepads: {},
	numGamepads: 0,


	/**
	 *
	 * @return {object}
	 */
	getDirections() {
		let x = 0;
		let y = 0;

		const threshold = 0.3;

		for( const index in this.gamepads ) {
			const gp = this.gamepads[index];

			if( gp.axes[0] && Math.abs( gp.axes[0] ) > threshold ) {
				x = ( gp.axes[0] > 0 ) ? 1 : -1;
			}
			else if( gp.axes[2] && Math.abs( gp.axes[2] ) > threshold ) {
				x = ( gp.axes[2] > 0 ) ? 1 : -1;
			}

			if( gp.axes[1] && Math.abs( gp.axes[1] ) > threshold ) {
				y = ( gp.axes[1] > 0 ) ? 1 : -1;
			}
			else if( gp.axes[3] && Math.abs( gp.axes[3] ) > threshold ) {
				y = ( gp.axes[3] > 0 ) ? 1 : -1;
			}
		}
	
		return { x, y };
	},


	/**
	 *
	 * @param  {number}   action
	 * @param  {?boolean} forget
	 * @return {boolean}
	 */
	isPressed( action, forget ) {
		const keys = this.getKeysForAction( action );

		for( const key of keys.gamepad ) {
			if( this.isPressedGamepad( key, forget ) ) {
				return true;
			}
		}

		// Also check axes.
		// Has to be done as workaround for Firefox which does
		// not recognize D-Pad input as buttons on Linux.
		// @see https://bugzilla.mozilla.org/show_bug.cgi?id=1464940
		if( action == this.ACTION.LEFT ) {
			for( const index in this.gamepads ) {
				const gp = this.gamepads[index];

				if( gp.axes[6] && gp.axes[6] <= -0.2 ) {
					if( this._ignoreUntilReleased['axis6-'] ) {
						return false;
					}

					if( forget ) {
						this._ignoreUntilReleased['axis6-'] = true;
					}

					return true;
				}
			}
		}
		else if( action == this.ACTION.RIGHT ) {
			for( const index in this.gamepads ) {
				const gp = this.gamepads[index];

				if( gp.axes[6] && gp.axes[6] >= 0.2 ) {
					if( this._ignoreUntilReleased['axis6+'] ) {
						return false;
					}

					if( forget ) {
						this._ignoreUntilReleased['axis6+'] = true;
					}

					return true;
				}
			}
		}
		else if( action == this.ACTION.UP ) {
			for( const index in this.gamepads ) {
				const gp = this.gamepads[index];

				if( gp.axes[7] && gp.axes[7] <= -0.2 ) {
					if( this._ignoreUntilReleased['axis7-'] ) {
						return false;
					}

					if( forget ) {
						this._ignoreUntilReleased['axis7-'] = true;
					}

					return true;
				}
			}
		}
		else if( action == this.ACTION.DOWN ) {
			for( const index in this.gamepads ) {
				const gp = this.gamepads[index];

				if( gp.axes[7] && gp.axes[7] >= 0.2 ) {
					if( this._ignoreUntilReleased['axis7+'] ) {
						return false;
					}

					if( forget ) {
						this._ignoreUntilReleased['axis7+'] = true;
					}

					return true;
				}
			}
		}

		return false;
	},


	/**
	 * Check if a button is currently being pressed.
	 * @param  {number}  code   - Button code.
	 * @param  {boolean} forget
	 * @return {boolean}
	 */
	isPressedGamepad( code, forget ) {
		for( const index in this.gamepads ) {
			const buttons = this.gamepads[index].buttons;
			const button = buttons[code];

			if( button && button.pressed ) {
				if( this._ignoreUntilReleased[code] ) {
					return false;
				}

				if( forget ) {
					this._ignoreUntilReleased[code] = true;
				}

				return true;
			}
		}

		return false;
	},


	/**
	 * Add an event listener.
	 * @param {string}   type
	 * @param {function} cb
	 */
	on( type, cb ) {
		this._on[type].push( cb );
	},


	/**
	 *
	 */
	setup() {
		addEventListener( 'gamepadconnected', ev => {
			this.numGamepads++;
			this.gamepads[ev.gamepad.index] = ev.gamepad;

			this._on['gp_connect'].forEach( cb => cb() );
		} );

		addEventListener( 'gamepaddisconnected', ev => {
			this.numGamepads--;
			delete this.gamepads[ev.gamepad.index];

			this._on['gp_disconnect'].forEach( cb => cb() );
		} );
	},


	/**
	 * Update gamepad data.
	 */
	update() {
		const gamepads = navigator.getGamepads();

		for( const gamepad of gamepads ) {
			// Chromium has 4 indices, but they may be null as value.
			if( !gamepad ) {
				continue;
			}

			this.gamepads[gamepad.index] = gamepad;

			for( const code in this._ignoreUntilReleased ) {
				if( code == 'axis6-' || code == 'axis6+' ) {
					if( !gamepad.axes[6] ) {
						delete this._ignoreUntilReleased[code];
					}
				}
				else if( code == 'axis7-' || code == 'axis7+' ) {
					if( !gamepad.axes[7] ) {
						delete this._ignoreUntilReleased[code];
					}
				}
				else if( gamepad.buttons[code] && !gamepad.buttons[code].pressed ) {
					delete this._ignoreUntilReleased[code];
				}
			}
		}
	}


};
