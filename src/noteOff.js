import Midium from 'midium-core';

const EVENT_ONLY = 0xf00000;
const EVENT_AND_CHANNEL = 0xff0000;
const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;
const STATUS_STRING = 'noteoff';
const DEFAULT_VELOCITY = 127;
const ALL_CHANNEL = 0;

/**
 * Sets the specified note off.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export function noteOff(
	note, velocity = DEFAULT_VELOCITY, channel = this.defaultChannel
) {
	note = Midium.noteStringToMIDICode(note);

	this.send(Midium.constuctMIDIMessageArray(
		NOTE_OFF, channel, note, velocity
	));

	return this;
};

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
export function onNoteOff(callback, channel = ALL_CHANNEL) {
	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
		channel = channel === ALL_CHANNEL ? 1 : channel,
		message1 = Midium.constructMIDIMessage(NOTE_OFF, channel, 0, 0),
		message2 = Midium.constructMIDIMessage(NOTE_ON, channel, 0, 0);

	return [
		this.addEventListener(message1, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.velocity = event.data[2];
			callback(event);
		}),
		this.addEventListener(message2, mask, function(event) {
			/* By note on event, velocity 0 means note off. */
			if (event.data[2] !== 0) {
				return;
			}
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.velocity = 0;
			callback(event);
		})
	];
};
