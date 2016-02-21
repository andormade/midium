import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

const MASK_EVENT_ONLY = 0xf00000;
const MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sends a polyphonic aftertouch message.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} pressure       Pressure 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export function polyAftertouch(note, pressure, channel) {
	note = Midium.noteStringToMIDICode(note);
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.POLYPHONIC_AFTERTOUCH, channel, note, pressure
	));

	return this;
};

/**
 * Registers an event listener for the polyphonic aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
export function onPolyAftertouch(callback, channel) {
	var channel = isUndefined(channel) ? 1 : channel,
		mask = isUndefined(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
		message = Midium.constructMIDIMessage(
			Midium.POLYPHONIC_AFTERTOUCH, channel, 0, 0
		);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'polyaftertouch';
		event.channel = Midium.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.pressure = event.data[2];
		callback(event);
	});
};
