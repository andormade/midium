import Utils from './utils';
import {POLYPHONIC_AFTERTOUCH} from './constants/statusCodes';
import {ALL_CHANNELS, ALL_NOTES} from './constants/defaults';

const STATUS_STRING = 'polyaftertouch';

/**
 * Sends a polyphonic aftertouch message.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} pressure       Pressure 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
export function polyAftertouch(note, pressure, channel = this.defaultChannel) {
	note = Utils.noteStringToMIDICode(note);

	this.send(Utils.constructMIDIMessage(
		POLYPHONIC_AFTERTOUCH, channel, note, pressure
	));

	return this;
};

/**
 * Registers an event listener for the polyphonic aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
export function onPolyAftertouch(
	callback, note = ALL_NOTES, channel = ALL_CHANNELS
) {
	note = Utils.noteStringToMIDICode(note);
	let mask = Utils.eventMask(true, channel !== ALL_CHANNELS,
		note !== ALL_NOTES);
	let message = Utils.constructMIDIMessage(
		POLYPHONIC_AFTERTOUCH, channel, note, 0
	);

	return this.addEventListener(message, mask, function(event) {
		/* Extending the MIDI event with useful infos. */
		event.status = STATUS_STRING;
		event.channel = Utils.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.pressure = event.data[2];
		callback(event);
	});
};
