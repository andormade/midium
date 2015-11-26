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
		 * Sends a MIDI message.
		 *
		 * @param {array} dataArray    An array with three items, representing the bytes in a MIDI message.
		 *
		 * @returns {object}    MidiOutput instance for method chaining.
		 */
		sendRawMessage: function(dataArray) {
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
		setChannel: function(channel) {
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
		noteOn: function(note, velocity, channel) {
			if (Nota.Utils.isUndefined(channel)) {
				var channel = this.channel;
			}

			var status = Nota.Utils.getStatusByte(Nota.Enum.NOTE_ON, channel);

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
		noteOff: function(note, velocity, channel) {
			if (Nota.Utils.isUndefined(channel)) {
				var channel = this.channel;
			}

			var status = Nota.Utils.getStatusByte(Nota.Enum.NOTE_OFF, channel);

			this.sendRawMessage([status, note, velocity]);

			return this;
		}
	};

	return MidiOutput;
};
