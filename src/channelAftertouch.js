import Midium from 'midium-core';

const EVENT_ONLY = 0xf00000;
const EVENT_AND_CHANNEL = 0xff0000;
const CHANNEL_AFTERTOUCH = 0xd0;
const STATUS_STRING = 'channelaftertouch';
const ALL_CHANNEL = 0;

/**
 * Send a channel aftertouch message.
 *
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
export function channelAftertouch(pressure, channel = this.defaultChannel) {
	this.send(Midium.constuctMIDIMessageArray(
		CHANNEL_AFTERTOUCH, channel, pressure, 0
	));

	return this;
};

/**
 * Registers an event listener for the channel aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
export function onChannelAftertouch(callback, channel = ALL_CHANNEL) {
	var mask = channel === ALL_CHANNEL ? EVENT_ONLY : EVENT_AND_CHANNEL,
		channel = channel === ALL_CHANNEL ? 1 : channel,
		message = Midium.constructMIDIMessage(
			CHANNEL_AFTERTOUCH, channel, 0, 0
		);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = Midium.getChannelFromStatus(event.data[0]);
		event.pressure = event.data[1];
		callback(event);
	});
};
