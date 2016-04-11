import Midium from 'midium-core';

const EVENT_ONLY = 0xf00000;
const EVENT_AND_CHANNEL = 0xff0000;
const NOTE_ON = 0x90;
const STATUS_STRING = 'noteon';
const DEFAULT_VELOCITY = 127;
const ALL_CHANNEL = 0;

/**
 * Sets the specified note on.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export function noteOn(
	note,
	velocity = DEFAULT_VELOCITY,
	channel = this.defaultChannel
) {
	note = Midium.noteStringToMIDICode(note);

	this.send(Midium.constructMIDIMessage(
		NOTE_ON, channel, note, velocity
	));

	return this;
};

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
export function onNoteOn(callback, channel = ALL_CHANNEL) {
	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL;
	var channel = channel === ALL_CHANNEL ? 1 : channel;
	var message = Midium.constructMIDIMessage(NOTE_ON, channel, 0, 0);

	return this.addEventListener(message, mask, function(event) {
		if (event.data[2] === 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = Midium.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	});
};
