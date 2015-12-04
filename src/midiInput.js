module.exports = function(Nota) {

	/**
	 * MIDI input handler.
	 *
	 * @param {number} port
	 * @param {number} channel
	 *
	 * @returns {void}
	 */
	function MidiInput(port, channel) {
		this.port = port;
		this.channel = channel;
		this.input = Nota.MidiAccess.inputs.get(port);
	}

	MidiInput.prototype = {

		/**
		 * Sets the MIDI channel.
		 *
		 * @param {number} channel
		 *
		 * @returns {object}    MidiInput instance for method chaining.
		 */
		setChannel : function(channel) {
			this.channel = channel;
			return this;
		},

		/**
		 * Listens to MIDI messages.
		 *
		 * @param {function} callback
		 *
		 * @returns {object}    MidiInput instance for method chaining.
		 */
		on : function(callback) {
			this.input.onmidimessage = function(message) {
				callback(message);
			};
			return this;
		},

		/**
		 * Removes listeners from the MIDI input.
		 *
		 * @returns {object}    MidiInput instance for method chaining.
		 */
		off : function() {
			this.input.onmidimessage = null;
			return this;
		}
	};

	return MidiInput;
};
