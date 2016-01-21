var MIDIStatus = require('./midiStatusEnum'),
	Nota = require('./nota'),
	Utils = require('./utils');

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onNoteOn = function(callback, channel) {
	if (Utils.isUndefined(channel)) {
		this.on(MIDIStatus.NOTE_ON_CH1, function(event) {
			if (event.velocity !== 0) {
				callback(event);
			}
		}, {
			matchHighNibble : true,
			matchLowNibble  : false
		});
	}

	return this;
};

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.onNoteOff = function(callback, channel) {
	if (Utils.isUndefined(channel)) {
		this.on(MIDIStatus.NOTE_ON_CH1, function(event) {
			if (event.velocity === 0) {
				callback(event);
			}
		}, {
			matchHighNibble : true,
			matchLowNibble  : false
		});
		this.on(MIDIStatus.NOTE_OFF_CH1, callback, {
			matchHighNibble : true,
			matchLowNibble  : false
		});
	}

	return this;
};
