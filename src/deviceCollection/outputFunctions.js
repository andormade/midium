var DeviceCollection = require('./deviceCollection');

/**
 * Sends raw MIDI data
 *
 * @param {array} midiData    Array of MIDI data
 *
 * @returns {object} Reference of this for method chaining.
 */
DeviceCollection.prototype.send = function(midiData) {
	this.each(function(device) {
		if (device.type === 'output') {
			device.send(midiData);
		}
	});

	return this;
};
