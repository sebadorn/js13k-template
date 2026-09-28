/**
 * Load an image.
 * @param {string} filePath
 * @returns {Promise<HTMLImageElement>}
 */
export async function loadImage( filePath ) {
	return new Promise( ( resolve, reject ) => {
		const img = new Image();
		img.onload = () => resolve( img );
		img.onerror = reject;
		img.src = filePath;
	} );
};
