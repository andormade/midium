import Utils from './utils';
import {NOTE_ON} from './constants/statusCodes';
import {ALL_CHANNELS, ALL_NOTES, DATA_VELOCITY, DATA_STATUS,
	DATA_NOTE} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'noteon';
const DEFAULT_VELOCITY = 127;

/**
 * @extends Midium
 */
export default class NoteOn extends Midium {
	/**
	 * Sets the specified note on.
	 *
	 * @param {string|number|array} notes    MIDI note 0-127 or C0 - G8
	 * @param {number} [velocity]            Velocity 0-127
	 * @param {number} [channel]             MIDI Channel 1-16
	 *
	 * @returns {object}
	 */
	noteOn(notes, velocity = DEFAULT_VELOCITY, channel = this.defaultChannel) {
		Array.prototype.concat(notes).forEach((note) => {
			note = Utils.noteStringToMIDICode(note);
			this.send(Utils.constructMIDIMessage(
				NOTE_ON, channel, note, velocity
			));
		});

		return this;
	}

	/**
	 * Registers an event listener for the note on events.
	 *
	 * @param {function} callback     Callback function
	 * @param {number|string} note    MIDI note 0-127 or C0 - G8
	 * @param {number} [channel]      MIDI Channel 1-16
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onNoteOn(callback, note = ALL_NOTES, channel = ALL_CHANNELS) {
		note = Utils.noteStringToMIDICode(note);
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS,
			note !== ALL_NOTES);
		let message = Utils.constructMIDIMessage(NOTE_ON, channel, note, 0);

		return this.addEventListener(message, mask, function(event) {
			if (event.data[DATA_VELOCITY] === 0) {
				return;
			}
			/* Extending the MIDI event with useful infos. */
			event.status = STATUS_STRING;
			event.channel = Utils.getChannelFromStatus(event.data[DATA_STATUS]);
			event.note = event.data[DATA_NOTE];
			event.velocity = event.data[DATA_VELOCITY];
			callback(event);
		});
	}
}
