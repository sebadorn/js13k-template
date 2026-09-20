import { expect, test } from 'vitest';
import { clamp, degToRad, isInside, lerp, numAsSignedStr, radToDeg } from '../../src/utils/math';


test( 'clamp', () => {
	expect( clamp( 13, 10, 20 ) ).toBe( 13 );
	expect( clamp( 19, -13, 13 ) ).toBe( 13 );
	expect( clamp( -100, -13, 13 ) ).toBe( -13 );
} );


test( 'degToRad/radToDeg', () => {
	expect( radToDeg( degToRad( 13 ) ) ).toBeCloseTo( 13, 4 );
	expect( degToRad( radToDeg( 13 ) ) ).toBeCloseTo( 13, 4 );
} );


test( 'isInside', () => {
	const box = {
		x: 10, y: 20,
		w: 30, h: 40
	};

	expect( isInside( { x: 10, y: 20 }, box ) ).toBe( true );
	expect( isInside( { x: 40, y: 60 }, box ) ).toBe( true );
	expect( isInside( { x: 40.001, y: 30 }, box ) ).toBe( false );
	expect( isInside( { x: 25, y: 19.999 }, box ) ).toBe( false );
} );


test( 'lerp', () => {
	expect( lerp( -13, 13, 0 ) ).toBe( -13 );
	expect( lerp( -13, 13, 0.5 ) ).toBeCloseTo( 0, 4 );
	expect( lerp( -13, 13, 1 ) ).toBe( 13 );
} );


test( 'numAsSignedStr', () => {
	expect( numAsSignedStr( -13 ) ).toBe( '-13' );
	expect( numAsSignedStr( 13 ) ).toBe( '+13' );
	expect( numAsSignedStr( -0 ) ).toBe( '+0' );
} );
