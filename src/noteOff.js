import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

const MASK_EVENT_ONLY = 0xf00000;
const MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sets the specified note off.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export function noteOff(note, velocity, channel) {
	note = Midium.noteStringToMIDICode(note);
	velocity = isUndefined(velocity) ? 127 : velocity;
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.NOTE_OFF, channel, note, velocity
	));

	return this;
};

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
export function onNoteOff(callback, channel) {
	var channel = isUndefined(channel) ? 1 : channel,
		mask = isUndefined(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
		message1 = Midium.constructMIDIMessage(
			Midium.NOTE_OFF, channel, 0, 0
		),
		message2 = Midium.constructMIDIMessage(
			Midium.NOTE_ON, channel, 0, 0
		);

	return [
		this.addEventListener(message1, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = 'noteoff';
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
			event.status = 'noteoff';
			event.channel = Midium.getChannelFromStatus(event.data[0]);
			event.note = event.data[1];
			event.velocity = 0;
			callback(event);
		})
	];
};
