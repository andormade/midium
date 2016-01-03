var Nota = require('./nota');

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onNoteOn = function(callback) {
	return this.on('noteon', callback);
};

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onNoteOff = function(callback) {
	return this.on('noteoff', callback);
};
