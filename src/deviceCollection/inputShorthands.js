var DeviceCollection = require('./deviceCollection');

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
DeviceCollection.prototype.onNoteOn = function(callback) {
	return this.on('noteon', callback);
};

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
DeviceCollection.prototype.onNoteOff = function(callback) {
	return this.on('noteoff', callback);
};
