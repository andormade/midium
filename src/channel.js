var Midium = require('midium-core'),
	assignIn = require('lodash.assignin');

assignIn(Midium.prototype, {
	/**
	 * Setter function for the default channel.
	 *
	 * @param {number} channel    MIDI channel 1-16.
	 *
	 * @returns {object}
	 */
	setDefaultChannel : function(channel) {
		this.defaultChannel = channel;
		return this;
	}
});
