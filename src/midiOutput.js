module.exports = function(Nota) {
	/**
	 *
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
		 *
		 *
		 * @param {number} note
		 * @param {number} [channel]
		 * @param {number} [data1]
		 * @param {number} [data2]
		 *
		 * @returns {object}
		 */
		sendNote: function(note, channel, data1, data2) {
			// @TODO
			this.output.send([0x90, 60, 0x7f]);
			this.output.send([0x80, 60, 0x40], window.performance.now() + 100.0);
			return this;
		},

		/**
		 *
		 *
		 * @param {number} channel
		 *
		 * @return {object}
		 */
		setChannel: function(channel) {
			this.channel = channel;
			return this;
		}
	};

	return MidiOutput;
};
