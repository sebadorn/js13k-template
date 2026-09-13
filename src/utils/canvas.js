/**
 * Get a new canvas and its 2D context.
 * @param {number} w Width for the new canvas.
 * @param {number} h Height for the new canvas.
 * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
 */
export function canvasCreate( w, h ) {
	const canvas = document.createElement( 'canvas' );
	canvas.width = w;
	canvas.height = h;

	const ctx = canvas.getContext( '2d', { alpha: true } );

	return [canvas, ctx];
};


/**
 * Create a snapshot of a given canvas by painting it on a new one of the same size.
 * @param {HTMLCanvasElement} canvas
 * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
 */
export function canvasSnapshot( canvas ) {
	const [canvasSnapshot, ctxSnapshot] = canvasCreate( canvas.width, canvas.height );
	ctxSnapshot.drawImage( canvas, 0, 0, canvas.width, canvas.height );

	return [canvasSnapshot, ctxSnapshot];
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
 * Get a copy of the given canvas trimmed down to its content.
 * Assumes a transparent background.
 * @param {HTMLCanvasElement} canvas
 * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
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

	const [copyCnv, copyCtx] = canvasCreate( newWidth, newHeight );
	copyCtx.drawImage(
		canvas,
		left, top, newWidth, newHeight,
		0, 0, newWidth, newHeight,
	);

	return [copyCnv, copyCtx];
};
