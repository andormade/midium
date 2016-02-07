var Midium = require('midium-core');

/**
 * Setter function for the default channel.
 *
 * @param {number} channel    MIDI channel 1-16.
 *
 * @returns {object}
 */
Midium.prototype.setDefaultChannel = function(channel) {
	this.defaultChannel = channel;
	return this;
};
