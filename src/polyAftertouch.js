import Utils from './utils';
import {POLYPHONIC_AFTERTOUCH} from './constants/statusCodes';
import {ALL_CHANNELS, ALL_NOTES, DATA_PRESSURE, DATA_STATUS,
	DATA_NOTE} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'polyaftertouch';

/**
 * @extends Midium
 */
export default class PolyAftertouch extends Midium {
	/**
	 * Sends a polyphonic aftertouch message.
	 *
	 * @param {string|number|array} notes    MIDI note 0-127 or C0 - G8
	 * @param {number} pressure              Pressure 0-127
	 * @param {number} [channel]             MIDI channel 1-16
	 *
	 * @returns {object}
	 */
	polyAftertouch(notes, pressure, channel = this.defaultChannel) {
		Array.prototype.concat(notes).forEach((note) => {
			note = Utils.noteStringToMIDICode(note);
			this.send(Utils.constructMIDIMessage(
				POLYPHONIC_AFTERTOUCH, channel, note, pressure
			));
		});

		return this;
	}

	/**
	 * Registers an event listener for the polyphonic aftertouch events.
	 *
	 * @param {function} callback     Callback function
	 * @param {number|string} note    MIDI note 0-127 or C0 - G8
	 * @param {number} [channel]      MIDI channel
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onPolyAftertouch(callback, note = ALL_NOTES, channel = ALL_CHANNELS) {
		note = Utils.noteStringToMIDICode(note);
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS,
			note !== ALL_NOTES);
		let message = Utils.constructMIDIMessage(
			POLYPHONIC_AFTERTOUCH, channel, note, 0
		);

		return this.addEventListener(message, mask, function(event) {
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Utils.getChannelFromStatus(event.data[DATA_STATUS]);
			event.note = event.data[DATA_NOTE];
			event.pressure = event.data[DATA_PRESSURE];
			callback(event);
		});
	}
}
