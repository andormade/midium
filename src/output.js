var MIDIUtils = require('./midiUtils'),
	Nota = require('nota'),
	Status = require('./midiStatusEnum'),
	Utils = require('./utils');

/**
 * Sets the specified note off.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
Nota.prototype.noteOff = function(note, velocity, channel) {
	note = MIDIUtils.noteStringToMIDICode(note);
	velocity = Utils.defaultValue(velocity, 127);
	channel = Utils.defaultValue(channel, this.defaultChannel);

	this.send(MIDIUtils.constuctMIDIMessageArray(
		Status.NOTE_OFF, channel, note, velocity
	));

	return this;
};

/**
 * Sets the specified note on.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
Nota.prototype.noteOn = function(note, velocity, channel) {
	note = MIDIUtils.noteStringToMIDICode(note);
	velocity = Utils.defaultValue(velocity, 127);
	channel = Utils.defaultValue(channel, this.defaultChannel);

	this.send(MIDIUtils.constuctMIDIMessageArray(
		Status.NOTE_ON, channel, note, velocity
	));

	return this;
};

/**
 * Sends a polyphonic aftertouch message.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} pressure       Pressure 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
Nota.prototype.ployphonicAftertouch = function(note, pressure, channel) {
	note = MIDIUtils.noteStringToMIDICode(note);
	channel = Utils.defaultValue(channel, this.defaultChannel);

	this.send(MIDIUtils.constuctMIDIMessageArray(
		Status.POLYPHONIC_AFTERTOUCH, channel, note, pressure
	));

	return this;
};

/**
 * Sets the value of the specified controller
 *
 * @param {note} controller      Controller number 0-127
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
Nota.prototype.controlChange = function(controller, value, channel) {
	channel = Utils.defaultValue(channel, this.defaultChannel);

	this.send(MIDIUtils.constuctMIDIMessageArray(
		Status.CONTROL_CHANGE, channel, controller, value
	));

	return this;
};

/**
 * Sets the specified program.
 *
 * @param {note} program         Program number 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
Nota.prototype.programChange = function(program, channel) {
	channel = Utils.defaultValue(channel, this.defaultChannel);

	this.send(MIDIUtils.constuctMIDIMessageArray(
		Status.PROGRAM_CHANGE, channel, program, 0
	));

	return this;
};

/**
 * Send a channel aftertouch message.
 *
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
Nota.prototype.channelAftertouch = function(pressure, channel) {
	channel = Utils.defaultValue(channel, this.defaultChannel);

	this.send(MIDIUtils.constuctMIDIMessageArray(
		Status.CHANNEL_AFTERTOUCH, channel, pressure, 0
	));

	return this;
};

/**
 * Sets the value of the pitch wheel.
 *
 * @param {number} value         Value 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
Nota.prototype.pitchWheel = function(value, channel) {
	channel = Utils.defaultValue(channel, this.defaultChannel);

	this.send(MIDIUtils.constuctMIDIMessageArray(
		Status.CHANNEL_AFTERTOUCH, channel, 0, value
	));

	return this;
};
