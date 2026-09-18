export const AudioPlayer = {


	audioContext: new AudioContext(),


	/**
	 *
	 * @param {ArrayBuffer|Uint8Array} audioData
	 * @param {number} volume
	 */
	async play( audioData, volume ) {
		if( audioData instanceof Uint8Array ) {
			audioData = audioData.buffer;
		}

		const buffer = await this.audioContext.decodeAudioData( audioData.slice() );

		const gainNode = this.audioContext.createGain();
		gainNode.connect( this.audioContext.destination );
		gainNode.gain.value = volume || 0.5;

		const source = this.audioContext.createBufferSource();
		source.buffer = buffer;
		source.connect( gainNode );
		source.loop = false;
		source.start();
	},


};
