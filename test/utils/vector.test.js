import { expect, test } from 'vitest';
import { vec2dot, vec2euclidDistance, vec2len, vec2normalize, vec3dot, vec3euclidDistance, vec3len, vec3normalize } from '../../src/utils/vector';


test( 'vec2dot', () => {
	expect( vec2dot( { x: 1, y: -3 }, { x: -2, y: -4 } ) ).toBe( 10 );
} );


test( 'vec2euclidDistance', () => {
	expect( vec2euclidDistance( { x: 2, y: 3 }, { x: -2, y: -3 } ) ).toBeCloseTo( 7.2111, 5 );
} );


test( 'vec2len', () => {
	expect( vec2len( { x: 0, y: 0 } ) ).toBe( 0 );
	expect( vec2len( { x: 2, y: -3 } ) ).toBeCloseTo( 3.60555, 5 );
} );


test( 'vec2normalize', () => {
	expect( vec2len( vec2normalize( { x: 13, y: -24 } ) ) ).toBeCloseTo( 1, 5 );
} );


test( 'vec3dot', () => {
	expect( vec3dot( { x: 1, y: -3, z: 1.4 }, { x: -2, y: -4, z: 13 } ) ).toBeCloseTo( 28.2, 2 );
} );


test( 'vec3euclidDistance', () => {
	expect( vec3euclidDistance( { x: 2, y: 3, z: -11 }, { x: -2, y: -3, z: 4.1 } ) ).toBeCloseTo( 16.733499, 5 );
} );


test( 'vec3len', () => {
	expect( vec3len( { x: 0, y: 0, z: 0 } ) ).toBe( 0 );
	expect( vec3len( { x: 2, y: -3, z: 4.1 } ) ).toBeCloseTo( 5.45985, 5 );
} );


test( 'vec3normalize', () => {
	expect( vec3len( vec3normalize( { x: 13, y: -24, z: 4.1 } ) ) ).toBeCloseTo( 1, 5 );
} );
