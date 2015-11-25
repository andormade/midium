module.exports = {
	/**
	 *
	 *
	 * @param {number} channel
	 * @param {number} note
	 * @param {number} velocity
	 *
	 * @returns {number}
	 */
	 noteOn: function(channel, note, velocity) {
		return [
			0x90 + (channel - 1),
			note,
			velocity
		];
	},

	/**
	 *
	 *
	 * @param {number} channel
	 * @param {number} note
	 *
	 * @returns {number}
	 */
	noteOff: function(channel, note) {
		return [
			0x80 + (channel - 1),
			note,
			velocity
		]
	},

	isDefined: function(object) {
		if (typeof object === 'undefined') {
			return true;
		}

		return false;
	}
};
