import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

/**
 * Sets the specified note on.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export default function noteOn(note, velocity, channel) {
	note = Midium.noteStringToMIDICode(note);
	velocity = isUndefined(velocity) ? 127 : velocity;
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.NOTE_ON, channel, note, velocity
	));

	return this;
};
