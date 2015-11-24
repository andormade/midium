module.exports = function(Nota) {
	/**
	 *
	 *
	 * @param {number} port
	 * @param {number} channel
	 *
	 * @returns {void}
	 */
	var MidiInput = function(port, channel) {
		this.port = port;
		this.channel = channel;
	};

	MidiInput.prototype = {
		/**
		 *
		 *
		 * @param {number} channel
		 *
		 * @returns {object}
		 */
		setChannel: function(channel) {
			this.channel = channel;
			return this;
		},

		/**
		 *
		 *
		 * @param {string} event
		 * @param {number} channel
		 * @param {function} callback
		 *
		 * @returns {object}
		 */
		on: function(event, channel, callback) {
			/* @TODO */
			return this;
		}
	};

	return MidiInput;
};
