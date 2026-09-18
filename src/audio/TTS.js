/**
 * Text-to-Speech (TTS) using locally available voices.
 * Huge drawback: It is not that unlikely that there are no local voices installed.
 * So usage of TTS is generally discouraged.
 */
export const TextToSpeech = {


	/**
	 * Try to find a local voice that also matches the language.
	 * @param {string} [lang = 'en'] 
	 * @returns {SpeechSynthesisVoice|undefined} The selected voice or undefined if none found.
	 */
	setupVoice( lang = 'en' ) {
		this.voice = speechSynthesis.getVoices().filter( v => v.localService && v.lang === lang )[0];

		return this.voice;
	},


	/**
	 *
	 * @param {string} text
	 */
	speak( text ) {
		if( this.voice ) {
			const utterance = new SpeechSynthesisUtterance( text );
			utterance.voice = this.voice;

			speechSynthesis.speak( utterance );
		}
	},


};
