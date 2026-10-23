/**
 * Split a text into lines to fit into a max width. Multiple white
 * spaces after each other will collapse into a single one.
 * @param {CanvasRenderingContext2D} ctx Context with all font values the text will be printed in already set.
 * @param {string} text The text to split.
 * @param {number} maxWidth The maximum line width.
 * @returns {string[]}
 */
export function splitTextForWidth( ctx, text, maxWidth ) {
	const metrics = ctx.measureText( text );

	if( metrics.width <= maxWidth ) {
		return [text];
	}

	// By setting a white space after a minus we
	// enable word-breaking for hyphenated words.
	text = text.replaceAll( '-', '- ' );
	const words = text.split( /\s+/ );

	const lines = [];
	let line = '';

	for( const word of words ) {
		let before = line;
		line += word + ' ';

		const metrics = ctx.measureText( line.trimEnd() );

		if( metrics.width > maxWidth ) {
			before = before.replaceAll( '- ', '-' );
			lines.push( before.trimEnd() );
			line = word + ' ';
		}
	}

	if( line.length ) {
		line = line.replaceAll( '- ', '-' );
		lines.push( line.trimEnd() );
	}

	return lines;
};
