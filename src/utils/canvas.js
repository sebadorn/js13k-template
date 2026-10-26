/**
 * Get a new canvas and its 2D context.
 * @param {number} w Width for the new canvas.
 * @param {number} h Height for the new canvas.
 * @param {boolean} [smooth = true] Image smoothing.
 * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
 */
export function canvasCreate( w, h, smooth = true ) {
	const canvas = document.createElement( 'canvas' );
	canvasSetSize( canvas, w, h );

	const ctx = canvas.getContext( '2d', { alpha: true } );
	ctx.imageSmoothingEnabled = smooth;

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

			// Pixel is fully transparent
			if( pxAlpha === 0 ) {
				continue;
			}

			if( left > x ) { left = x; }
			if( right < x ) { right = x; }
			if( top > y ) { top = y; }
			if( bottom < y ) { bottom = y; }
		}
	}

	const newWidth = right - left + 1;
	const newHeight = bottom - top + 1;

	const [copyCnv, copyCtx] = offscreenCreate( newWidth, newHeight );
	copyCtx.drawImage(
		canvas,
		left, top, newWidth, newHeight,
		0, 0, newWidth, newHeight,
	);

	return [copyCnv, copyCtx];
};


/**
 * Draw a circle with x/y being the top left position.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x X coordinate of the top-left corner.
 * @param {number} y Y coordinate of the top-left corner.
 * @param {number} radius
 */
export function circle( ctx, x, y, radius ) {
	ctx.beginPath();
	ctx.arc( x + radius, y + radius, radius, 0, Math.PI * 2 );
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
 * @param {number} sx X coordinate in the source image.
 * @param {number} sy Y coordinate in the source image.
 * @param {number} sw Width in the source image.
 * @param {number} sh Height in the source image.
 * @param {number?} dw Destination width. Defaults to the source width.
 * @param {number?} dh Destination height. Defaults to the source height.
 * @param {boolean} [smooth = true] Image smoothing.
 * @returns {[OffscreenCanvas, CanvasRenderingContext2D]}
 */
export function fromImageToCanvas( img, sx, sy, sw, sh, dw, dh, smooth = true ) {
	dw = dw || sw;
	dh = dh || sh;

	const [canvas, ctx] = offscreenCreate( dw, dh, smooth );
	ctx.drawImage( img, sx, sy, sw, sh, 0, 0, dw, dh );

	return [canvas, ctx];
};


/**
 * Get a new OffscreenCanvas and its 2D context.
 * @param {number} w Width for the new canvas.
 * @param {number} h Height for the new canvas.
 * @param {boolean} [smooth = true] Image smoothing.
 * @returns {[OffscreenCanvas, CanvasRenderingContext2D]}
 */
export function offscreenCreate( w, h, smooth = true ) {
	const canvas = new OffscreenCanvas( w, h );

	const ctx = canvas.getContext( '2d', { alpha: true } );
	ctx.imageSmoothingEnabled = smooth;

	return [canvas, ctx];
};
