export const achievementsUseLocalStorage = true;

/**
 * Used for local development. The build script will then change it to an empty string for a release build.
 * @type {string}
 */
export const devPath = 'my-game/';

export const fontMonospace = 'monospace';

export const fontSansSerif = 'Verdana, Arial, sans-serif';

export const fontSerif = 'Georgia, "Times New Roman", serif';


/**
 * A prefix to use for localStorage entries that is unique to this game.
 * Necessary because all games are also hosted on the js13kgames.com and share the same localStorage.
 * @type {string}
 */
export const localStoragePrefix = 'js13k<year>.<title>';


/**
 * Enable/disable image smoothing for a game in pixel style.
 * @type {boolean}
 */
export const pixelMode = false;
