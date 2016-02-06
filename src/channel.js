var Nota = require('nota');

/**
 * Setter function for the default channel.
 *
 * @param {number} channel    MIDI channel 1-16.
 *
 * @returns {object}
 */
Nota.prototype.setDefaultChannel = function(channel) {
	this.defaultChannel = channel;
	return this;
};
