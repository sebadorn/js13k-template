const { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, statSync } = require( 'node:fs' );
const { join, resolve } = require( 'node:path' );
const esbuild = require( 'esbuild' );
const terser = require( 'terser' );
const AdmZip = require( 'adm-zip' );
const { execFileSync } = require('node:child_process');


const ect = join( process.env.HOME, 'programming', 'Efficient-Compression-Tool', 'build', 'ect' );
const outFile = join( 'build', 'js13k-template.zip' );
const maxSize = 13312;

const hasECT = existsSync( ect );
const divider = '  ' + '-'.repeat( 32 );


// Cleanup previously existing build directory
if( existsSync( 'build' ) ) {
	rmSync( 'build', { force: true, recursive: true } );
}

// Copy all needed files
const tmpDir = join( 'build', 'tmp' );
mkdirSync( tmpDir, { recursive: true } );
cpSync( 'src', join( tmpDir, 'src' ), { recursive: true } );
console.log( '  Copied all source files' );
cpSync( 'assets', join( tmpDir, 'assets' ), { recursive: true } );
console.log( '  Copied all assets' );


// Minify index.html and replace name of entry script.
let html = readFileSync( join( tmpDir, 'src', 'index.html' ), 'utf-8' ).toString();
html = html.replaceAll( /[\n\r\t]/g, '' );
html = html.replace( 'entry.js', 'i.js' );
html = html.replace( ' type="module"', '' );
writeFileSync( join( 'build', 'index.html' ), html, 'utf-8' );
console.log( '  Modified index.html' );


async function build() {
	// Bundle and minify the code
	const bundleFile = join( 'build', 'bundle.js' );

	process.stdout.write( '  Running esbuild to create bundle...' );
	await esbuild.build( {
		bundle: true,
		entryPoints: [join( tmpDir, 'src', 'entry.js' )],
		minify: true,
		outfile: bundleFile,
		platform: 'browser',
	} );
	console.log( ' Done' );

	process.stdout.write( '  Running terser to further minify bundle...' );
	const terserResult = await terser.minify(
		{ 'bundle.js': readFileSync( bundleFile, 'utf-8' ) },
		{
			compress: true,
			ecma: 2025,
			mangle: {
				properties: {
					keep_quoted: true,
				},
				toplevel: true,
			},
		}
	);
	writeFileSync( join( 'build', 'i.js' ), terserResult.code, 'utf-8' );
	console.log( ' Done' );

	// Cleanup
	rmSync( tmpDir, { force: true, recursive: true } );
	console.log( '  Cleaned up build directory' );

	process.stdout.write( '  Creating ZIP file...' );
	const zip = new AdmZip();
	zip.addLocalFile( join( 'build', 'i.js' ), '.', 'i.js' );
	zip.addLocalFile( join( 'build', 'index.html' ), '.', 'index.html' );
	// TODO: add assets
	zip.writeZip( outFile );
	console.log( ' Done' );

	const sizeBeforeECT = statSync( outFile ).size;

	// Improve compression of ZIP file with ECT:
	// https://github.com/fhanau/Efficient-Compression-Tool
	if( hasECT ) {
		process.stdout.write( '  Efficient Compression Tool found, compressing ZIP...' );
		const outFileFull = resolve( outFile );

		try {
			execFileSync( ect, ['-9', '-strip', '-zip', outFileFull] );
			console.log( ' Done' );
		}
		catch( err ) {
			console.log( '' );
			console.error( err.stdout.toString() );
			console.error( err.stderr.toString() );
			console.error( `Full path: ${outFileFull}` );
		}
	}

	console.log( divider );

	const finalSize = statSync( outFile ).size;
	const spaceLeft = maxSize - finalSize;

	if( hasECT ) {
		console.log( `  ZIP size before ECT: ${sizeBeforeECT.toString().padStart( 5, ' ' )} bytes` );
	}

	console.log( `  Final ZIP size:      ${finalSize.toString().padStart( 5, ' ' )} bytes` );
	console.log( divider );
	console.log( `  Space left:          ${spaceLeft.toString().padStart( 5, ' ' )} bytes` );
}

build();
