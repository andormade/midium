var DeviceCollection = require('./deviceCollection'),
	MIDIUtils = require('../midiUtils'),
	Status = require('../midiStatusEnum'),
	Utils = require('../utils');

/**
 * Sets the specified note on.
 *
 * @param {note} note          MIDI note 0-127
 * @param {number} channel     Channel 1-16
 * @param {number} velocity    Velocity 0-127
 *
 * @returns {object}
 */
DeviceCollection.prototype.noteOn = function(note, channel, velocity) {
	note = MIDIUtils.noteStringToMIDICode(note);
	velocity = Utils.defaultValue(velocity, 127);
	channel = Utils.defaultValue(channel, 1);

	this.send([
		MIDIUtils.getStatusByte(Status.NOTE_ON, channel),
		note,
		velocity
	]);

	return this;
};

/**
 * Sets the specified note off.
 *
 * @param {note} note            MIDI note 0-127
 * @param {number} [channel]     Channel 1-16
 * @param {number} [velocity]    Velocity 0-127
 *
 * @returns {object}
 */
DeviceCollection.prototype.noteOff = function(note, channel, velocity) {
	note = MIDIUtils.noteStringToMIDICode(note);
	velocity = Utils.defaultValue(velocity, 127);
	channel = Utils.defaultValue(channel, 1);

	this.send([
		MIDIUtils.getStatusByte(Status.NOTE_OFF, channel),
		note,
		velocity
	]);

	return this;
};
