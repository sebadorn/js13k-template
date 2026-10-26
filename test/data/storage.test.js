import { expect, test } from 'vitest';
import { deepCopy, MemoryStorage } from '../../src/data/storage';


test( 'MemoryStorage', () => {
	MemoryStorage.put( 'test', 13 );
	expect( MemoryStorage.get( 'test' ) ).toBe( 13 );
	expect( MemoryStorage.get( '13' ) ).toBeUndefined;

	MemoryStorage.put( 'test', '19' );
	expect( MemoryStorage.get( 'test' ) ).toBe( '19' );
} );


test( 'deepCopy', () => {
	const a = { b: 1, c: ['d', 2] };
	const copy = deepCopy( a );
	expect( copy ).toStrictEqual( a );
	a.b = 3;
	a.c[1] = 'e';
	expect( copy ).not.toStrictEqual( a );
} );
