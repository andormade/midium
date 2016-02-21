import Midium from 'midium-core';

/**
 * Setter function for the default channel.
 *
 * @param {number} channel    MIDI channel 1-16.
 *
 * @returns {object}
 */
export function setDefaultChannel(channel) {
	this.defaultChannel = channel;
	return this;
};
