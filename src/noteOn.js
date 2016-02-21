import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

const MASK_EVENT_ONLY = 0xf00000;
const MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sets the specified note on.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export function noteOn(note, velocity, channel) {
	note = Midium.noteStringToMIDICode(note);
	velocity = isUndefined(velocity) ? 127 : velocity;
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.NOTE_ON, channel, note, velocity
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
export function onNoteOn(callback, channel) {
	var channel = isUndefined(channel) ? 1 : channel,
		mask = isUndefined(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
		message = Midium.constructMIDIMessage(
			Midium.NOTE_ON, channel, 0, 0
		);

	return this.addEventListener(message, mask, function(event) {
		if (event.data[2] === 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = 'noteon';
		event.channel = Midium.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	});
};
