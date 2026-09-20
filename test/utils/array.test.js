import { expect, test } from 'vitest';
import { removeItem, removeWhere } from '../../src/utils/array';


test( 'removeItem', () => {
	const list = [{ i: 0 }, { i: 1 }, { i: 2 }, { i: 3 }];
	const item = list[2];

	expect( list ).toContain( item );
	expect( removeItem( list, item ) ).toBe( 2 );
	expect( list ).not.toContain( item );
} );


test( 'removeWhere', () => {
	const list = [{ a: 0 }, { a: -1.5 }, { a: 2 }, { a: 13 }, { a: 1.3 }, { a: -22 }];
	removeWhere( list, item => item.a < 0 );
	expect( list.length ).toBe( 4 );
	list.forEach( item => expect( item ).toSatisfy( v => v.a >= 0 ) );
} );
