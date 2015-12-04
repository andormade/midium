module.exports = function(Nota) {

	/**
	 * MIDI output handler.
	 *
	 * @param {number} port
	 * @param {number} channel
	 *
	 * @returns {void}
	 */
	function MidiOutput(port, channel) {
		this.port = port;
		this.channel = channel;
		this.output = Nota.MidiAccess.outputs.get(port);
	}

	MidiOutput.prototype = {

		/**
		 * Sends a MIDI message.
		 *
		 * @param {array} dataArray    An array with three items, representing
		 * the bytes in a MIDI message.
		 *
		 * @returns {object}    MidiOutput instance for method chaining.
		 */
		sendRawMessage : function(dataArray) {
			this.output.send(dataArray);
			return this;
		},

		/**
		 * Sets the MIDI channel.
		 *
		 * @param {number} channel
		 *
		 * @returns {object}    MidiOutput instance for method chaining.
		 */
		setChannel : function(channel) {
			this.channel = channel;
			return this;
		},

		/**
		 * Sets the specified note on.
		 *
		 * @param {number} note
		 * @param {number} velocity
		 * @param {number} [channel]
		 *
		 * @returns {object}
		 */
		noteOn : function(note, velocity, channel) {
			var status = null;

			if (Nota.Utils.isUndefined(channel)) {
				channel = this.channel;
			}

			status = Nota.Utils.getStatusByte(
				Nota.Enum.NOTE_ON,
				channel ? channel : this.channel
			);

			this.sendRawMessage([status, note, velocity]);

			return this;
		},

		/**
		 * Sets the specified note off.
		 *
		 * @param {number} note
		 * @param {number} velocity
		 * @param {number} [channel]
		 *
		 * @returns {object}
		 */
		noteOff : function(note, velocity) {
			if (Nota.Utils.isUndefined(channel)) {
				channel = this.channel;
			}

			this.sendRawMessage([
				Nota.Utils.getStatusByte(Nota.Enum.NOTE_OFF, channel),
				note,
				velocity]
			);

			return this;
		}
	};

	return MidiOutput;
};
