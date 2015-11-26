module.exports = {
	/**
	 * Returns true if the specified object is undefined.
	 *
	 * @param {*} object
	 *
	 * @returns {boolean}
	 */
	isUndefined: function(object) {
		return (typeof object === 'undefined');
	},

	/**
	 * Returns true if the specified object is defined.
	 *
	 * @param {*} object
	 *
	 * @returns {boolean}
	 */
	isDefined: function(object) {
		return !this.isUndefined(object);
	},

	/**
	 * Generates status byte from the specified MIDI event and channel.
	 *
	 * @param {number} event      MIDI event enum.
	 * @param {number} channel    MIDI channel number. (1-16)
	 *
	 * @returns {number}    Status byte.
	 */
	getStatusByte: function(event, channel) {
		return event + channel - 1;
	}
};
