import Utils from './utils';
import {PITCH_WHEEL} from './constants/statusCodes';
import {ALL_CHANNELS} from './constants/defaults';

const STATUS_STRING = 'pitchwheel';

/**
 * Sets the value of the pitch wheel.
 *
 * @param {number} value         Value 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
export function pitchWheel(value, channel = this.defaultChannel) {
	this.send(Utils.constructMIDIMessage(
		PITCH_WHEEL, channel, 0, value
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
export function onPitchWheel(callback, channel = ALL_CHANNELS) {
	let mask = Utils.eventMask(true, channel !== ALL_CHANNELS);
	let message = Utils.constructMIDIMessage(
		PITCH_WHEEL, channel, 0, 0
	);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = Utils.getChannelFromStatus(event.data[0]);
		event.pitchWheel = event.data[2];
		callback(event);
	});
};
