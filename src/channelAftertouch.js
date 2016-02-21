import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

/**
 * Send a channel aftertouch message.
 *
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
export default function channelAftertouch(pressure, channel) {
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.CHANNEL_AFTERTOUCH, channel, pressure, 0
	));

	return this;
};
