import { zzfx } from 'zzfx';
import { isNumber } from '../utils/compare.js';


/**
 *
 * @param {(number | undefined)[]} sound
 * @param {number?} volume
 */
export function playSound( sound, volume ) {
	if( isNumber( volume ) ) {
		sound = sound.slice();
		sound[0] = volume;
	}

	zzfx( ...sound );
};


// Sound effects for ZzFX

export const soundBtnClick01 = [.1,0,487,.01,,.01,2,.1,-9,,,,,,101,,,.71,.01,.02,473];
export const soundBubble = [.1,0,92,.02,,.05,,,,,-80,-0.01,.01,-0.1,,,,.6,.03,.05,-1188];
export const soundWaterDrop = [.2,0,414,.02,.03,.08,,1.3,,160,,,,.4,,,,.67,,,279];
