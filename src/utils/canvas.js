import { pixelMode } from '../config.js';


/**
 * Get a new canvas and its 2D context.
 * @param {number} w Width for the new canvas.
 * @param {number} h Height for the new canvas.
 * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
 */
export function canvasCreate( w, h ) {
	const canvas = document.createElement( 'canvas' );
	canvasSetSize( canvas, w, h );

	const ctx = canvas.getContext( '2d', { alpha: true } );
	ctx.imageSmoothingEnabled = !pixelMode;

	return [canvas, ctx];
};


/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} w
 * @param {number} h
 */
export function canvasSetSize( canvas, w, h ) {
	canvas.style.width = `${w}px`;
	canvas.style.height = `${h}px`;
	canvas.width = Math.floor( w * devicePixelRatio );
	canvas.height = Math.floor( h * devicePixelRatio );
};


/**
 * Create a snapshot of a given canvas by painting it on a new one of the same size.
 * @param {HTMLCanvasElement|OffscreenCanvas} canvas
 * @returns {[OffscreenCanvas, CanvasRenderingContext2D]}
 */
export function canvasSnapshot( canvas ) {
	const [canvasSnapshot, ctxSnapshot] = offscreenCreate( canvas.width, canvas.height );
	ctxSnapshot.drawImage( canvas, 0, 0, canvas.width, canvas.height );

	return [canvasSnapshot, ctxSnapshot];
};


/**
 * Get a copy of the given canvas trimmed down to its content.
 * Assumes a transparent background.
 * @param {HTMLCanvasElement|OffscreenCanvas} canvas
 * @returns {[OffscreenCanvas, CanvasRenderingContext2D]}
 */
export function canvasTrim( canvas ) {
	let left = canvas.width;
	let top = canvas.height;
	let right = 0;
	let bottom = 0;

	const ctx = canvas.getContext( '2d', { alpha: true } );
	const imageData = ctx.getImageData( 0, 0, left, top );

	for( let y = 0; y < imageData.height; y++ ) {
		for( let x = 0; x < imageData.width; x++ ) {
			const pxIndex = ( y * imageData.width + x ) * 4;
			const pxAlpha = imageData.data[pxIndex + 3];

			if( pxAlpha === 0 ) {
				continue;
			}

			left = left > x ? x : left;
			right = right < x ? x : right;
			top = top > y ? y : top;
			bottom = bottom < y ? y : bottom;
		}
	}

	const newWidth = right - left;
	const newHeight = bottom - top;

	const [copyCnv, copyCtx] = offscreenCreate( newWidth, newHeight );
	copyCtx.drawImage(
		canvas,
		left, top, newWidth, newHeight,
		0, 0, newWidth, newHeight,
	);

	return [copyCnv, copyCtx];
};


/**
 * Draw a circle.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vector2D} center
 * @param {number} radius
 */
export function circle( ctx, center, radius ) {
	ctx.beginPath();
	ctx.arc( center.x, center.y, radius, 0, Math.PI * 2 );
	ctx.closePath();
};


/**
 * Rotate around a given coordinate.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vector2D} coord
 * @param {number} rad - Rotation in radians.
 */
export function contextRotate( ctx, coord, rad ) {
	if( rad === 0 ) {
		return;
	}

	ctx.translate( coord.x, coord.y );
	ctx.rotate( rad );
	ctx.translate( -coord.x, -coord.y );
};


/**
 * Scale around a given coordinate.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vector2D} coord
 * @param {number} sx
 * @param {number} sy
 */
export function contextScale( ctx, coord, sx, sy ) {
	if( sx === 1 && sy === 1 ) {
		return;
	}

	ctx.translate( coord.x, coord.y );
	ctx.scale( sx, sy );
	ctx.translate( -coord.x, -coord.y );
};


/**
 * Load an area from an image onto a new canvas.
 * @param {HTMLImageElement} img
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @returns {[OffscreenCanvas, CanvasRenderingContext2D]}
 */
export function fromImageToCanvas( img, x, y, w, h ) {
	const [canvas, ctx] = offscreenCreate( w, h );
	ctx.drawImage( img, x, y, w, h, 0, 0, w, h );

	return [canvas, ctx];
};


/**
 * Get a new OffscreenCanvas and its 2D context.
 * @param {number} w Width for the new canvas.
 * @param {number} h Height for the new canvas.
 * @returns {[OffscreenCanvas, CanvasRenderingContext2D]}
 */
export function offscreenCreate( w, h ) {
	const canvas = new OffscreenCanvas( w, h );

	const ctx = canvas.getContext( '2d', { alpha: true } );
	ctx.imageSmoothingEnabled = !pixelMode;

	return [canvas, ctx];
};
