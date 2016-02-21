import Midium from 'midium-core';
import isUndefined from 'lodash.isUndefined';

/**
 * Sets the specified program.
 *
 * @param {note} program         Program number 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
export default function programChange(program, channel) {
	channel = isUndefined(channel) ? this.defaultChannel : channel;

	this.send(Midium.constuctMIDIMessageArray(
		Midium.PROGRAM_CHANGE, channel, program, 0
	));

	return this;
};
