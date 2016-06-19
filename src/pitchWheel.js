import Utils from './utils';
import {PITCH_WHEEL} from './constants/statusCodes';
import {ALL_CHANNELS, DATA_PITCH_WHEEL,
	DATA_STATUS} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'pitchwheel';

/**
 * @extends Midium
 */
export default class PitchWheel extends Midium {
	/**
	 * Sets the value of the pitch wheel.
	 *
	 * @param {number} value         Value 0-127
	 * @param {number} [channel]     MIDI channel 1-16
	 *
	 * @returns {object}
	 */
	pitchWheel(value, channel = this.defaultChannel) {
		this.send(Utils.constructMIDIMessage(
			PITCH_WHEEL, channel, 0, value
		));

		return this;
	}

	/**
	 * Registers an event listener for the pitch wheel events.
	 *
	 * @param {function} callback    Callback function
	 * @param {number} [channel]     MIDI channel 1-16
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onPitchWheel(callback, channel = ALL_CHANNELS) {
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS);
		let message = Utils.constructMIDIMessage(
			PITCH_WHEEL, channel, 0, 0
		);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Utils.getChannelFromStatus(event.data[DATA_STATUS]);
			event.pitchWheel = event.data[DATA_PITCH_WHEEL];
			callback(event);
		});
	}
}
