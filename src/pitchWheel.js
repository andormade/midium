import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

/**
 * Sets the value of the pitch wheel.
 *
 * @param {number} value         Value 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
export default function pitchWheel(value, channel) {
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.CHANNEL_AFTERTOUCH, channel, 0, value
	));

	return this;
};
