import { expect, test } from 'vitest';
import { randInt, Sfc32 } from '../../src/utils/random';


test( 'randInt', () => {
	for( let i = 0; i < 100; i++ ) {
		expect( randInt( -10, 10 ) ).toSatisfy( v => v >= -10 && v <= 10 );
	}
} );


test( 'Sfc32', () => {
	const sfc32_1 = new Sfc32( 'js13k' );
	const sfc32_2 = new Sfc32( 'js13k' );
	const sfc32_3 = new Sfc32( 'different' );
	const numbers_1 = [];
	const numbers_2 = [];
	const numbers_3 = [];

	for( let i = 0; i < 10; i++ ) {
		const num_1 = sfc32_1.next();
		expect( numbers_1 ).not.toContain( num_1 );
		numbers_1.push( num_1 );

		const num_2 = sfc32_2.next();
		expect( numbers_2 ).not.toContain( num_2 );
		numbers_2.push( num_2 );

		const num_3 = sfc32_3.next();
		expect( numbers_3 ).not.toContain( num_3 );
		numbers_3.push( num_3 );
	}

	expect( numbers_1 ).toEqual( numbers_2 );
	expect( numbers_2 ).not.toEqual( numbers_3 );
	expect( numbers_3 ).not.toEqual( numbers_1 );
} );
