import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

/**
 * Sends a polyphonic aftertouch message.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} pressure       Pressure 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export default function polyAftertouch(note, pressure, channel) {
	note = Midium.noteStringToMIDICode(note);
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.POLYPHONIC_AFTERTOUCH, channel, note, pressure
	));

	return this;
};
