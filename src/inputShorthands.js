var Nota = require('./nota');

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
 * Registers an event listener for the polyphonic aftertouch events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onPolyAftertouch = function(callback) {
	return this.on('polyaftertouch', callback);
};

/**
 * Registers an event listener for the control change events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onControlChange = function(callback) {
	return this.on('controlchange', callback);
};

/**
 * Registers an event listener for the program change events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onProgramChange = function(callback) {
	return this.on('programchange', callback);
};

/**
 * Registers an event listener for the channel aftertouch events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onChannelAftertouch = function(callback) {
	return this.on('channelaftertouch', callback);
};

/**
 * Registers an event listener for the pitch wheel events.
 *
 * @param {function} callback
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onPitchWheel = function(callback) {
	return this.on('pitchwheel', callback);
};
