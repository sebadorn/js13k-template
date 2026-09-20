import { isNumber } from '../utils/compare.js';
import { zzfx } from './ZzFX.js';


export const audioContext = new AudioContext();


function generateNoise( noiseBuffer, autoStart, duration, loop, volume ) {
	const noise = audioContext.createBufferSource();
	noise.buffer = noiseBuffer;
	noise.loop = loop || duration > 0;

	if( autoStart ) {
		noise.start( 0, 0, duration );
	}

	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime( volume, audioContext.currentTime );

	noise.connect( gainNode );
	gainNode.connect( audioContext.destination );

	return noise;
}


/**
 * Generate brown noise. Brown noise sounds "deeper" with less hiss.
 * Might sound best as waterfall.
 * @see https://noisehack.com/generate-noise-web-audio-api/
 * @param {object} options
 * @param {boolean} [options.autoStart = true]
 * @param {number} [options.duration = 0] How long to play the noise for. If `0` (default) it will play the whole buffer which is 3 seconds. (Ignored if `autoStart = false`.)
 * @param {boolean} [options.loop = false]
 * @param {number} [options.volume = 0.2] Audio volume with a value [0, 1].
 * @returns {AudioBufferSourceNode}
 */
export function generateBrownNoise( {
	autoStart = true,
	duration = 0,
	loop = false,
	volume = 0.2,
} = {} ) {
	const bufferSize = 3 * audioContext.sampleRate;
	const noiseBuffer = audioContext.createBuffer( 1, bufferSize, audioContext.sampleRate );
	const channelData = noiseBuffer.getChannelData( 0 );

	let lastValue = 0;

	for( let i = 0; i < bufferSize; i++ ) {
		const white = Math.random() * 2 - 1;
		lastValue = ( lastValue + 0.02 * white ) / 1.02;
		channelData[i] = lastValue * 3.5;
	}

	return generateNoise( noiseBuffer, autoStart, duration, loop, volume );
};


/**
 * Generate pink noise. Pink noise sounds somewhere between white and brown noise.
 * @see https://noisehack.com/generate-noise-web-audio-api/
 * @param {object} options
 * @param {boolean} [options.autoStart = true]
 * @param {number} [options.duration = 0] How long to play the noise for. If `0` (default) it will play the whole buffer which is 3 seconds. (Ignored if `autoStart = false`.)
 * @param {boolean} [options.loop = false]
 * @param {number} [options.volume = 0.2] Audio volume with a value [0, 1].
 * @returns {AudioBufferSourceNode}
 */
export function generatePinkNoise( {
	autoStart = true,
	duration = 0,
	loop = false,
	volume = 0.2,
} = {} ) {
	const bufferSize = 3 * audioContext.sampleRate;
	const noiseBuffer = audioContext.createBuffer( 1, bufferSize, audioContext.sampleRate );
	const channelData = noiseBuffer.getChannelData( 0 );

	let b0 = 0;
	let b1 = 0;
	let b2 = 0;
	let b3 = 0;
	let b4 = 0;
	let b5 = 0;
	let b6 = 0;

	for( let i = 0; i < bufferSize; i++ ) {
		const white = Math.random() * 2 - 1;
		b0 = 0.99886 * b0 + white * 0.0555179;
		b1 = 0.99332 * b1 + white * 0.0750759;
		b2 = 0.96900 * b2 + white * 0.1538520;
		b3 = 0.86650 * b3 + white * 0.3104856;
		b4 = 0.55000 * b4 + white * 0.5329522;
		b5 = -0.7616 * b5 - white * 0.0168980;
		channelData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
		channelData[i] *= 0.11;
		b6 = white * 0.115926;
	}

	return generateNoise( noiseBuffer, autoStart, duration, loop, volume );
};


/**
 * Generate white noise. White noise sounds more "hissy" compared to pink or brown noise.
 * @see https://noisehack.com/generate-noise-web-audio-api/
 * @param {object} options
 * @param {boolean} [options.autoStart = true]
 * @param {number} [options.duration = 0] How long to play the noise for. If `0` (default) it will play the whole buffer which is 3 seconds. (Ignored if `autoStart = false`.)
 * @param {boolean} [options.loop = false]
 * @param {number} [options.volume = 0.1] Audio volume with a value [0, 1].
 * @returns {AudioBufferSourceNode}
 */
export function generateWhiteNoise( {
	autoStart = true,
	duration = 0,
	loop = false,
	volume = 0.1,
} = {} ) {
	const bufferSize = 3 * audioContext.sampleRate;
	const noiseBuffer = audioContext.createBuffer( 1, bufferSize, audioContext.sampleRate );
	const channelData = noiseBuffer.getChannelData( 0 );

	for( let i = 0; i < bufferSize; i++ ) {
		channelData[i] = Math.random() * 2 - 1;
	}

	return generateNoise( noiseBuffer, autoStart, duration, loop, volume );
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
