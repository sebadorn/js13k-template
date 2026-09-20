import { isNumber } from '../utils/compare.js';
import { zzfx } from './ZzFX.js';


export const audioContext = new AudioContext();


/**
 *
 * @see https://noisehack.com/generate-noise-web-audio-api/
 * @param {object} options
 * @param {boolean} [options.autoStart = true]
 * @param {number} [options.duration = 2] Duration of the white noise sample in seconds.
 * @param {boolean} [options.loop = false]
 * @param {number} [options.volume = 0.1] Audio volume with a value [0, 1].
 * @returns {AudioBufferSourceNode}
 */
export function generateWhiteNoise( {
	autoStart = true,
	duration = 2,
	loop = false,
	volume = 0.1,
} = {} ) {
	const bufferSize = duration * audioContext.sampleRate;
	const noiseBuffer = audioContext.createBuffer( 1, bufferSize, audioContext.sampleRate );
	const channelData = noiseBuffer.getChannelData( 0 );

	for( let i = 0; i < bufferSize; i++ ) {
		channelData[i] = Math.random() * 2 - 1;
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = loop;

	if( autoStart ) {
		whiteNoise.start();
	}

	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime( volume, audioContext.currentTime );

	whiteNoise.connect( gainNode );
	gainNode.connect( audioContext.destination );

	return whiteNoise;
};


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
