import Utils from './utils';
import {NOTE_ON, NOTE_OFF} from './constants/statusCodes';
import {ALL_CHANNELS, ALL_NOTES, DATA_STATUS, DATA_NOTE,
	DATA_VELOCITY} from './constants/defaults';
import Midium from './midium';

const STATUS_STRING = 'noteoff';
const DEFAULT_VELOCITY = 0;

/**
 * @extends Midium
 */
export default class NoteOff extends Midium {
	/**
	 * Sets the specified note off.
	 *
	 * @param {string|number|array} notes    MIDI note 0-127 or C0 - G8
	 * @param {number} [velocity]            Velocity 0-127
	 * @param {number} [channel]             MIDI channel 1-16
	 *
	 * @returns {object}
	 */
	noteOff(
		notes, velocity = DEFAULT_VELOCITY, channel = this.defaultChannel
	) {
		Array.prototype.concat(notes).forEach((note) => {
			note = Utils.noteStringToMIDICode(note);
			this.send(Utils.constructMIDIMessage(
				NOTE_OFF, channel, note, velocity
			));
		});

		return this;
	}

	/**
	 * Sets all notes off.
	 *
	 * @param {number} channel    MIDI channel 1-16
	 *
	 * @returns {object}
	 */
	allNotesOff(channel = this.defaultChannel) {
		for (let note = 0; note < 128; note++) {
			this.noteOff(note, 0, channel);
		}

		return this;
	}

	/**
	 * Registers an event listener for the note off events.
	 *
	 * @param {function} callback     Callback function
	 * @param {number|string} note    MIDI note 0-127 or C0 - G8
	 * @param {number} [channel]      MIDI channel number 1-16
	 *
	 * @returns {object} Reference of the event listener for unbinding.
	 */
	onNoteOff(callback, note = ALL_NOTES, channel = ALL_CHANNELS) {
		note = Utils.noteStringToMIDICode(note);
		let mask = Utils.eventMask(true, channel !== ALL_CHANNELS,
			note !== ALL_NOTES);
		let message1 = Utils.constructMIDIMessage(NOTE_OFF, channel, note, 0);
		let message2 = Utils.constructMIDIMessage(NOTE_ON, channel, note, 0);

		return [
			this.addEventListener(message1, mask, function(event) {
				/* Extending the MIDI event with useful infos. */
				event.status = STATUS_STRING;
				event.channel = Utils.getChannelFromStatus(
					event.data[DATA_STATUS]);
				event.note = event.data[DATA_NOTE];
				event.velocity = event.data[DATA_VELOCITY];
				callback(event);
			}),
			this.addEventListener(message2, mask, function(event) {
				/* By note on event, velocity 0 means note off. */
				if (event.data[DATA_VELOCITY] !== 0) {
					return;
				}
				/* Extending the MIDI event with useful infos. */
				event.status = STATUS_STRING;
				event.channel = Utils.getChannelFromStatus(
					event.data[DATA_STATUS]);
				event.note = event.data[DATA_NOTE];
				event.velocity = 0;
				callback(event);
			})
		];
	}
}
