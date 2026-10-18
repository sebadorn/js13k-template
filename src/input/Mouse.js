import { EventClass } from '../renderer/EventClass.js';


export class MouseInput extends EventClass {


	/**
	 *
	 * @param {import('../renderer/Renderer').Renderer} renderer
	 * @param {string[]} eventTypes Mouse events to listen for, e.g. "click", "mousemove", "mouseenter"
	 */
	constructor( renderer, eventTypes ) {
		super();

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

			this.trigger( ev.type, pos, ev );
		};

		eventTypes.forEach( type => {
			canvas.addEventListener( type, ev => triggerCallbacks( ev ) );
		} );
	}


};
