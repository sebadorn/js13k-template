export const MouseInput = {


	_events: {},


	/**
	 * 
	 * @param {"click"|"mousemove"} eventType Only event types that have been given to `setup()` can be registered.
	 * @param {mouseEventCallback} cb
	 */
	on( eventType, cb ) {
		this._events[eventType] = this._events[eventType] || [];
		this._events[eventType].push( cb );
	},


	/**
	 *
	 * @param {import('../renderer/Renderer').Renderer} renderer
	 * @param {string[]} eventTypes Mouse events to listen for, e.g. "click", "mousemove", "mouseenter"
	 */
	setup( renderer, eventTypes ) {
		const canvas = renderer.canvas;

		/**
		 *
		 * @param {MouseEvent} ev
		 */
		const triggerCallbacks = ev => {
			const pos = {
				x: ( ev.clientX - renderer.offset.x ) / renderer.scale * devicePixelRatio,
				y: ( ev.clientY - renderer.offset.y ) / renderer.scale * devicePixelRatio,
			};

			( this._events[ev.type] || [] ).forEach( cb => cb( ev, pos ) );
		};

		eventTypes.forEach( type => {
			canvas.addEventListener( type, ev => triggerCallbacks( ev ) );
		} );
	},


};


/**
 * @callback mouseEventCallback
 * @param {MouseEvent} event
 * @param {Vector2D} pos Mouse position scaled to inside the game.
 */
