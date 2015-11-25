module.exports = function(Nota) {
	/**
	 * MIDI output handler.
	 *
	 * @param {number} port
	 * @param {number} channel
	 *
	 * @returns {void}
	 */
	var MidiOutput = function(port, channel) {
		this.port = port;
		this.channel = channel;
		this.output = Nota.MidiAccess.outputs.get(port);
	};

	MidiOutput.prototype = {
		/**
		 * Send MIDI message.
		 *
		 * @param {number} status    Status byte
		 * @param {number} data1     Data byte 1
		 * @param {number} data2     Data byte 2
		 *
		 * @returns {object}    MidiOutput instance for method chaining.
		 */
		sendMessage: function(status, data1, data2) {
			this.output.send([status, data1, data2]);
			return this;
		},

		/**
		 * Sets the MIDI channel.
		 *
		 * @param {number} channel
		 *
		 * @return {object}    MidiOutput instance for method chaining.
		 */
		setChannel: function(channel) {
			this.channel = channel;
			return this;
		}
	};

	return MidiOutput;
};
