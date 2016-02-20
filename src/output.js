var Midium = require('midium-core'),
	_ = require('lodash');

_.assignIn(Midium.prototype, {
	/**
	 * Sets the specified note off.
	 *
	 * @param {string|number} note    MIDI note 0-127
	 * @param {number} [velocity]     Velocity 0-127
	 * @param {number} [channel]      Channel 1-16
	 *
	 * @returns {object}
	 */
	noteOff : function(note, velocity, channel) {
		note = Midium.noteStringToMIDICode(note);
		velocity = _.isUndefined(velocity) ? 127 : velocity;
		channel = _.isUndefined(channel) ? this.defaultChannel : channel;

		this.send(Midium.constuctMIDIMessageArray(
			Midium.NOTE_OFF, channel, note, velocity
		));

		return this;
	},

	/**
	 * Sets the specified note on.
	 *
	 * @param {string|number} note    MIDI note 0-127
	 * @param {number} [velocity]     Velocity 0-127
	 * @param {number} [channel]      Channel 1-16
	 *
	 * @returns {object}
	 */
	noteOn : function(note, velocity, channel) {
		note = Midium.noteStringToMIDICode(note);
		velocity = _.isUndefined(velocity) ? 127 : velocity;
		channel = _.isUndefined(channel) ? this.defaultChannel : channel;

		this.send(Midium.constuctMIDIMessageArray(
			Midium.NOTE_ON, channel, note, velocity
		));

		return this;
	},

	/**
	 * Sends a polyphonic aftertouch message.
	 *
	 * @param {string|number} note    MIDI note 0-127
	 * @param {number} pressure       Pressure 0-127
	 * @param {number} [channel]      Channel 1-16
	 *
	 * @returns {object}
	 */
	ployphonicAftertouch : function(note, pressure, channel) {
		note = Midium.noteStringToMIDICode(note);
		channel = _.isUndefined(channel) ? this.defaultChannel : channel;

		this.send(Midium.constuctMIDIMessageArray(
			Midium.POLYPHONIC_AFTERTOUCH, channel, note, pressure
		));

		return this;
	},

	/**
	 * Sets the value of the specified controller
	 *
	 * @param {note} controller      Controller number 0-127
	 * @param {number} pressure      Pressure 0-127
	 * @param {number} [channel]     Channel 1-16
	 *
	 * @returns {object}
	 */
	controlChange : function(controller, value, channel) {
		channel = _.isUndefined(channel) ? this.defaultChannel : channel;

		this.send(Midium.constuctMIDIMessageArray(
			Midium.CONTROL_CHANGE, channel, controller, value
		));

		return this;
	},

	/**
	 * Sets the specified program.
	 *
	 * @param {note} program         Program number 0-127
	 * @param {number} [channel]     Channel 1-16
	 *
	 * @returns {object}
	 */
	programChange : function(program, channel) {
		channel = _.isUndefined(channel) ? this.defaultChannel : channel;

		this.send(Midium.constuctMIDIMessageArray(
			Midium.PROGRAM_CHANGE, channel, program, 0
		));

		return this;
	},

	/**
	 * Send a channel aftertouch message.
	 *
	 * @param {number} pressure      Pressure 0-127
	 * @param {number} [channel]     Channel 1-16
	 *
	 * @returns {object}
	 */
	channelAftertouch : function(pressure, channel) {
		channel = _.isUndefined(channel) ? this.defaultChannel : channel;

		this.send(Midium.constuctMIDIMessageArray(
			Midium.CHANNEL_AFTERTOUCH, channel, pressure, 0
		));

		return this;
	},

	/**
	 * Sets the value of the pitch wheel.
	 *
	 * @param {number} value         Value 0-127
	 * @param {number} [channel]     Channel 1-16
	 *
	 * @returns {object}
	 */
	pitchWheel : function(value, channel) {
		channel = _.isUndefined(channel) ? this.defaultChannel : channel;

		this.send(Midium.constuctMIDIMessageArray(
			Midium.CHANNEL_AFTERTOUCH, channel, 0, value
		));

		return this;
	}
});
