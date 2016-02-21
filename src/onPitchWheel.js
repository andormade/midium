import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

const MASK_EVENT_ONLY = 0xf00000;
const MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the pitch wheel events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
export default function onPitchWheel(callback, channel) {
	var channel = isUndefined(channel) ? 1 : channel,
		mask = isUndefined(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
		message = Midium.constructMIDIMessage(
			Midium.PITCH_WHEEL, channel, 0, 0
		);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'pitchwheel';
		event.channel = Midium.getChannelFromStatus(event.data[0]);
		event.pitchWheel = event.data[2];
		callback(event);
	});
};