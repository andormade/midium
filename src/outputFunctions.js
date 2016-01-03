var Nota = require('./nota');

/**
 * Sends raw MIDI data
 *
 * @param {array} midiData    Array of MIDI data
 *
 * @returns {object} Reference of this for method chaining.
 */
Nota.prototype.send = function(midiData) {
	this.each(function(device) {
		if (device.type === 'output') {
			device.send(midiData);
		}
	});

	return this;
};
