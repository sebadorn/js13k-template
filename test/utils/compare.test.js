import { expect, test } from 'vitest';
import { isNumber, isObject } from '../../src/utils/compare';


test( 'isNumber', () => {
	expect( isNumber( 13 ) ).toBe( true );
	expect( isNumber( 4.13 ) ).toBe( true );
	expect( isNumber( 0 ) ).toBe( true );
	expect( isNumber( Infinity ) ).toBe( true );

	expect( isNumber( NaN ) ).toBe( false );
	expect( isNumber( '4' ) ).toBe( false );
	expect( isNumber( undefined ) ).toBe( false );
} );


test( 'isObject', () => {
	expect( isObject( {} ) ).toBe( true );
	expect( isObject( [] ) ).toBe( true );

	expect( isObject( 13 ) ).toBe( false );
	expect( isObject( true ) ).toBe( false );
	expect( isObject( null ) ).toBe( false );
	expect( isObject( undefined ) ).toBe( false );
} );
