import Utils from './utils';
import {CHANNEL_AFTERTOUCH} from './constants/statusCodes';
import {ALL_CHANNELS} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'channelaftertouch';

export default class ChannelAftertouch extends Midium {
	/**
	 * Send a channel aftertouch message.
	 *
	 * @param {number} pressure      Pressure 0-127
	 * @param {number} [channel]     Channel 1-16
	 *
	 * @returns {object}
	 */
	channelAftertouch(pressure, channel = this.defaultChannel) {
		this.send(Utils.constructMIDIMessage(
			CHANNEL_AFTERTOUCH, channel, pressure, 0
		));

		return this;
	}

	/**
	 * Registers an event listener for the channel aftertouch events.
	 *
	 * @param {function} callback
	 * @param {number} [channel]
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onChannelAftertouch(callback, channel = ALL_CHANNELS) {
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS);
		let message = Utils.constructMIDIMessage(
			CHANNEL_AFTERTOUCH, channel, 0, 0
		);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Utils.getChannelFromStatus(event.data[0]);
			event.pressure = event.data[1];
			callback(event);
		});
	}
}
