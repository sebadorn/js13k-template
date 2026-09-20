import { expect, test } from 'vitest';
import { colorToHex, hexToColor } from '../../src/utils/color';


test( 'colorToHex', () => {
	expect( colorToHex( { r: 0, g: 0, b: 0, a: 1 } ) ).toBe( '#000000ff' );
	expect( colorToHex( { r: 1, g: 1, b: 1, a: 0.5 } ) ).toBe( '#ffffff80' );
	expect( colorToHex( { r: 0.4, g: 0.86, b: 0.11, a: 0.77 } ) ).toBe( '#66db1cc4' );
} );


test( 'hexToColor', () => {
	expect( hexToColor( '#000000ff' ) ).toEqual( { r: 0, g: 0, b: 0, a: 1 } );
	expect( hexToColor( 'ffffff80' ) ).toEqual( { r: 1, g: 1, b: 1, a: 0.5 } );
	expect( hexToColor( '#66db1cc4' ) ).toEqual( { r: 0.4, g: 0.86, b: 0.11, a: 0.77 } );
} );
