import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

/**
 * Sets the value of the specified controller
 *
 * @param {note} controller      Controller number 0-127
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
export default function controlChange(controller, value, channel) {
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.CONTROL_CHANGE, channel, controller, value
	));

	return this;
};
