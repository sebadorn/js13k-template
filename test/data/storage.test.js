import { expect, test } from 'vitest';
import { MemoryStorage } from '../../src/data/storage';


test( 'MemoryStorage', () => {
	MemoryStorage.put( 'test', 13 );
	expect( MemoryStorage.get( 'test' ) ).toBe( 13 );
	expect( MemoryStorage.get( '13' ) ).toBeUndefined;

	MemoryStorage.put( 'test', '19' );
	expect( MemoryStorage.get( 'test' ) ).toBe( '19' );
} );
