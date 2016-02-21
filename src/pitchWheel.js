import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

const MASK_EVENT_ONLY = 0xf00000;
const MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sets the value of the pitch wheel.
 *
 * @param {number} value         Value 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
export function pitchWheel(value, channel) {
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.CHANNEL_AFTERTOUCH, channel, 0, value
	));

	return this;
};

/**
 * Registers an event listener for the pitch wheel events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
export function onPitchWheel(callback, channel) {
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
